// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    getFunctions
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-functions.js";


const firebaseConfig = {

    apiKey: "AIzaSyAZVt5Y4OVUPMZel0oARdtkXlZt8L-ai34",

    authDomain: "skillanalyzer-373ae.firebaseapp.com",

    projectId: "skillanalyzer-373ae",

    storageBucket: "skillanalyzer-373ae.firebasestorage.app",

    messagingSenderId: "952710822091",

    appId: "1:952710822091:web:0f94738430db44219f834e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Firebase Authentication
const auth = getAuth(app);


// Firestore Database
const db = getFirestore(app);


// Firebase Cloud Functions
const functions = getFunctions(
    app,
    "asia-south1"
);


// Export everything
export {
    app,
    auth,
    db,
    functions
};