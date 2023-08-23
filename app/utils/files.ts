import { session } from '~/cookies.server'
import { uuidv4 } from '@firebase/util'
import { auth as serverAuth, db } from '~/firebase.server'

type File = {
  fileId: FormDataEntryValue | null
  fileJury: FormDataEntryValue | null
  city: FormDataEntryValue | null
  description: FormDataEntryValue | null
}

export async function addFile(file: File, user: any) {
  const id = uuidv4()
  const filesRef = db.collection('userFiles')
  await filesRef.doc(id).set({
    ...file,
    id,
    createdOn: new Date(),
    fileFound: false,
    fileFoundUrl: '',
    partsName: '',
    foundDate: null,
    lastModified: new Date(),
    uid: user.uid,
  })
}

export async function deleteFile(fileId: string) {
  await db.collection('userFiles').doc(fileId).delete()
}

export async function getFiles(user: any) {
  const filesRef = db.collection('userFiles')
  const docs = await filesRef.where('uid', '==', user.uid).get()
  const files = docs.docs.map(doc => {
    return { ...doc.data(), foundDate: doc.data().foundDate?.toDate() }
  })
  return files
}

export async function getSummaryFiles(user: any) {
  const filesRef = db.collection('userFiles')
  const docs = await filesRef.where('uid', '==', user.uid).where('fileFound', '==', true).get()
  const files = docs.docs.map(doc => {
    return { ...doc.data(), foundDate: doc.data().foundDate?.toDate() }
  })
  return files
}

export async function getCurrentUser(request) {
  const jwt = await session.parse(request.headers.get('Cookie'))

  if (!jwt) {
    return null
  }
  const decoded = await serverAuth.verifySessionCookie(jwt)

  const user = await serverAuth.getUser(decoded.uid)

  return user
}
