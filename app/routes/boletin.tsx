import type { LinksFunction } from '@remix-run/node'
import { useState } from 'react'
import { json } from '@remix-run/node'
import type { V2_MetaFunction } from '@remix-run/react'
import Datepicker from 'react-tailwindcss-datepicker'
import type { ActionFunction } from '@remix-run/node'
import { Form, Link, useActionData, useNavigation } from '@remix-run/react'
import { getBoletinData } from 'functions/boletin'
import {
  addZeroPaddingToIds,
  fileUpload,
  filterColumns,
  getExcelColumns,
} from 'functions/file-management'
import MatchedFilesTable from '~/components/MatchedTable'
import Navbar from '~/components/Navbar'
import { BulletList } from 'react-content-loader'
import Dropdown from '~/components/Dropdown'
import moment from 'moment-timezone'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Expediente Legal - Buscador' }]
}

const BulletListLoader = () => <BulletList />

const Boletin = () => {
  const [fileName, setFileName] = useState('')
  const [municipality, setMunicipality] = useState('Tijuana')
  const now = moment().tz('America/Los_Angeles')
  const today = now.format('YYYY-MM-DD')
  const [date, setDate] = useState({
    startDate: today,
    endDate: today,
  })

  const transition = useNavigation()
  const actionData = useActionData()

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0]
    setFileName(file.name)
  }

  const handleDateChange = (date: any) => {
    setDate(date)
  }

  return (
    <div>
      <Navbar />
      <div className='mx-auto mt-4 lg:mt-16 px-2 max-w-7xl lg:px-8 gap-4 flex flex-col justify-between'>
        <Form
          action='/boletin'
          method='post'
          encType='multipart/form-data'
          className='flex flex-col lg:flex-row gap-4 items-center'
        >
          <label
            htmlFor='input-file-upload'
            className='w-full lg:max-w-[200px] cursor-pointer rounded-md border-2 border-indigo-600 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Seleccionar archivo
          </label>

          <input
            onChange={handleFileUpload}
            type='file'
            name='file'
            id='input-file-upload'
            multiple
            className='hidden'
          />

          {fileName && (
            <p className='w-full lg:w-auto rounded-md border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              {fileName}
            </p>
          )}

          <div className='w-full lg:max-w-[200px]'>
            <Datepicker
              placeholder='Seleccionar fecha'
              inputClassName='py-[.5rem] px-[.75rem] w-full  rounded-md focus:ring-0  border-2 border-indigo-600  placeholder:text-indigo-400 text-indigo-600 font-semibold'
              primaryColor={'indigo'}
              asSingle={true}
              useRange={false}
              value={date}
              onChange={handleDateChange}
            />
          </div>

          <input
            readOnly
            type='date'
            name='date-picker'
            id='date-picker'
            value={date.startDate}
            className='hidden'
          />

          <Dropdown setMunicipality={setMunicipality} />

          <input
            type='text'
            name='municipality'
            id='municipality'
            value={municipality}
            className='hidden'
            readOnly
          />

          <label id='input-file-upload' htmlFor='input-file-upload'>
            <button className='upload-button text-sm font-semibold leading-6 text-indigo-600'>
              Subir archivo →
            </button>
          </label>
        </Form>

        {actionData?.url && (
          <div className='flex flex-col gap-2'>
            <span className='font-semibold leading-6 text-indigo-400'>
              Boletin comparado
            </span>

            <Link
              to={actionData.url}
              target='_blank'
              className='rounded-md w-full lg:w-fit border-2  border-indigo-600 bg-indigo-600 px-1 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              {actionData?.url}
            </Link>
          </div>
        )}
      </div>

      {transition.state === 'submitting' ? (
        <div className='mx-auto max-w-7xl px-2 lg:px-8'>
          <BulletListLoader />
        </div>
      ) : (
        <>
          {actionData?.data?.matchedFiles?.length === 0 && (
            <div className='mx-auto mt-10 max-w-7xl lg:px-8 gap-4 flex flex-col justify-between'>
              <span className='text-indigo-400 font-semibold'>
                No se encontraron coincidencias entre el archivo y el boletin!
              </span>
            </div>
          )}
          <MatchedFilesTable matchedFiles={actionData?.data?.matchedFiles} />
          {/* <UnmatchedFilesTable
            unmatchedFiles={actionData?.data?.unmatchedFiles}
          /> */}

        </>
      )}

      {/* Render a message when boletin isn't availabel */}
      {actionData?.status === 204 && !(transition.state === 'submitting') && (
        <div className='mx-auto mt-10 max-w-7xl lg:px-8 gap-4 flex flex-col justify-between text-indigo-400 font-semibold'>
          {actionData.message}
        </div>
      )}
    </div>
  )
}

