// app/firebase.client.ts

import { initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";

const app = initializeApp({
  apiKey: window.ENV.REACT_APP_FIREBASE_API_KEY,
  authDomain: "boletin-judicial.firebaseapp.com",
  projectId: "boletin-judicial",
  storageBucket: "boletin-judicial.appspot.com",
  messagingSenderId: "180651255937",
  appId: "1:180651255937:web:d6e730c665723467538580",
  measurementId: "G-WXTFT79HG9"
});

const auth = getAuth(app);

// Let Remix handle the persistence via session cookies.
setPersistence(auth, inMemoryPersistence);

export { auth };