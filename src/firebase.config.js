// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5la3Q3-iZ8KpdCNQViEH2UmScA6oPgE4",
  authDomain: "dive-app-e230d.firebaseapp.com",
  projectId: "dive-app-e230d",
  storageBucket: "dive-app-e230d.appspot.com",
  messagingSenderId: "662934074090",
  appId: "1:662934074090:web:7d41c2f22179fb01185d93"
};

// Initialize Firebase
initializeApp(firebaseConfig);


export const db = getFirestore()