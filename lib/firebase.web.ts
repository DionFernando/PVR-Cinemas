import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkYnrZUVPIEcECoeZ43pFlqZ9o2yc-yM0",
  authDomain: "pvr-cinemas-3e9c5.firebaseapp.com",
  projectId: "pvr-cinemas-3e9c5",
  storageBucket: "pvr-cinemas-3e9c5.firebasestorage.app",
  messagingSenderId: "442983596874",
  appId: "1:442983596874:web:a0358eacb5f94a8162b7b3",
  measurementId: "G-VPK447LBC7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const db = getFirestore(app);
