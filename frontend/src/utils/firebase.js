// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcrY4d8Vmb-4QSWmzOQ7gUsOS5trQl6Og",
  authDomain: "blogify-66da3.firebaseapp.com",
  projectId: "blogify-66da3",
  storageBucket: "blogify-66da3.firebasestorage.app",
  messagingSenderId: "1016092060494",
  appId: "1:1016092060494:web:b8b8e7e1c564cf03f08c1f",
  measurementId: "G-SRV6VKVM6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function googleAuth(){
  try {
    let data = await signInWithPopup(auth, provider);
    return data;
  } catch (error) {
    console.log(`Error -> ${error}`)
  }
}

// const analytics = getAnalytics(app);