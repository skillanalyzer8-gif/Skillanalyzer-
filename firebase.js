import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ===============================
// FIREBASE CONFIGURATION
// ===============================

const firebaseConfig = {

    apiKey: "AIzaSyAZVt5Y4OVUPMZel0oARdtkXlZt8L-ai34",

    authDomain: "skillanalyzer-373ae.firebaseapp.com",

    projectId: "skillanalyzer-373ae",

    storageBucket: "skillanalyzer-373ae.firebasestorage.app",

    messagingSenderId: "952710822091",

    appId: "1:952710822091:web:0f94738430db44219f834e"

};


// ===============================
// INITIALIZE FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);


// ===============================
// FIREBASE AUTHENTICATION
// ===============================

const auth = getAuth(app);


// ===============================
// FIRESTORE
// ===============================

const db = getFirestore(app);


// ===============================
// EXPORT
// ===============================

export {
    auth,
    db
};