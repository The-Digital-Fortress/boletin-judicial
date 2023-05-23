import { useState } from 'react'
import { json } from '@remix-run/node'
import Datepicker from 'react-tailwindcss-datepicker'
import type { ActionFunction } from '@remix-run/node'
import { Form, Link, useActionData, useNavigation } from '@remix-run/react'
import { getBoletinData } from 'functions/boletin'
import {
  addZeroPaddingToIds,
  fileUpload,
  filterIdColumns,
  getFileIdsColumn,
} from 'functions/file-management'
import MatchedFilesTable from '~/components/MatchedTable'
import UnmatchedFilesTable from '~/components/UnmatchedTable'
import Navbar from '~/components/Navbar'
import { BulletList } from 'react-content-loader'
import Dropdown from '~/components/Dropdown'

const BulletListLoader = () => <BulletList />

const Boletin = () => {
  const [fileName, setFileName] = useState('')
  const [municipality, setMunicipality] = useState('')
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
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
            <span className='o font-semibold leading-6 text-indigo-400'>
              Boletin comparado
            </span>

            <Link
              to={actionData.url}
              target='_blank'
              className='rounded-md w-full lg:w-fit border-2  border-indigo-600 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
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
          <MatchedFilesTable matchedFiles={actionData?.data?.matchedFiles} />
          <UnmatchedFilesTable
            unmatchedFiles={actionData?.data?.unmatchedFiles}
          />
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
  const idsColumn = await getFileIdsColumn(fileSheet)
  const filteredIds = await filterIdColumns(idsColumn)
  const paddedIds = await addZeroPaddingToIds(filteredIds)

  const matchedFiles: any = []
  const unmatchedFiles: any = []
  const boletinData = await getBoletinData(
    date,
    municipalityMap[municipality || '']
  )

  if (boletinData.status === 204)
    return json({
      status: 204,
      message: boletinData.data.message,
    })

  if (boletinData.status === 200)
    boletinData?.files?.forEach(jury => {
      jury?.files.forEach(file => {
        if (paddedIds.fileIds.includes(file[1]))
          matchedFiles.push({ '3': jury?.key, ...file })
        else unmatchedFiles.push({ '3': jury?.key, ...file })
      })
    })

  return json({
    status: 200,
    data: { matchedFiles, unmatchedFiles },
    url: boletinData.url,
  })
}
