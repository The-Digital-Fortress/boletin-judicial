import { uuidv4 } from '@firebase/util'
import { db } from '~/firebase.client'
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'

export function useAddFile() {
  const [isLoading, setIsLoading] = useState(false)

  async function addFile(file) {
    const id = uuidv4()
    const docRef = doc(db, 'userFiles', id)
    await setDoc(docRef, { file, id, date: Date.now(), uid: '7B5PIEiLHqaWOtRIn6WK5a1SxOr1' })
    setIsLoading(false)
  }

  return { addFile, isLoading }
}
