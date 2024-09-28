// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGiD8cjlJ6qyfoHtj6mTUxio3mNdPoGnY",
  authDomain: "ipfs-db.firebaseapp.com",
  projectId: "ipfs-db",
  storageBucket: "ipfs-db.appspot.com",
  messagingSenderId: "408460006861",
  appId: "1:408460006861:web:e70ba0764b28138a996084"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
