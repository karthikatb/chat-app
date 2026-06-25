// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcZmeRav9DmtVSFAEZ25jPwZk2nh9MpKM",
  authDomain: "chatapp-a91fc.firebaseapp.com",
  projectId: "chatapp-a91fc",
  storageBucket: "chatapp-a91fc.firebasestorage.app",
  messagingSenderId: "751434660291",
  appId: "1:751434660291:web:b4636a031e3ecccf09e576"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);