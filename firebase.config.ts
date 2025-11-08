import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
// @ts-ignore: getReactNativePersistence exists in the RN bundle
// but is often missing from public TypeScript definitions.
import { getReactNativePersistance, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBXALulc5JdK3p4zgQJkjvtlifH7rUbRcg',
  authDomain: 'caroomanager.firebaseapp.com',
  projectId: 'caroomanager',
  storageBucket: 'caroomanager.firebasestorage.app',
  messagingSenderId: '963039015915',
  appId: '1:963039015915:web:0d3ee166b64c63a79e1fae',
  measurementId: 'G-6ZS39TCGQK'
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistance(ReactNativeAsyncStorage)
});
