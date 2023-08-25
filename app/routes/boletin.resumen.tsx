import React, { useState } from 'react'
import Container from '~/components/Container'
import Tabs from '~/components/Tabs'
import { SquaresPlusIcon, UserIcon } from '@heroicons/react/20/solid'
import OverviewTable from '~/components/OverviewTable'
import Navbar from '~/components/Navbar'
import { MY_JUZGADO_MAP } from '~/constants'
import { convertDateToLocale } from '~/utils'
import { adminLoader } from '~/loader'
import { useLoaderData } from '@remix-run/react'
export { adminLoader as loader }

const tabs = [
  { name: 'Resumen', href: '/boletin/resumen', icon: SquaresPlusIcon, current: true },
  { name: 'Administrador de archivos', href: '/boletin/administrador', icon: UserIcon, current: false },
]

const BoletinV2 = () => {
  const { user, summaryFiles } = useLoaderData()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredFiles = searchTerm
    ? summaryFiles.filter(file => {
        return (
          (file.city && file.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (file.fileJury && MY_JUZGADO_MAP[file.fileJury].toLowerCase().includes(searchTerm.toLowerCase())) ||
          (file.fileId && file.fileId.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (file.foundDate && convertDateToLocale(file.foundDate)?.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (file.partsName && file.partsName.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      })
    : summaryFiles;
  
  return (
    <div>
      <Navbar user={user} />
      <Container>
        <Tabs tabs={tabs} />

        {/* Last updated section */}
        <div className='text-gray-500 text-sm font-medium flex gap-3 items-center'>
          <button className='block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            Actualizar
          </button>
          <span>Ultima actualizacion: </span>
          <span className='text-indigo-600 text-sm font-medium'>Hace 13 minutos</span>
        </div>

        <input
          className='w-full rounded-md lg:max-w-[300px] border-indigo-400 focus:border-indigo-600 focus-visible:border-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-indigo-600  border-2'
          type='text'
          value={searchTerm}
          onChange={handleSearch}
          placeholder='Buscar entre los archivos encontrados...'
        />

        <OverviewTable files={filteredFiles} />
      </Container>
    </div>
  )
}

export default BoletinV2

