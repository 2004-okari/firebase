// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBVggqi4dQtaSzzOzdJTi_n7XrneteK55k',
  authDomain: 'authenticationokari.firebaseapp.com',
  projectId: 'authenticationokari',
  storageBucket: 'authenticationokari.appspot.com',
  messagingSenderId: '242992445086',
  appId: '1:242992445086:web:65131cdddd8f964ab6ed8f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const provider = new GoogleAuthProvider();
authentication.useDeviceLanguage();
