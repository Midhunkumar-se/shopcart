import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyANYxBuTiIlEpS8CrXMFBqmfmf4ZIQOAdw",
  authDomain: "shopcart-17540.firebaseapp.com",
  projectId: "shopcart-17540",
  storageBucket: "shopcart-17540.appspot.com",
  messagingSenderId: "790603539721",
  appId: "1:790603539721:web:37c1a563aa82d8ad659fd8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
