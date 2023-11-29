import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAr3VdGfbHhaBI0aeE2SvsDaddLNdRlE2Y",
    authDomain: "ngchat-98887.firebaseapp.com",
    projectId: "ngchat-98887",
    storageBucket: "ngchat-98887.appspot.com",
    messagingSenderId: "315444542778",
    appId: "1:315444542778:web:dfc79b067726b214572403",
    measurementId: "G-SL2K4XDP9R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();