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

const startDesign =
    document.getElementById("startDesign");


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
// START DESIGN MISSION
// ========================================

startDesign.addEventListener("click", async () => {

    // Check login
    if (!currentUser) {

        alert("Please login first.");

        window.location.href = "Login.html";

        return;

    }


    // Prevent completing twice
    if (missionCompleted) {

        return;

    }


    // Disable button
    startDesign.disabled = true;

    startDesign.style.opacity = "0.6";


    // ========================================
    // STARTING MESSAGE
    // ========================================

    challengeText.textContent =
        "Your mission: Create a login screen that is simple, beautiful, and easy to use.";

    statusText.textContent =
        "🎨 AI Design Mentor is reviewing your first UI/UX challenge...";


    try {

        // ========================================
        // SAVE MISSION 1
        // ========================================

        await setDoc(
            doc(
                db,
                "users",
                currentUser.uid,
                "missions",
                "mission1"
            ),
            {

                missionNumber: 1,

                answer:
                    "Create a simple, beautiful and easy-to-use login screen.",

                score: 100,

                category: "UI/UX Design",

                completed: true,

                completedAt:
                    new Date().toISOString()

            }
        );


        // ========================================
        // FINAL MISSION STATUS
        // ========================================

        challengeText.textContent =
            "Mission 1 completed! Your first design challenge is complete.";

        statusText.textContent =
            "✅ Excellent! You completed your first UI/UX mission.";


        missionCompleted = true;


        // Update button
        startDesign.textContent =
            "MISSION COMPLETED ✓";

        startDesign.disabled = true;

        startDesign.style.opacity = "0.7";


    } catch (error) {

        // ========================================
        // FIREBASE ERROR
        // ========================================

        console.error(
            "UI1 Firebase Error:",
            error
        );


        startDesign.disabled = false;

        startDesign.style.opacity = "1";


        statusText.textContent =
            "❌ Could not save your mission. Please try again.";

    }

});
