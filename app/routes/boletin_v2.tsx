import React from 'react'
import Container from '~/components/Container'
import Tabs from '~/components/Tabs'
import { SquaresPlusIcon, UserIcon } from '@heroicons/react/20/solid'

const tabs = [
  { name: 'Resumen', href: '#', icon: SquaresPlusIcon, current: true },
  { name: 'Administrador de archivos', href: '#', icon: UserIcon, current: false },
]

const BoletinV2 = () => {
  return (
    <Container>
      <Tabs tabs={tabs} />
    </Container>
  )
}

export default BoletinV2
