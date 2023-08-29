import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useField } from 'remix-validated-form'

type TextInputProps = {
  name: string
  label: string
}

export default function TextInput({ name, label }: TextInputProps) {
  const { error } = useField(name)
  const errorClases = !error ? 'border-indigo-600 text-indigo-600' : 'text-red-900 border-red-900'
  return (
    <div>
      <label htmlFor='fileId' className='text-sm font-semibold leading-6 text-indigo-600'>
        ID de archivo
      </label>
      <div className='relative mt-2 rounded-md shadow-sm'>
        <input
          placeholder='00111/2023'
          type='text'
          id='fileId'
          name='fileId'
          className={`${errorClases} flex flex-row items-center gap-2 w-full  rounded-md  px-3.5 py-2.5 text-sm font-semibold  shadow-sm border-2 focus-visible:outline focus-visible:outline-0 whitespace-nowrap`}
        />
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
          {error && <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />}
        </div>
      </div>

      {error && (
        <p className='mt-2 text-sm text-red-600' id='email-error'>
          {error}
        </p>
      )}
    </div>
  )
}
