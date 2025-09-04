import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
apiKey: 'YOUR_KEY',
authDomain: 'YOUR_DOMAIN.firebaseapp.com',
projectId: 'YOUR_PROJECT_ID',
storageBucket: 'YOUR_BUCKET',
appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// persist on web using IndexedDB/localStorage
setPersistence(auth, browserLocalPersistence);

export const db = getFirestore(app);