import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCqpraZn5K9ClhpASU0T_KkkjH7yW2HbgI",
  authDomain: "boletin-judicial.firebaseapp.com",
  projectId: "boletin-judicial",
  storageBucket: "boletin-judicial.appspot.com",
  messagingSenderId: "180651255937",
  appId: "1:180651255937:web:d6e730c665723467538580",
  measurementId: "G-WXTFT79HG9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;