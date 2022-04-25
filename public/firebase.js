import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCu0cKhRSlFHHqwlbSrJQw_2eUD4GdnI7c",
    authDomain: "userdirectory-ab5b3.firebaseapp.com",
    projectId: "userdirectory-ab5b3",
    storageBucket: "userdirectory-ab5b3.appspot.com",
    messagingSenderId: "69300335554",
    appId: "1:69300335554:web:1998ea314c25978c695c5b",
    measurementId: "G-VJR96Y9680"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const authObj = getAuth(app);
const databaseObj = getDatabase(app);

export const auth = authObj;
export const database = databaseObj;