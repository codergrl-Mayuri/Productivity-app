import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, push, onValue, remove } from 'firebase/database';



const firebaseConfig = {
    apiKey: "AIzaSyCq7BCbVm-HG3H7vSnDDdwOeEdUJ8nn9Lw",
    authDomain: "productivity-c089b.firebaseapp.com",
    databaseURL: "https://productivity-c089b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "productivity-c089b",
    storageBucket: "productivity-c089b.firebasestorage.app",
    messagingSenderId: "39259172312",
    appId: "1:39259172312:web:5381bda24c94a043b3d6ad"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database, ref, set, push, onValue, remove };