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

const questionNumber = 4;

const questionId = "entrepreneurship_q4";

// =====================================
// HTML ELEMENTS
// =====================================

const startTesting =
document.getElementById("startTesting");

const labText =
document.getElementById("labText");

const statusText =
document.getElementById("statusText");

// =====================================
// STATE
// =====================================

let currentUser = null;

let missionCompleted = false;

let testingStarted = false;

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

            testingStarted = true;


            labText.textContent =
                "📱 Customer testing has already been completed.";


            statusText.textContent =
                "✅ Customer Test Lab completed.";


            startTesting.textContent =
                "➡️ CONTINUE TO MISSION 5";

        }

    }

} catch (error) {

    console.error(
        "Error checking Entrepreneurship Mission 4:",
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

            answer: "customerTesting",

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
        "Error saving Entrepreneurship Mission 4:",
        error
    );


    statusText.textContent =
        "❌ Unable to save mission. Please try again.";


    return false;

}

}

// =====================================
// START CUSTOMER TESTING
// =====================================

startTesting.addEventListener(
"click",
async () => {

    // =================================
    // IF ALREADY COMPLETED
    // =================================

    if (missionCompleted) {

        window.location.href =
            "Enter5.html";

        return;

    }


    if (testingStarted) return;


    testingStarted = true;

    startTesting.disabled = true;


    // =================================
    // TESTING START
    // =================================

    statusText.textContent =
        "🚀 Customer testing started...";


    labText.textContent =
        "Waiting for the first customer to use the prototype...";


    await new Promise(resolve =>
        setTimeout(resolve, 1500)
    );


    // =================================
    // CUSTOMER FEEDBACK
    // =================================

    statusText.textContent =
        "⭐ Customer feedback received!";


    labText.textContent =
        "Customers are using the prototype and sharing their experience...";


    await new Promise(resolve =>
        setTimeout(resolve, 1500)
    );


    // =================================
    // REVIEW ANALYSIS
    // =================================

    statusText.textContent =
        "🤖 AI analyzing customer feedback...";


    labText.textContent =
        "Identifying problems, useful features and improvement opportunities...";


    await new Promise(resolve =>
        setTimeout(resolve, 1500)
    );


    // =================================
    // TEST COMPLETE
    // =================================

    statusText.textContent =
        "💡 Feedback successfully analyzed!";


    labText.textContent =
        "Customer feedback can now be used to improve the product.";


    // =================================
    // SAVE TO FIREBASE
    // =================================

    const saved =
        await saveMission();


    if (!saved) {

        testingStarted = false;

        startTesting.disabled = false;

        return;

    }


    // =================================
    // COMPLETION
    // =================================

    statusText.textContent =
        "✅ Mission 4 completed successfully!";


    startTesting.textContent =
        "➡️ CONTINUE TO MISSION 5";


    startTesting.disabled = false;

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
        "Entrepreneurship Mission 4 user:",
        currentUser.uid
    );


    await checkPreviousMission();

}

);
