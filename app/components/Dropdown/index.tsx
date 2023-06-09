import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  setMunicipality: (value: string) => void
}

export default function Dropdown({ setMunicipality }: Props) {
  const [selectedItem, setSelectedItem] = useState('Tijuana')

  const handleSelection = (e: any) => {
    e.preventDefault()
    setSelectedItem(e.target.textContent)
    setMunicipality(e.target.textContent)
  }

  return (
    <Menu
      as='div'
      className='relative inline-block text-left w-full lg:max-w-[300px]'
    >
      <div>
        <Menu.Button className='flex items-center w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 font-semibold text-indigo-600 border-2 border-indigo-600 '>
          {selectedItem ? selectedItem : 'Selecciona un municipio'}
          <ChevronDownIcon
            className='-mr-1 h-5 w-5 text-indigo-600'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item>
              {({ active, close }) => (
                <button
                  onClick={e => {
                    handleSelection(e)
                    close()
                  }}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full'
                  )}
                >
                  Mexicali
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active, close }) => (
                <button
                  onClick={e => {
                    handleSelection(e)
                    close()
                  }}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full'
                  )}
                >
                  Tijuana
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active, close }) => (
                <button
                  onClick={e => {
                    handleSelection(e)
                    close()
                  }}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full'
                  )}
                >
                  Ensenada
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active, close }) => (
                <button
                  onClick={e => {
                    handleSelection(e)
                    close()
                  }}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full'
                  )}
                >
                  Tecate
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
