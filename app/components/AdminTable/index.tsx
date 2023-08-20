/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useLayoutEffect, useReducer, useRef, useState } from 'react'
import { classNames, convertDateToLocale } from '~/utils'
import SubmissionModal from '../SubmissionModal'
import { actionTypes, adminTableReducer, initialState } from './adminTableReducer'
import { MY_JUZGADO_MAP } from '~/constants'

const statuses = { found: 'text-green-400 bg-green-400/10', notFound: 'text-rose-400 bg-rose-400/10' }

export default function AdminTable({ files }) {
  const checkbox = useRef()
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedFiles, setSelectedPeople] = useState([])
  const [state, dispatch] = useReducer(adminTableReducer, initialState)

  useLayoutEffect(() => {
    const isIndeterminate = selectedFiles.length > 0 && selectedFiles.length < files.length
    setChecked(selectedFiles.length === files.length)
    setIndeterminate(isIndeterminate)
    checkbox.current.indeterminate = isIndeterminate
  }, [selectedFiles])

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : files)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  return (
    <div className='px-4 sm:px-6 lg:px-0'>
      <div className='sm:flex sm:items-center'>
        <div className='mt-4 sm:ml-auto sm:mt-0 sm:flex-none'>
          <button
            type='button'
            onClick={() => dispatch({ type: actionTypes.SET_MODAL_OPEN, payload: true })}
            className='block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Agregar archivo
          </button>
        </div>
      </div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='relative'>
              {selectedFiles.length > 0 && (
                <div className='absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12'>
                  <button
                    type='button'
                    className='inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white'
                  >
                    Eliminar archivos seleccionados
                  </button>
                </div>
              )}
              <table className='min-w-full table-fixed divide-y divide-gray-300'>
                <thead>
                  <tr>
                    <th scope='col' className='relative px-7 sm:w-12 sm:px-6'>
                      <input
                        type='checkbox'
                        className='absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th scope='col' className='min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900'>
                      Juzgado
                    </th>
                    <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                      Expediente
                    </th>
                    <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                      Fecha encontrado
                    </th>
                    <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                      Ciudad
                    </th>
                    <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-3'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {files.map((file, idx) => (
                    <tr key={idx} className={selectedFiles.includes(file) ? 'bg-gray-50' : undefined}>
                      <td className='relative px-7 sm:w-12 sm:px-6'>
                        {selectedFiles.includes(file) && (
                          <div className='absolute inset-y-0 left-0 w-0.5 bg-indigo-600' />
                        )}
                        <input
                          type='checkbox'
                          className='absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          value={file.foundDate}
                          checked={selectedFiles.includes(file)}
                          onChange={e =>
                            setSelectedPeople(
                              e.target.checked ? [...selectedFiles, file] : selectedFiles.filter(p => p !== file)
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                          selectedFiles.includes(file) ? 'text-indigo-600' : 'text-gray-900'
                        )}
                      >
                        {MY_JUZGADO_MAP[file.fileJury]}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{file.fileId}</td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        <div className='flex items-center gap-3'>
                          <div
                            className={classNames(
                              file.foundDate ? statuses.found : statuses.notFound,
                              'flex-none rounded-full p-1 '
                            )}
                          >
                            <div className='h-1.5 w-1.5 rounded-full bg-current' />
                          </div>
                          <div className='hidden text-gray-500 sm:block'>
                            {convertDateToLocale(file.foundDate) || 'No encontrado'}
                          </div>
                        </div>
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{file.city}</td>
                      <td className='whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3'>
                        <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                          Editar<span className='sr-only'>, {file.jury}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <SubmissionModal state={state} dispatch={dispatch} />
    </div>
  )
}
