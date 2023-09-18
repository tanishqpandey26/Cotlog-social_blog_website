

import {getAuth,GoogleAuthProvider} from "firebase/auth";

import {getFirestore} from  "firebase/firestore";


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCw4-eDjQJAl14ykRuSwwIitzC0hy-OIUg",
  authDomain: "cotlog-js.firebaseapp.com",
  projectId: "cotlog-js",
  storageBucket: "cotlog-js.appspot.com",
  messagingSenderId: "917470440130",
  appId: "1:917470440130:web:56cf6503f70ebbb8fda95b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider = new GoogleAuthProvider();

export const db= getFirestore(app);