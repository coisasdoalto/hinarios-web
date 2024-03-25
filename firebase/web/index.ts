import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB5b-4YN-tb1Re_iTf29lz2gid3TtmpDzI',
  authDomain: 'hinos-online.firebaseapp.com',
  databaseURL: 'https://hinos-online.firebaseio.com',
  projectId: 'hinos-online',
  storageBucket: 'hinos-online.appspot.com',
  messagingSenderId: '569976724076',
  appId: '1:569976724076:web:c19fcc6837511fc5361649',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

export const auth = getAuth(app);
