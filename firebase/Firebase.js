import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDPgwR03PxAaFnFa9I3gs8Au61eYVkxTZk",
  authDomain: "tusnami-3800d.firebaseapp.com",
  projectId: "tusnami-3800d",
  storageBucket: "tusnami-3800d.appspot.com",
  messagingSenderId: "885396201853",
  appId: "1:885396201853:web:18cbc7473656ce4fc2ac14"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storages = getStorage(app);
export default app;
