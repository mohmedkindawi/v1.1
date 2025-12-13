import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

console.log('Initializing Firebase...');
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

console.log('Setting up Firebase Auth...');
export const auth = getAuth(app);
console.log('Firebase Auth setup complete');

console.log('Setting up Firestore...');
export const db = getFirestore(app);
console.log('Firestore setup complete');

// Debug helper: do not log secrets in production. This prints presence (true/false)
// of each env var in the browser console to help local troubleshooting.
if (import.meta.env.MODE === 'development') {
  try {
    // eslint-disable-next-line no-console
    console.info('Firebase config presence:', {
      apiKey: Boolean(firebaseConfig.apiKey),
      authDomain: Boolean(firebaseConfig.authDomain),
      projectId: Boolean(firebaseConfig.projectId),
      storageBucket: Boolean(firebaseConfig.storageBucket),
      messagingSenderId: Boolean(firebaseConfig.messagingSenderId),
      appId: Boolean(firebaseConfig.appId),
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error checking firebase config presence', e);
  }
}