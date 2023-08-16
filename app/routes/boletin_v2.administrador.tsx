import React, { useState } from 'react'
import Container from '~/components/Container'
import Tabs from '~/components/Tabs'
import { SquaresPlusIcon, UserIcon } from '@heroicons/react/20/solid'
import OverviewTable from '~/components/OverviewTable'
import AdminTable from '~/components/AdminTable'

const tabs = [
  { name: 'Resumen', href: '/boletin_v2/resumen', icon: SquaresPlusIcon, current: false },
  { name: 'Administrador de archivos', href: '/boletin_v2/administrador', icon: UserIcon, current: true },
]

const BoletinV2 = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <Container>
      <Tabs tabs={tabs} />

      <AdminTable />
    </Container>
  )
}

export default BoletinV2
