import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDq22BOjgf1BqS0GepvrdGPoQTcQj6TKoA",
  authDomain: "clone-7a3ab.firebaseapp.com",
  projectId: "clone-7a3ab",
  storageBucket: "clone-7a3ab.firebasestorage.app",
  messagingSenderId: "879282961503",
  appId: "1:879282961503:web:aba3e75ef1e83c2292afea"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = app.firestore();
