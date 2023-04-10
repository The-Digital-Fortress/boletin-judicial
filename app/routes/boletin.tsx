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

const Boletin = () => {
  const transition = useNavigation()
  const actionData = useActionData()
  const { data: boletinData } = useLoaderData()

  return (
    <div>
      <h1>Boletin</h1>
      <Form action='/boletin' method='post' encType='multipart/form-data'>
        <input type='file' name='file' id='input-file-upload' multiple />
        <label id='input-file-upload' htmlFor='input-file-upload'>
          <button className='upload-button'>Upload a file</button>
        </label>
      </Form>
    </div>
  )
}

export default Boletin
