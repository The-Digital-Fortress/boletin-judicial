import { db } from '~/firebase.server'

type File = {
  fileId: FormDataEntryValue | null
  jury: FormDataEntryValue | null
  city: FormDataEntryValue | null
  description: FormDataEntryValue | null
}

export async function addFile(file: File) {
  const filesRef = db.collection('userFiles')
  await filesRef.doc().set({
    ...file,
    createdOn: new Date(),
    fileFoud: false,
    fileFoundUrl: '',
    lastModified: new Date(),
    uid: 'FFeNC7y8vBhs1rOgUSTwSR6gXMt1',
  })
}

export async function getFiles() {
  const filesRef = db.collection('userFiles')
  const docs = await filesRef.get()
  const files = docs.docs.map(doc => doc.data())
  return files
}
