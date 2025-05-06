// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'lab9firebase-85baf.firebaseapp.com',
  projectId: 'lab9firebase-85baf',
  storageBucket: 'lab9firebase-85baf.firebasestorage.app',
  messagingSenderId: '653993298703',
  appId: '1:653993298703:web:4c2495bf9e08a367868c7a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
