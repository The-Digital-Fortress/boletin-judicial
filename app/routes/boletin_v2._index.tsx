import React, { useState } from 'react'
import Container from '~/components/Container'
import Tabs from '~/components/Tabs'
import { SquaresPlusIcon, UserIcon } from '@heroicons/react/20/solid'
import OverviewTable from '~/components/OverviewTable'
import AdminTable from '~/components/AdminTable'
import { routesLoader } from '~/loader'
import { useLoaderData } from '@remix-run/react'
import Navbar from '~/components/Navbar'
export { routesLoader as loader }

const tabs = [
  { name: 'Resumen', href: '/boletin_v2/resumen', icon: SquaresPlusIcon, current: true },
  { name: 'Administrador de archivos', href: '/boletin_v2/administrador', icon: UserIcon, current: false },
]

const BoletinV2 = () => {
  const user = useLoaderData()
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div>
      <Navbar user={user} />
      <Container>
        <Tabs tabs={tabs} />

        {/* Last updated section */}
        <div className='text-gray-500 text-sm font-medium flex gap-3 items-center'>
          <span>Ultima actualizacion: </span>
          <span className='text-indigo-600 text-sm font-medium'>Hace 13 minutos</span>
          <button className='cursor-pointer rounded-md border-2 border-indigo-600 bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all'>
            Actualizar
          </button>
        </div>

        <input
          className='w-full rounded-md lg:max-w-[300px] border-indigo-400 focus:border-indigo-600 focus-visible:border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600  border-2'
          type='text'
          value={searchTerm}
          // TODO: handle search
          // onChange={handleSearch}
          placeholder='Buscar entre los archivos encontrados...'
        />

        <OverviewTable />
        <AdminTable />
      </Container>
    </div>
  )
}

export default BoletinV2
