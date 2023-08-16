import React, { useState } from 'react'
import Container from '~/components/Container'
import Tabs from '~/components/Tabs'
import { SquaresPlusIcon, UserIcon } from '@heroicons/react/20/solid'
import AdminTable from '~/components/AdminTable'
import Navbar from '~/components/Navbar'
import { routesLoader } from '~/loader'
import { useLoaderData } from '@remix-run/react'
import { ActionFunction } from '@remix-run/node'
import { addFile } from '~/utils/files'
export { routesLoader as loader }

const tabs = [
  { name: 'Resumen', href: '/boletin_v2/resumen', icon: SquaresPlusIcon, current: false },
  { name: 'Administrador de archivos', href: '/boletin_v2/administrador', icon: UserIcon, current: true },
]

const BoletinV2 = () => {
  const user = useLoaderData()
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div>
      <Navbar user={user} />
      <Container>
        <Tabs tabs={tabs} />
        <AdminTable />
      </Container>
    </div>
  )
}

export default BoletinV2

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData()
  const fileId = body.get('fileId')
  const fileName = body.get('fileName')
  const file = { fileId, fileName }

  addFile(file)

  return { fileId, fileName }
}
