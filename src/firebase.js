import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAjS7n2t8VDQhSj74oOqUJOMJ8Dp8Tctkc",
    authDomain: "study-stamp.firebaseapp.com",
    projectId: "study-stamp",
    storageBucket: "study-stamp.appspot.com",
    messagingSenderId: "172833368845",
    appId: "1:172833368845:web:74a6f85a301a46ba469e44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;