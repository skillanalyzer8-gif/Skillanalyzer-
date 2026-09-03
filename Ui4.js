
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
// START TYPOGRAPHY CHALLENGE
// ========================================

startChallenge.addEventListener("click", async () => {

    // Check login
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
        "Choose typography that is readable, comfortable, and suitable for a news application.";

    statusText.textContent =
        "🔤 AI Design Mentor is analyzing your typography choice...";


    try {

        // ========================================
        // SAVE MISSION 4
        // ========================================

        await setDoc(
            doc(
                db,
                "users",
                currentUser.uid,
                "missions",
                "mission4"
            ),
            {

                missionNumber: 4,

                answer:
                    "Use a clean, readable font with appropriate size, spacing, and hierarchy for comfortable news reading.",

                score: 100,

                category: "Typography",

                completed: true,

                completedAt:
                    new Date().toISOString()

            }
        );


        // ========================================
        // FINAL RESULT
        // ========================================

        challengeText.textContent =
            "Excellent! Good typography improves readability, hierarchy, and the overall reading experience.";

        statusText.textContent =
            "✅ Mission 4 completed! You understand the importance of typography.";


        missionCompleted = true;


        // ========================================
        // UPDATE BUTTON
        // ========================================

        startChallenge.textContent =
            "MISSION COMPLETED ✓";

        startChallenge.disabled = true;

        startChallenge.style.opacity = "0.7";


    } catch (error) {

        // ========================================
        // FIREBASE ERROR
        // ========================================

        console.error(
            "UI4 Firebase Error:",
            error
        );


        // Allow retry
        startChallenge.disabled = false;

        startChallenge.style.opacity = "1";


        statusText.textContent =
            "❌ Could not save your mission. Please try again.";

    }

});