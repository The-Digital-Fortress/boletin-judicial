import { uuidv4 } from '@firebase/util'
import { db } from '~/firebase.server'
import { doc, setDoc } from 'firebase/firestore'

type File = {
  fileId: FormDataEntryValue | null
  fileName: FormDataEntryValue | null
}

export async function addFile(file: File) {
  const id = uuidv4()
  // const docRef = doc(db, 'userFiles', id)
  // console.log(db)
  // await setDoc(docRef, { file, id, date: Date.now(), uid: '7B5PIEiLHqaWOtRIn6WK5a1SxOr1' })
}
