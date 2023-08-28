import { useActionData, useNavigation } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { MUNICIPALITIES, MY_JUZGADO_MAP } from '~/constants'
import useNotification from '~/hooks/notifications'
import { ValidatedForm } from 'remix-validated-form'
import TextInput from '../TextInput'
import SubmitBtn from '../SubmitBtn'
import { validator } from '~/utils/singleFileValidation'

const SingleFileUpload = () => {
  const { notify } = useNotification()

  const handleSubmit = () => {
    notify({
      message: 'Archivo añadido exitosamente',
      type: 'success',
      show: true,
    })
  }
  let formRef = useRef<HTMLFormElement>(null)
  let navigation = useNavigation()
  let actionData = useActionData()

  useEffect(
    function resetFormOnSuccess() {
      if (navigation.state === 'idle' && actionData?.ok) {
        formRef.current?.reset()
      }
    },
    [navigation.state, actionData]
  )

  return (
    <div>
      <ValidatedForm
        onSubmit={handleSubmit}
        formRef={formRef}
        disableFocusOnError
        validator={validator}
        method='post'
        action='/boletin/administrador'
        className='flex flex-col gap-4'
      >
        <TextInput name='fileId' label='ID de archivo' />
        <div>
          <label htmlFor='fileJury' className='text-sm font-semibold leading-6 text-indigo-600'>
            Juzgado
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
            Descripción
          </label>
          <textarea
            placeholder='(Opcional)'
            id='fileDescription'
            name='fileDescription'
            rows={6}
            className='resize-none m-0 flex flex-row items-center gap-2 w-full rounded-md border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm border-2 focus-visible:outline focus-visible:outline-0 whitespace-nowrap'
          />
        </div>
        <SubmitBtn className='w-full cursor-pointer rounded-md border-2 border-indigo-600 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' />
      </ValidatedForm>
    </div>
  )
}

export default SingleFileUpload
