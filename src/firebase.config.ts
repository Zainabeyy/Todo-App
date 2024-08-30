import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCYZG-0hDpkiHka5LFtGq5IjKJXKC4uwJM",
  authDomain: "todo-list-a5cfa.firebaseapp.com",
  projectId: "todo-list-a5cfa",
  storageBucket: "todo-list-a5cfa.appspot.com",
  messagingSenderId: "755691149265",
  appId: "1:755691149265:web:fc4f954e02e254720072f0"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);