import Container from '~/components/Container'
import Tabs from '~/components/Tabs'
import { SquaresPlusIcon, UserIcon } from '@heroicons/react/20/solid'
import AdminTable from '~/components/AdminTable'
import Navbar from '~/components/Navbar'
import { adminLoader } from '~/loader'
import { useLoaderData } from '@remix-run/react'
import type { ActionFunction } from '@remix-run/node'
import { addFile, deleteFile, getCurrentUser } from '~/utils/files'
export { adminLoader as loader }

const tabs = [
  { name: 'Resumen', href: '/boletin/resumen', icon: SquaresPlusIcon, current: false },
  { name: 'Administrador de archivos', href: '/boletin/administrador', icon: UserIcon, current: true },
]

const BoletinV2 = () => {
  const { user, files } = useLoaderData()

  return (
    <div>
      <Navbar user={user} />
      <Container>
        <Tabs tabs={tabs} />
        <AdminTable files={files} />
      </Container>
    </div>
  )
}

export default BoletinV2

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData()

  if (request.method === 'DELETE') {
    const selectedFiles = body.get('selectedFiles') as string
    const filesToDelete = selectedFiles?.split(',')
    const fileOperations = filesToDelete.map(fileId => deleteFile(fileId))
    await Promise.all(fileOperations)
    return { fileId: '' }
  } else {
    const fileId = body.get('fileId')
    const zeroPaddedFileId = fileId?.padStart(10, '0') // Add 0's to start of the file ID if they're missing
    const fileJury = body.get('fileJury')
    const fileCity = body.get('fileCity')
    const fileDescription = body.get('fileDescription')
    const file = { fileId: zeroPaddedFileId, fileJury: fileJury, city: fileCity, description: fileDescription }
    const user = await getCurrentUser(request)
    addFile(file, user)

    return { fileId, ok: true }
  }
}
