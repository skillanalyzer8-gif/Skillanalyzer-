import { auth, db } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startBtn = document.getElementById("startChallenge");
const designArea = document.querySelector(".designArea");
const status = document.getElementById("statusText");

let currentUser = null;
let missionCompleted = false;


// ===============================
// AUTHENTICATION
// ===============================

onAuthStateChanged(auth, (user) => {

    if (user) {

        currentUser = user;

    } else {

        alert("Please login first.");
        window.location.href = "Login.html";

    }

});


// ===============================
// COMPLETE JOURNEY
// ===============================

startBtn.addEventListener("click", async () => {

    if (missionCompleted) return;


    if (!currentUser) {

        alert("Please login first.");
        window.location.href = "Login.html";

        return;

    }


    startBtn.style.display = "none";

    status.innerHTML =
        "🏆 Evaluating your 20-mission UX journey...";

    navigator.vibrate?.([
        100,
        80,
        100,
        80,
        200
    ]);


    setTimeout(() => {

        completeFinalMission();

    }, 1800);

});


// ===============================
// FINAL EVALUATION
// ===============================

async function completeFinalMission() {

    const finalScore = 100;
    const finalCategory = "UX Mastery";
    const finalAnswer = "Completed all 20 UI/UX Missions";


    designArea.innerHTML = `

        <h2>🏆 UX MASTERY ACHIEVED!</h2>

        <