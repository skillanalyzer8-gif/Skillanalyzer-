import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ========================================
// DOM ELEMENTS
// ========================================

const options = document.querySelectorAll(".option");

const statusText =
    document.getElementById("statusText");

const fill =
    document.querySelector(".fill");

const nextBtn =
    document.getElementById("nextBtn");


// ========================================
// MISSION DATA
// ========================================

const category = "uiux";
const questionNumber = 4;
const questionId = "uiux_q4";

const correctAnswer = "readable";

const scores = {
    decorative: 2,
    tiny: 1,
    mixed: 3,
    readable: 5
};


// ========================================
// STATE
// ========================================

let currentUser = null;
let selectedAnswer = null;
let selectedScore = 0;
let missionCompleted = false;
let answerSaved = false;


// ========================================
// CONTINUE BUTTON
// ========================================

nextBtn.disabled = true;


// ========================================
// AUTHENTICATION
// ========================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        alert("Please login first.");

        window.location.href = "Login.html";

        return;
    }

    currentUser = user;

    await checkPreviousAnswer();

});


// ========================================
// CHECK PREVIOUS ANSWER
// ========================================

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

                nextBtn.disabled = false;

                if (fill) {
                    fill.style.width = "100%";
                }

                statusText.textContent =
                    "✅ Mission 4 already completed. You can continue.";

            }

        }

    } catch (error) {

        console.error(
            "Ui4 Restore Error:",
            error
        );

    }

}


// ========================================
// OPTION CLICK
// ========================================

options.forEach((option) => {

    option.addEventListener("click", async () => {

        if (!currentUser) {

            alert("Please login first.");

            window.location.href = "Login.html";

            return;

        }

        if (missionCompleted) {
            return;
        }

        if (answerSaved) {
            return;
        }


        // ========================================
        // GET ANSWER
        // ========================================

        selectedAnswer =
            option.dataset.answer;

        selectedScore =
            scores[selectedAnswer] || 0;


        // ========================================
        // LOCK OPTIONS
        // ========================================

        lockOptions(option);


        // ========================================
        // SHOW RESULT
        // ========================================

        if (selectedAnswer === correctAnswer) {

            statusText.textContent =
                "✅ Excellent! Clear, readable typography makes long articles comfortable to read.";

        } else {

            statusText.textContent =
                "💡 Good attempt. For long news articles, readability and comfortable spacing should be the priority.";

        }


        // ========================================
        // PROGRESS
        // ========================================

        if (fill) {
            fill.style.width = "100%";
        }


        // ========================================
        // SAVE ANSWER
        // ========================================

        await saveMission();

    });

});


// ========================================
// LOCK OPTIONS
// ========================================

function lockOptions(selectedOption = null) {

    options.forEach((option) => {

        option.style.pointerEvents = "none";

        if (
            selectedOption &&
            option !== selectedOption
        ) {

            option.style.opacity = "0.55";

        }

    });

}


// ========================================
// SAVE MISSION
// ========================================

async function saveMission() {

    try {

        await setDoc(
            doc(
                db,
                "users",
                currentUser.uid,
                "missions",
                questionId
            ),
            {

                category: category,

                questionNumber: questionNumber,

                answer: selectedAnswer,

                score: selectedScore,

                correct:
                    selectedAnswer === correctAnswer,

                completed: true,

                completedAt:
                    new Date().toISOString()

            }
        );


        // ========================================
        // UPDATE STATE
        // ========================================

        answerSaved = true;
        missionCompleted = true;

        nextBtn.disabled = false;

        statusText.textContent +=
            " Mission 4 completed!";

    } catch (error) {

        console.error(
            "Ui4 Firebase Error:",
            error
        );

        answerSaved = false;
        missionCompleted = false;

        nextBtn.disabled = true;

        statusText.textContent =
            "❌ Could not save your answer. Please try again.";

    }

}


// ========================================
// CONTINUE TO MISSION 5
// ========================================

nextBtn.addEventListener("click", () => {

    if (!answerSaved) {

        return;

    }

    window.location.href = "Ui5.html";

});
