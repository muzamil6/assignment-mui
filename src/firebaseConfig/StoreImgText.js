
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDdCw25iOS1kjq-TXc0Bm806WWUoiPmxUM",
    authDomain: "assignment-45633.firebaseapp.com",
    projectId: "assignment-45633",
    storageBucket: "assignment-45633.firebasestorage.app",
    messagingSenderId: "974036428034",
    appId: "1:974036428034:web:99f0830b00978a80d24e1b",
    measurementId: "G-HM4P9R543L"
  };
  
export const app = initializeApp(firebaseConfig);
export const imgDB = getStorage(app);
export const textDB = getFirestore(app);
