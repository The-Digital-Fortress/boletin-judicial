import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import SingleFileUpload from '../SingleFileUpload'
import { actionTypes } from '../AdminTable/adminTableReducer'

export default function SubmissionModal({ state, dispatch }) {
  return (
    <Transition.Root show={state.modalOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => dispatch({ type: actionTypes.SET_MODAL_OPEN, payload: false })}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8  sm:max-w-lg sm:p-6'>
                <div className='absolute right-0 top-0 hidden pr-4 pt-4 sm:block'>
                  <button
                    type='button'
                    className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    onClick={() => dispatch({ type: actionTypes.SET_MODAL_OPEN, payload: false })}
                  >
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                <div className='sm:flex sm:items-center justify-center'>
                  <div className='mt-3 text-center  sm:mt-0 sm:text-left'>
                    <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-gray-900'>
                      Subir un archivo
                    </Dialog.Title>
                    <div className='mt-2'>
                      <SingleFileUpload />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}