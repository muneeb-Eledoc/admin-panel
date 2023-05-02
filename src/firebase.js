import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAHrZpwGX-a1QEGrKJ4dM_nefn13clNiBw",
    authDomain: "admin-panel-172da.firebaseapp.com",
    projectId: "admin-panel-172da",
    storageBucket: "admin-panel-172da.appspot.com",
    messagingSenderId: "46535879253",
    appId: "1:46535879253:web:2fa71b29b79bdf3aac42dc",
    measurementId: "G-TGCL887F1L"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)