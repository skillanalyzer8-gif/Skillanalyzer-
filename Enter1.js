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

const questionNumber = 1;

const questionId = "entrepreneurship_q1";

// =====================================
// HTML ELEMENTS
// =====================================

const activateScanner =
document.getElementById("activateScanner");

const scannerCircle =
document.getElementById("scannerCircle");

const scannerText =
document.getElementById("scannerText");

const statusText =
document.getElementById("statusText");

// =====================================
// STATE
// =====================================

let currentUser = null;

let missionCompleted = false;

let scannerActivated = false;

// =====================================
// INITIAL STATE
// =====================================

activateScanner.disabled = false;

// =====================================
// CHECK PREVIOUS COMPLETION
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

            scannerActivated = true;


            statusText.textContent =
                "✅ Opportunity Vision already activated.";


            scannerText.textContent =
                "🌆 Opportunity scanner completed. Real-world problems detected.";


            activateScanner.textContent =
                "➡️ CONTINUE TO MISSION 2";


            activateScanner.disabled = false;

        }

    }

} catch (error) {

    console.error(
        "Error checking Entrepreneurship Mission 1:",
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

            answer: "opportunityScanner",

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
        "Error saving Entrepreneurship Mission 1:",
        error
    );


    statusText.textContent =
        "❌ Unable to save mission. Please try again.";


    return false;

}

}

// =====================================
// ACTIVATE OPPORTUNITY SCANNER
// =====================================

activateScanner.addEventListener(
"click",
async () => {

    // If already completed,
    // go directly to Mission 2

    if (missionCompleted) {

        window.location.href =
            "Enter2.html";

        return;

    }


    if (scannerActivated) return;


    scannerActivated = true;

    activateScanner.disabled = true;


    // =================================
    // SCANNER START
    // =================================

    statusText.textContent =
        "🔍 Activating Opportunity Vision...";


    scannerText.textContent =
        "Scanning the city for hidden problems...";


    if (scannerCircle) {

        scannerCircle.classList.add(
            "active"
        );

    }


    // =================================
    // SCANNING
    // =================================

    await new Promise(resolve =>
        setTimeout(resolve, 1500)
    );


    statusText.textContent =
        "🤖 AI Status: Problems detected.";


    scannerText.textContent =
        "🌆 The city is full of problems waiting to be solved.";


    // =================================
    // SAVE TO FIREBASE
    // =================================

    const saved =
        await saveMission();


    if (!saved) {

        scannerActivated = false;

        activateScanner.disabled = false;

        return;

    }


    // =================================
    // COMPLETION
    // =================================

    statusText.textContent =
        "✅ Mission 1 completed successfully!";


    activateScanner.textContent =
        "➡️ CONTINUE TO MISSION 2";


    activateScanner.disabled = false;

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
        "Entrepreneurship Mission 1 user:",
        currentUser.uid
    );


    await checkPreviousMission();

}

);
