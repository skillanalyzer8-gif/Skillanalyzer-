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

const questionNumber = 3;

const questionId = "entrepreneurship_q3";

// =====================================
// HTML ELEMENTS
// =====================================

const startLab =
document.getElementById("startLab");

const machineText =
document.getElementById("machineText");

const statusText =
document.getElementById("statusText");

// =====================================
// STATE
// =====================================

let currentUser = null;

let missionCompleted = false;

let labStarted = false;

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

            labStarted = true;


            machineText.textContent =
                "🛠 Prototype blueprint already completed.";


            statusText.textContent =
                "✅ Prototype Lab completed.";


            startLab.textContent =
                "➡️ CONTINUE TO MISSION 4";

        }

    }

} catch (error) {

    console.error(
        "Error checking Entrepreneurship Mission 3:",
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

            answer: "prototypeBuilder",

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
        "Error saving Entrepreneurship Mission 3:",
        error
    );


    statusText.textContent =
        "❌ Unable to save mission. Please try again.";


    return false;

}

}

// =====================================
// START PROTOTYPE LAB
// =====================================

startLab.addEventListener(
"click",
async () => {

    // Already completed

    if (missionCompleted) {

        window.location.href =
            "Enter4.html";

        return;

    }


    if (labStarted) return;


    labStarted = true;

    startLab.disabled = true;


    // =================================
    // LAB START
    // =================================

    statusText.textContent =
        "⚡ Prototype Lab starting...";


    machineText.textContent =
        "Loading startup blueprint...";


    await new Promise(resolve =>
        setTimeout(resolve, 1200)
    );


    // =================================
    // BUILDING
    // =================================

    statusText.textContent =
        "🛠 Building the minimum viable prototype...";


    machineText.textContent =
        "Selecting only the features that matter most...";


    await new Promise(resolve =>
        setTimeout(resolve, 1500)
    );


    // =================================
    // PROTOTYPE READY
    // =================================

    statusText.textContent =
        "🚀 Prototype successfully created!";


    machineText.textContent =
        "Your MVP is ready for the first customers.";


    // =================================
    // SAVE TO FIREBASE
    // =================================

    const saved =
        await saveMission();


    if (!saved) {

        labStarted = false;

        startLab.disabled = false;

        return;

    }


    // =================================
    // COMPLETION
    // =================================

    statusText.textContent =
        "✅ Mission 3 completed successfully!";


    startLab.textContent =
        "➡️ CONTINUE TO MISSION 4";


    startLab.disabled = false;

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
        "Entrepreneurship Mission 3 user:",
        currentUser.uid
    );


    await checkPreviousMission();

}

);
