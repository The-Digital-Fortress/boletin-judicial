import { useState } from 'react'
import { json } from '@remix-run/node'
import Datepicker from 'react-tailwindcss-datepicker'
import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react'
import { getBoletinData } from 'functions/boletin'
import {
  addZeroPaddingToIds,
  fileUpload,
  filterIdColumns,
  getFileIdsColumn,
} from 'functions/file-management'
import Example from '~/components/Navbar'
import type { boletinData } from '~/utils/types'
import MatchedFilesTable from '~/components/MatchedTable'
import UnmatchedFilesTable from '~/components/UnmatchedTable'

const Boletin = () => {
  const [fileName, setFileName] = useState('')
  const transition = useNavigation()
  const actionData = useActionData()
  const { data: boletinData }: { data?: boletinData } = useLoaderData()
  const matchedFiles: any = []
  const unmatchedFiles: any = []

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  })

  if (actionData?.status === 200)
    boletinData?.files.forEach(file => {
      if (actionData?.data?.fileIds.includes(file[1])) matchedFiles.push(file)
      else unmatchedFiles.push(file)
    })

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0]
    setFileName(file.name)
  }

  const handleValueChange = newValue => {
    console.log('newValue:', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Example />
      <div className='mx-auto mt-16 max-w-7xl lg:px-8 flex justify-between'>
        <Form
          action='/boletin'
          method='post'
          encType='multipart/form-data'
          className='flex gap-8 items-center'
        >
          <label
            htmlFor='input-file-upload'
            className='cursor-pointer rounded-md border-2 border-indigo-600 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
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
            <p className='cursor-pointer rounded-md border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              {fileName}
            </p>
          )}

          <label id='input-file-upload' htmlFor='input-file-upload'>
            <button className='upload-button className="text-sm font-semibold leading-6 text-gray-900"'>
              Subir archivo →
            </button>
          </label>
        </Form>

        <div>
          <Datepicker
            inputClassName='py-[.5rem] px-[.75rem] w-full rounded-md focus:ring-0  border-2 border-indigo-600  placeholder:text-indigo-400 text-indigo-600 font-semibold'
            primaryColor={'indigo'}
            asSingle={true}
            useRange={false}
            value={value}
            onChange={handleValueChange}
          />
        </div>

        {transition.state !== 'idle' && (
          <p className='flex justify-center'>Cargando archivo...</p>
        )}
      </div>

      <MatchedFilesTable matchedFiles={matchedFiles} />
      <UnmatchedFilesTable unmatchedFiles={unmatchedFiles} />
    </div>
  )
}

export default Boletin

export const loader: LoaderFunction = async () => {
  const boletinData = await getBoletinData()
  return json(boletinData)
}

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData()
  const file = body.get('file')
  const fileSheet = await fileUpload(file)
  const idsColumn = await getFileIdsColumn(fileSheet)
  const filteredIds = await filterIdColumns(idsColumn)
  const paddedIds = await addZeroPaddingToIds(filteredIds)
  return json({ status: 200, data: paddedIds })
}
