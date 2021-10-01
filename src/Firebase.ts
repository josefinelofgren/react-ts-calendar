import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA9-907emHXJmKhtrX-ccHSaFqQQ1pGmKI",
    authDomain: "calender-todo-374ad.firebaseapp.com",
    databaseURL: "https://calender-todo-374ad-default-rtdb.firebaseio.com/",
    projectId: "calender-todo-374ad",
    storageBucket: "calender-todo-374ad.appspot.com",
    messagingSenderId: "369571814179",
    appId: "1:369571814179:web:b68645c23680bb71faca96",
    measurementId: "G-Q8CJ9ZF8WH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;