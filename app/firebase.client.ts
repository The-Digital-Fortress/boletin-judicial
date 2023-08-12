// app/firebase.client.ts

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, inMemoryPersistence, setPersistence } from 'firebase/auth'

const firebaseConfig = {
  apiKey: window.ENV.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'boletin-judicial.firebaseapp.com',
  projectId: 'boletin-judicial',
  storageBucket: 'boletin-judicial.appspot.com',
  messagingSenderId: '180651255937',
  appId: '1:180651255937:web:d6e730c665723467538580',
  measurementId: 'G-WXTFT79HG9',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

// Let Remix handle the persistence via session cookies.
setPersistence(auth, inMemoryPersistence)
