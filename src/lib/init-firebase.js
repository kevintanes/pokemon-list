import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB_p-A9I_o5wW0ULqmEDFSLxFHTC4GsATo",
    authDomain: "pokedex-list.firebaseapp.com",
    projectId: "pokedex-list",
    storageBucket: "pokedex-list.appspot.com",
    messagingSenderId: "118741228920",
    appId: "1:118741228920:web:f30b74ba46ece6a7837c8d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const db = getFirestore(app);