export default Boletin

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData()

  const file = body.get('file')
  const date = body.get('date-picker')
  const municipality = body.get('municipality')

  const municipalityMap = {
    Tijuana: 'ti',
    Mexicali: 'me',
    Ensenada: 'en',
    Tecate: 'te',
  }

  if (!file)
    return json({ status: 400, message: 'Es necesario subir un archivo' })

  if (!date)
    return json({ status: 400, message: 'Es necesario seleccionar una fecha' })

  const fileSheet = await fileUpload(file)
  const idsColumns = await getExcelColumns(fileSheet)
  const filteredIds = await filterColumns(idsColumns)
  const paddedIds = await addZeroPaddingToIds(filteredIds)
  const matchedFiles: any = []
  const unmatchedFiles: any = []
  const boletinData = await getBoletinData(
    date,
    municipalityMap[municipality || '']
  )

  const myJuzgadoMap = {
    "1civil": "JUZGADO PRIMERO CIVIL",
    "2civil": "JUZGADO SEGUNDO CIVIL",
    "3civil": "JUZGADO TERCERO CIVIL",
    "4civil": "JUZGADO CUARTO CIVIL",
    "5civil": "JUZGADO QUINTO CIVIL",
    "6civil": "JUZGADO SEXTO CIVIL",
    "7civil": "JUZGADO SEPTIMO CIVIL",
    "8civil": "JUZGADO OCTAVO CIVIL",
    "9civil": "JUZGADO NOVENO CIVIL",
    "10civil": "JUZGADO DECIMO CIVIL",
    "11civil": "JUZGADO DECIMO PRIMERO CIVIL",
    "1familiar": "JUZGADO PRIMERO DE LO FAMILIAR",
    "2familiar": "JUZGADO SEGUNDO DE LO FAMILIAR",
    "3familiar": "JUZGADO TERCERO DE LO FAMILIAR",
    "4familiar": "JUZGADO CUARTO DE LO FAMILIAR",
    "5familiar": "JUZGADO QUINTO DE LO FAMILIAR",
    "6familiar": "JUZGADO SEXTO DE LO FAMILIAR",
    "7familiar": "JUZGADO SEPTIMO DE LO FAMILIAR",
    "8familiar": "JUZGADO OCTAVO DE LO FAMILIAR",
    "9familiar": "JUZGADO NOVENO DE LO FAMILIAR",
    "10familiar": "JUZGADO DECIMO DE LO FAMILIAR",
    "11familiar": "JUZGADO DECIMO PRIMERO DE LO FAMILIAR",
  }

  const excelJuzgadosConverted = paddedIds.map(subarray => [
    subarray[0] && myJuzgadoMap[subarray[0].toLowerCase()] || subarray[0],
    subarray[1]
  ]);

  // console.log("idsColumns:", idsColumns.slice(-10))
  // console.log("filteredIds:", filteredIds.slice(-10))
  // console.log("paddedIds:", paddedIds.slice(-10))
  // console.log("excelJuzgadosConverted:", excelJuzgadosConverted.slice(-10))

  if (boletinData.status === 204) {
    return json({
      status: 204,
      message: boletinData.data.message,
    })
  }

  if (boletinData.status === 200) {
    boletinData.files.forEach(jury => {
      jury?.files.forEach((file, index) => {
        // console.log("file1:", file[1], " jury key:", jury.key)
        const fileExists = excelJuzgadosConverted.some(([column1, column2]) => jury.key.includes(column1) && column2 === file[1]
        )
        if (fileExists)
          matchedFiles.push({ '3': jury?.key, ...file })
        else unmatchedFiles.push({ '3': jury?.key, ...file })
      })
    })
  }

  return json({
    status: 200,
    data: { matchedFiles, unmatchedFiles },
    url: boletinData.url,
  })
}
