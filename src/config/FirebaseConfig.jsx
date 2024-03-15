import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCQyqpmISqUSE7spZwNEM0qFU8GVi9o6pQ",
    authDomain: "flashback-57797.firebaseapp.com",
    projectId: "flashback-57797",
    storageBucket: "flashback-57797.appspot.com",
    messagingSenderId: "554657174981",
    appId: "1:554657174981:web:080ea03aa95d48bcc567ac",
    measurementId: "G-CVGF6HTHF0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)

//const analytics = getAnalytics(app);