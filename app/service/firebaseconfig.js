// firebaseconfig.js
import { initializeApp } from 'firebase/app'; // Import initializeApp
import { getFirestore, collection, getDocs} from 'firebase/firestore'; // Import Firestore
import { getAuth } from 'firebase/auth'; // Import Auth
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage untuk persistensi
import { getReactNativePersistence } from 'firebase/auth'; // Import persistence
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDDf8uhRZBhlBDMyMGamVSWO3bDZNV5eRE",
  authDomain: "tutorin-ab60c.firebaseapp.com",
  projectId: "tutorin-ab60c",
  storageBucket: "tutorin-ab60c.appspot.com",
  messagingSenderId: "531323365692",
  appId: "1:531323365692:web:809b2e3ebac1a3094ad639",
  measurementId: "G-3VQRK7BYCJ"
};

// Mengecek jika Firebase sudah diinisialisasi
let app;
if (typeof initializeApp === "function" && !initializeApp.apps || initializeApp.apps.length === 0) {
  app = initializeApp(firebaseConfig); // Inisialisasi jika belum ada
} else {
  app = initializeApp.app(); // Jika sudah ada, ambil yang sudah diinisialisasi
}

// Inisialisasi Firestore dan Auth
const firestore = getFirestore(app);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Setup persistence
});


// Ekspor objek untuk digunakan di tempat lain
export { firestore, auth };
