import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyC3luIoVocDmip06zK35Ztf31j9aDJo3rc",
//   authDomain: "miniblog-cc18f.firebaseapp.com",
//   projectId: "miniblog-cc18f",
//   storageBucket: "miniblog-cc18f.appspot.com",
//   messagingSenderId: "332770590045",
//   appId: "1:332770590045:web:3c49f146189d3ab1c17cb4"
// };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };