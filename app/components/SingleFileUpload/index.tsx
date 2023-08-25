import { Form } from '@remix-run/react'
import { MUNICIPALITIES, MY_JUZGADO_MAP } from '~/constants'
import useNotification from '~/hooks/notifications'

const SingleFileUpload = () => {
  const { notify } = useNotification()

  const handleSubmit = () => {
    notify({
      message: 'Archivo añadido exitosamente',
      type: 'success',
      show: true,
    })
  }

  return (
    <div>
      <Form method='post' action='/boletin_v2/administrador' className='flex flex-col gap-4'>
        <div>
          <label htmlFor='fileId' className='text-sm font-semibold leading-6 text-indigo-600'>
            ID de archivo
          </label>
          <input
            placeholder='11111/2023'
            type='text'
            id='fileId'
            name='fileId'
            className='flex flex-row items-center gap-2 w-full  rounded-md border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm border-2 focus-visible:outline focus-visible:outline-0 whitespace-nowrap'
          />
        </div>

        <div>
          <label htmlFor='fileJury' className='text-sm font-semibold leading-6 text-indigo-600'>
            Jurado
          </label>
          <select
            id='fileJury'
            name='fileJury'
            className='cursor-pointer flex flex-row items-center gap-2 w-full rounded-md border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm border-2 focus-visible:outline focus-visible:outline-0 whitespace-nowrap'
          >
            {Object.entries(MY_JUZGADO_MAP).map(jury => (
              <option
                key={jury[0]}
                value={jury[0]}
                className='flex cursor-pointer flex-row items-center gap-2 w-full lg:w-auto rounded-md border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm border-2 focus-visible:outline focus-visible:outline-0 whitespace-nowrap'
              >
                {jury[1]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='fileCity' className='text-sm font-semibold leading-6 text-indigo-600'>
            Ciudad
          </label>
          <select
            id='fileCity'
            name='fileCity'
            className='cursor-pointer flex flex-row items-center gap-2 w-full rounded-md border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm border-2 focus-visible:outline focus-visible:outline-0 whitespace-nowrap'
          >
            {MUNICIPALITIES.map(municipality => (
              <option
                key={municipality}
                value={municipality}
                className='flex cursor-pointer flex-row items-center gap-2 w-full lg:w-auto rounded-md border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm border-2 focus-visible:outline focus-visible:outline-0 whitespace-nowrap'
              >
                {municipality}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='fileDescription' className='text-sm font-semibold leading-6 text-indigo-600'>
            Descripión
          </label>
          <textarea
            placeholder='(Opcional)'
            id='fileDescription'
            name='fileDescription'
            rows={6}
            className='resize-none m-0 flex flex-row items-center gap-2 w-full rounded-md border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm border-2 focus-visible:outline focus-visible:outline-0 whitespace-nowrap'
          />
        </div>

        <button
          onClick={handleSubmit}
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
