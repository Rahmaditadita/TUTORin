import { initializeApp } from 'firebase/app'; // Import initializeApp
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import { getAuth } from 'firebase/auth'; // Import Auth

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDDf8uhRZBhlBDMyMGamVSWO3bDZNV5eRE",
  authDomain: "tutorin-ab60c.firebaseapp.com",
  databaseURL: "https://tutorin-ab60c-default-rtdb.firebaseio.com",
  projectId: "tutorin-ab60c",
  storageBucket: "tutorin-ab60c.firebasestorage.app",
  messagingSenderId: "531323365692",
  appId: "1:531323365692:web:809b2e3ebac1a3094ad639",
  measurementId: "G-3VQRK7BYCJ"
};

// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore
const firestore = getFirestore(app);

// Inisialisasi Auth
const auth = getAuth(app);

export { firestore, auth };
