import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ===============================
// DOM ELEMENTS
// ===============================

const options = document.getElementById("options");
const statusText = document.getElementById("statusText");
const fill = document.getElementById("fill");
const nextBtn = document.getElementById("nextBtn");


// ===============================
// MISSION DETAILS
// ===============================

const category = "uiux";
const questionNumber = 8;
const questionId = "uiux_q8";

const correctAnswer = "balanced";


// ===============================
// SCORES
// ===============================

const scores = {
    crowded: 2,
    uneven: 3,
    balanced: 5,
    minimal: 1
};


// ===============================
// STATE
// ===============================

let currentUser = null;
let selectedAnswer = null;
let selectedScore = 0;
let missionCompleted = false;
let answerSaved = false;


// ===============================
// CONTINUE BUTTON
// ===============================

nextBtn.disabled = true;


// ===============================
// AUTHENTICATION
// ===============================

onAuthStateChanged(auth, async (user) => {

    if (user) {

        currentUser = user;

        await checkPreviousAnswer();

    } else {

        alert("Please login first.");

        window.location.href = "Login.html";

    }

});


// ===============================
// CHECK PREVIOUS ANSWER
// ===============================

async function checkPreviousAnswer() {

    try {

        const missionRef = doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            questionId
        );

        const missionSnap = await getDoc(missionRef);


        if (missionSnap.exists()) {

            const data = missionSnap.data();


            if (data.completed === true) {

                selectedAnswer = data.answer;
                selectedScore = data.score || 0;

                missionCompleted = true;
                answerSaved = true;

                lockOptions();

                fill.style.width = "100%";

                statusText.innerHTML =
                    "✅ Mission 8 already completed. Your previous answer has been restored.";

                nextBtn.disabled = false;

            }

        }

    } catch (error) {

        console.error(
            "Error checking previous Ui8 answer:",
            error
        );

    }

}


// ===============================
// OPTION CLICK
// ===============================

options.addEventListener("click", async (event) => {

    const option = event.target.closest(".option");


    if (!option) return;

    if (missionCompleted) return;


    if (!currentUser) {

        alert("Please login first.");

        window.location.href = "Login.html";

        return;

    }


    selectedAnswer = option.dataset.answer;

    selectedScore =
        Number(option.dataset.score);


    const isCorrect =
        selectedAnswer === correctAnswer;


    // ===============================
    // LOCK OPTIONS
    // ===============================

    lockOptions();


    // ===============================
    // FEEDBACK
    // ===============================

    if (isCorrect) {

        statusText.innerHTML =
            "🏆 Excellent! Consistent spacing, white space, grouping and hierarchy create a clean premium experience.";

    } else {

        statusText.innerHTML =
            "⚠ Good try. Premium interfaces need consistent spacing, clear grouping and strong visual hierarchy.";

    }


    // ===============================
    // PROGRESS
    // ===============================

    fill.style.width = "100%";


    // ===============================
    // SAVE
    // ===============================

    await saveMission(isCorrect);

});


// ===============================
// LOCK OPTIONS
// ===============================

function lockOptions() {

    const allOptions =
        document.querySelectorAll(".option");


    allOptions.forEach((option) => {

        option.disabled = true;


        if (
            option.dataset.answer === selectedAnswer
        ) {

            option.classList.add("selected");

        } else {

            option.style.opacity = "0.55";

        }

    });

}


// ===============================
// SAVE MISSION
// ===============================

async function saveMission(isCorrect) {

    try {

        statusText.innerHTML =
            "💾 Saving your layout decision...";


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

                answer: selectedAnswer,

                score: selectedScore,

                correct: isCorrect,

                completed: true,

                completedAt:
                    new Date().toISOString()

            }

        );


        missionCompleted = true;
        answerSaved = true;

        nextBtn.disabled = false;


        statusText.innerHTML =
            isCorrect
                ? "✅ Correct! Mission 8 completed and saved."
                : "✅ Mission 8 completed and saved. Keep improving your UI/UX decisions.";

    } catch (error) {

        console.error(
            "Ui8 Firebase Error:",
            error
        );


        statusText.innerHTML =
            "❌ Could not save your answer. Please try again.";

    }

}


// ===============================
// CONTINUE TO MISSION 9
// ===============================

nextBtn.addEventListener("click", () => {

    if (!answerSaved) {

        statusText.innerHTML =
            "⚠ Please select an answer first.";

        return;

    }


    window.location.href = "Ui9.html";

});
