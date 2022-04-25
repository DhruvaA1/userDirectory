import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const authObj = getAuth(app);
const databaseObj = getDatabase(app);

export const auth = authObj;
export const database = databaseObj;