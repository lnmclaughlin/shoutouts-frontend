import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADmUBn6s7frt3JmTE7nilxK5W5IacBkeE",
  authDomain: "shoutouts-ec218.firebaseapp.com",
  projectId: "shoutouts-ec218",
  storageBucket: "shoutouts-ec218.appspot.com",
  messagingSenderId: "747405449699",
  appId: "1:747405449699:web:1f894d442832a9fd2f28d6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export const signInWithGoogle = (): void => {
  signInWithPopup(auth, authProvider);
};

export const signOut = (): void => {
  auth.signOut();
};

export const storage = getStorage(app);
