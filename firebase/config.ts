import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "discord-clone-cb757.firebaseapp.com",
  projectId: "discord-clone-cb757",
  storageBucket: "discord-clone-cb757.appspot.com",
  messagingSenderId: "312641407214",
  appId: "1:312641407214:web:2dc055bd166e801e014bff",
  measurementId: "G-R5EW5W6VJ2",
};

const firebase = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebase);

export { firebase, firebaseStorage };
