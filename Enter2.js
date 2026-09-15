import { auth, db } from "./firebase.js";

import {
doc,
getDoc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// =====================================
// MISSION CONFIGURATION
// =====================================

const category = "entrepreneurship";

const questionNumber = 2;

const questionId = "entrepreneurship_q2";

// =====================================
// HTML ELEMENTS
// =====================================

const startRadar =
document.getElementById("startRadar");

const missionText =
document.getElementById("missionText");

const statusText =
document.getElementById("statusText");

// =====================================
// STATE
// =====================================

let currentUser = null;

let missionCompleted = false;

let radarStarted = false;

// =====================================
// CHECK PREVIOUS MISSION
// =====================================

async function checkPreviousMission() {

if (!currentUser) return;


try {

    const missionRef = doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        questionId
    );


    const missionSnap =
        await getDoc(missionRef);


    if (missionSnap.exists()) {

        const data =
            missionSnap.data();


        if (data.completed === true) {

            missionCompleted = true;

            radarStarted = true;


            missionText.textContent =
                "👥 Customer scan already completed.";


            statusText.textContent =
                "✅ Customer Radar completed.";


            startRadar.textContent =
                "➡️ CONTINUE TO MISSION 3";

        }

    }

} catch (error) {

    console.error(
        "Error checking Entrepreneurship Mission 2:",
        error
    );

}

}

// =====================================
// SAVE MISSION
// =====================================

async function saveMission() {

if (!currentUser) return false;


try {

    const missionRef = doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        questionId
    );


    await setDoc(
        missionRef,
        {

            category: category,

            questionNumber: questionNumber,

            answer: "customerScan",

            score: 5,

            correct: true,

            completed: true,

            completedAt: new Date()

        },
        {
            merge: true
        }
    );


    missionCompleted = true;


    return true;

} catch (error) {

    console.error(
        "Error saving Entrepreneurship Mission 2:",
        error
    );


    statusText.textContent =
        "❌ Unable to save mission. Please try again.";


    return false;

}

}

// =====================================
// START CUSTOMER RADAR
// =====================================

startRadar.addEventListener(
"click",
async () => {

    // Already completed

    if (missionCompleted) {

        window.location.href =
            "Enter3.html";

        return;

    }


    if (radarStarted) return;


    radarStarted = true;

    startRadar.disabled = true;


    // =================================
    // RADAR ACTIVATION
    // =================================

    statusText.textContent =
        "📡 Customer Radar activating...";


    missionText.textContent =
        "Scanning the market for potential customers...";


    // =================================
    // SCAN
    // =================================

    await new Promise(resolve =>
        setTimeout(resolve, 1500)
    );


    statusText.textContent =
        "🔍 Analyzing customer signals...";


    missionText.textContent =
        "Identifying people who need a solution...";


    await new Promise(resolve =>
        setTimeout(resolve, 1500)
    );


    // =================================
    // CUSTOMERS FOUND
    // =================================

    statusText.textContent =
        "🎯 Customer signals detected!";


    missionText.textContent =
        "Your first potential customers have been identified.";


    // =================================
    // SAVE TO FIREBASE
    // =================================

    const saved =
        await saveMission();


    if (!saved) {

        radarStarted = false;

        startRadar.disabled = false;

        return;

    }


    // =================================
    // COMPLETION
    // =================================

    statusText.textContent =
        "✅ Mission 2 completed successfully!";


    startRadar.textContent =
        "➡️ CONTINUE TO MISSION 3";


    startRadar.disabled = false;

}

);

// =====================================
// AUTHENTICATION
// =====================================

onAuthStateChanged(
auth,
async user => {

    if (!user) {

        window.location.href =
            "Login.html";

        return;

    }


    currentUser = user;


    console.log(
        "Entrepreneurship Mission 2 user:",
        currentUser.uid
    );


    await checkPreviousMission();

}

);
