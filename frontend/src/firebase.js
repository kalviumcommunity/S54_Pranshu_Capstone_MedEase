// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHkcSvMijrXvf7OpxyuiCpJmeVOAm2u1A",
  authDomain: "medease-proj.firebaseapp.com",
  projectId: "medease-proj",
  storageBucket: "medease-proj.appspot.com",
  messagingSenderId: "872540828791",
  appId: "1:872540828791:web:17144e1afd0fd047814272"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app