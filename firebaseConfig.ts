import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

// Optionally import the services that you want to use
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC68Y-bbVN_fbai0b_6WjjT69Sh8tAu9gA',
  authDomain: 'caroomanager.firebaseapp.com',
  // databaseURL: 'https://caroomanager.firebaseio.com',
  projectId: 'caroomanager',
  storageBucket: 'caroomanager.firebasestorage.app',
  // messagingSenderId: 'sender-id',
  appId: '1:963039015915:android:170224cb3c47b4db9e1fae',
  // measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase