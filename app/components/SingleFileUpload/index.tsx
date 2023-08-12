import { Form } from '@remix-run/react'

const SingleFileUpload = () => {
  return (
    <div>
      <Form method='post' action='/test' className='flex flex-col gap-4'>
        <div>
          <label htmlFor='fileId' className='text-sm font-semibold leading-6 text-indigo-600'>
            ID de archivo
          </label>
          <input
            placeholder='11111/2023'
            type='text'
            id='fileId'
            name='fileId'
            className='flex flex-row items-center gap-2 w-full lg:w-auto rounded-md border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm border-2 focus-visible:outline focus-visible:outline-0 whitespace-nowrap'
          />
        </div>

        <div>
          <label htmlFor='fileName' className='text-sm font-semibold leading-6 text-indigo-600'>
            Nombre del archivo
          </label>
          <input
            type='text'
            id='fileName'
            name='fileName'
            className='flex flex-row items-center gap-2 w-full lg:w-auto rounded-md border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm border-2 focus-visible:outline focus-visible:outline-0 whitespace-nowrap'
          />
        </div>

        <button
          type='submit'
          className='w-full cursor-pointer rounded-md border-2 border-indigo-600 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Subir archivo
        </button>
      </Form>
    </div>
  )
}

export default SingleFileUpload
