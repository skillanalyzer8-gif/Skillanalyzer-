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
const questionNumber = 11;
const questionId = "uiux_q11";

const correctAnswer = "flow";


// ===============================
// SCORES
// ===============================

const scores = {
    decorative: 2,
    features: 3,
    random: 1,
    flow: 5
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
                    "✅ Mission 11 already completed. Your previous answer has been restored.";

                nextBtn.disabled = false;

            }

        }

    } catch (error) {

        console.error(
            "Error checking previous Ui11 answer:",
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
            "🏆 Excellent! A good wireframe focuses on structure, clear content placement, logical navigation, and a smooth user journey.";

    } else {

        statusText.innerHTML =
            "⚠ Good try. Wireframes should prioritize structure, important actions, and logical user flow before visual decoration.";

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
            "💾 Saving your wireframe decision...";


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
                ? "✅ Correct! Mission 11 completed and saved."
                : "✅ Mission 11 completed and saved. Keep improving your UI/UX decisions.";

    } catch (error) {

        console.error(
            "Ui11 Firebase Error:",
            error
        );


        statusText.innerHTML =
            "❌ Could not save your answer. Please try again.";

    }

}


// ===============================
// CONTINUE TO MISSION 12
// ===============================

nextBtn.addEventListener("click", () => {

    if (!answerSaved) {

        statusText.innerHTML =
            "⚠ Please select an answer first.";

        return;

    }


    window.location.href = "Ui12.html";

});
