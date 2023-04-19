import { useState } from 'react'
import { json } from '@remix-run/node'
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

const Boletin = () => {
  const [fileName, setFileName] = useState('')
  const transition = useNavigation()
  const actionData = useActionData()
  const { data: boletinData }: { data?: boletinData } = useLoaderData()
  const matchedFiles: any = []
  const unmatchedFiles: any = []

  if (actionData?.status === 200)
    boletinData?.files.forEach(file => {
      if (actionData?.data?.fileIds.includes(file[1])) matchedFiles.push(file)
      else unmatchedFiles.push(file)
    })

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0]
    setFileName(file.name)
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

        {transition.state !== 'idle' && (
          <p className='flex justify-center'>Cargando archivo...</p>
        )}
      </div>

      {matchedFiles.length > 0 && (
        <div className='mt-16 mx-auto max-w-7xl lg:px-8'>
          <div className='flex  border-b-2 justify-between border-gray-300 '>
            <p className='text-center flex-1 '>Numero de archivo</p>
            <p className='text-center flex-[2_2_0] '>ID de archivo</p>
            <p className='text-center flex-[5_5_0] '>Nombre de archivo</p>
          </div>

          <div>
            {matchedFiles.map((file: any) => (
              <div
                key={file[1]}
                className='flex py-4 items-center justify-between  border-b border-gray-300'
              >
                <p className='font-semibold flex-1 text-center text-gray-400'>
                  {file[0]}
                </p>
                <p className='font-semibold flex-[2_2_0] text-center'>
                  {file[1]}
                </p>
                <p className='font-semibold flex-[5_5_0] text-center text-gray-400'>
                  {file[2]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
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
