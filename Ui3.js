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
// START ACCESSIBILITY CHALLENGE
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


    // Disable button
    startChallenge.disabled = true;

    startChallenge.style.opacity = "0.6";


    // ========================================
    // START CHALLENGE
    // ========================================

    challengeText.textContent =
        "Choose a design that is easy to read, easy to understand, and usable by children, adults, and elderly users.";

    statusText.textContent =
        "♿ AI Design Mentor is analyzing accessibility requirements...";


    try {

        // ========================================
        // SAVE MISSION 3
        // ========================================

        await setDoc(
            doc(
                db,
                "users",
                currentUser.uid,
                "missions",
                "mission3"
            ),
            {

                missionNumber: 3,

                answer:
                    "Use clear text, readable font sizes, strong contrast, simple navigation, and accessible controls.",

                score: 100,

                category: "Accessibility",

                completed: true,

                completedAt:
                    new Date().toISOString()

            }
        );


        // ========================================
        // FINAL RESULT
        // ========================================

        challengeText.textContent =
            "Excellent! Accessible design should be clear, readable, simple, and usable by people with different needs.";

        statusText.textContent =
            "✅ Mission 3 completed! Accessibility comes first.";


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
            "UI3 Firebase Error:",
            error
        );


        // Allow retry
        startChallenge.disabled = false;

        startChallenge.style.opacity = "1";


        statusText.textContent =
            "❌ Could not save your mission. Please try again.";

    }

});