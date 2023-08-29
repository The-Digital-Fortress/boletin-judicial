import React, { useReducer } from 'react'
import Container from '~/components/Container'
import Tabs from '~/components/Tabs'
import OverviewTable from '~/components/OverviewTable'
import Navbar from '~/components/Navbar'
import { COLUMNS, MY_JUZGADO_MAP, TABS } from '~/constants'
import { convertDateToLocale } from '~/utils'
import { adminLoader } from '~/loader'
import { useLoaderData } from '@remix-run/react'
import ComboBox from '~/components/ComboBox'
import { actionTypes, initialState, resumeReducer } from '~/utils/resumen/resumeReducer'
export { adminLoader as loader }

const BoletinV2 = () => {
  const { user, summaryFiles } = useLoaderData()
  const [state, dispatch] = useReducer(resumeReducer, initialState)

  const handleSearch = (event: any) => {
    dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: event.target.value })
  }

  const filteredFiles = state.searchTerm
    ? summaryFiles.filter((file: any) => {
        return (
          (file.city && file.city.toLowerCase().includes(state.searchTerm.toLowerCase())) ||
          (file.fileJury && MY_JUZGADO_MAP[file.fileJury].toLowerCase().includes(state.searchTerm.toLowerCase())) ||
          (file.fileId && file.fileId.toLowerCase().includes(state.searchTerm.toLowerCase())) ||
          (file.foundDate &&
            convertDateToLocale(file.foundDate)?.toLowerCase().includes(state.searchTerm.toLowerCase())) ||
          (file.partsName && file.partsName.toLowerCase().includes(state.searchTerm.toLowerCase()))
        )
      })
    : summaryFiles

  return (
    <div>
      <Navbar user={user} />
      <Container>
        <Tabs tabs={TABS} />

        {/* Last updated section */}
        <div className='text-gray-500 text-sm font-medium flex gap-3 items-center'>
          <button className='block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            Actualizar
          </button>
          <span>Ultima actualizacion: </span>
          <span className='text-indigo-600 text-sm font-medium'>Hace 13 minutos</span>
        </div>

        <div className='flex justify-between z-20'>
          <input
            className='w-full rounded-md lg:max-w-[300px] border-indigo-400 focus:border-indigo-600 focus-visible:border-indigo-600 px-3.5  text-sm font-semibold text-indigo-600 border-2'
            type='text'
            value={state.searchTerm}
            onChange={handleSearch}
            placeholder='Buscar entre los archivos encontrados...'
          />

          <ComboBox className='z-10' columns={COLUMNS} state={state} dispatch={dispatch} />
        </div>

        <OverviewTable files={filteredFiles} state={state} />
      </Container>
    </div>
  )
}

export default BoletinV2
