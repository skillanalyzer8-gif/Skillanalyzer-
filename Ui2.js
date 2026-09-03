import { auth, db } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ========================================
// DOM ELEMENTS
// ========================================

const challengeText =
    document.getElementById("challengeText");

const statusText =
    document.getElementById("statusText");

const startChallenge =
    document.getElementById("startChallenge");


let currentUser = null;
let missionCompleted = false;


// ========================================
// AUTHENTICATION
// ========================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        currentUser = user;

    } else {

        alert("Please login first.");

        window.location.href = "Login.html";

    }

});


// ========================================
// START COLOR CHALLENGE
// ========================================

startChallenge.addEventListener("click", async () => {

    // Check whether user is logged in
    if (!currentUser) {

        alert("Please login first.");

        window.location.href = "Login.html";

        return;

    }


    // Prevent duplicate completion
    if (missionCompleted) {

        return;

    }


    // Disable button while processing
    startChallenge.disabled = true;

    startChallenge.style.opacity = "0.6";


    // ========================================
    // START CHALLENGE
    // ========================================

    challengeText.textContent =
        "For the banking application, choose a color that communicates trust, security, and reliability.";

    statusText.textContent =
        "🌈 AI Design Mentor is analyzing your color psychology...";


    try {

        // ========================================
        // SAVE MISSION 2
        // ========================================

        await setDoc(
            doc(
                db,
                "users",
                currentUser.uid,
                "missions",
                "mission2"
            ),
            {

                missionNumber: 2,

                answer:
                    "Blue communicates trust, security, and reliability.",

                selectedColor: "Blue",

                score: 100,

                category: "Color Psychology",

                completed: true,

                completedAt:
                    new Date().toISOString()

            }
        );


        // ========================================
        // FINAL RESULT
        // ========================================

        challengeText.textContent =
            "Excellent choice! Blue is commonly associated with trust, security, and reliability.";

        statusText.textContent =
            "✅ Mission 2 completed! Your color psychology decision was successful.";


        missionCompleted = true;


        // Update button
        startChallenge.textContent =
            "MISSION COMPLETED ✓";

        startChallenge.disabled = true;

        startChallenge.style.opacity = "0.7";


    } catch (error) {

        // ========================================
        // FIREBASE ERROR
        // ========================================

        console.error(
            "UI2 Firebase Error:",
            error
        );


        // Allow retry
        startChallenge.disabled = false;

        startChallenge.style.opacity = "1";


        statusText.textContent =
            "❌ Could not save your mission. Please try again.";

    }

});