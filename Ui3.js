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

const options =
    document.querySelectorAll(".option");

const statusText =
    document.getElementById("statusText");

const fill =
    document.querySelector(".fill");

const nextBtn =
    document.getElementById("nextBtn");


// ========================================
// MISSION INFORMATION
// ========================================

const category = "uiux";

const questionNumber = 3;

const questionId =
    "uiux_q3";


// ========================================
// CORRECT ANSWER
// ========================================

const correctAnswer =
    "inclusive";


// ========================================
// SCORES
// ========================================

const scores = {

    inclusive: 5,

    tiny: 1,

    color: 2,

    complex: 3

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
// AUTHENTICATION
// ========================================

onAuthStateChanged(auth, async (user) => {

    if (user) {

        currentUser = user;

        await checkPreviousAnswer();

    }

    else {

        alert("Please login first.");

        window.location.href =
            "Login.html";

    }

});


// ========================================
// CHECK PREVIOUS ANSWER
// ========================================

async function checkPreviousAnswer() {

    try {

        const missionRef =
            doc(
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

                selectedAnswer =
                    data.answer;

                selectedScore =
                    Number(data.score) || 0;

                missionCompleted = true;

                answerSaved = true;


                lockOptions(
                    selectedAnswer,
                    data.correct
                );


                statusText.textContent =
                    data.correct
                        ? "✅ Correct answer already completed."
                        : "⚠️ Mission already completed. You can continue.";


                fill.style.width =
                    "100%";


                nextBtn.disabled = false;

            }

        }

    }

    catch (error) {

        console.error(
            "UI3 Previous Answer Error:",
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

            return;

        }


        if (missionCompleted) {

            return;

        }


        if (answerSaved) {

            return;

        }


        selectedAnswer =
            option.dataset.answer;


        selectedScore =
            scores[selectedAnswer] || 0;


        const isCorrect =
            selectedAnswer === correctAnswer;


        // Lock options
        lockOptions(
            selectedAnswer,
            isCorrect
        );


        // Review answer
        if (isCorrect) {

            statusText.textContent =
                "✅ Excellent! Inclusive design considers readability, contrast, clear labels, touch targets, and assistive technologies.";

        }

        else {

            statusText.textContent =
                "❌ Good attempt. Accessibility means designing the interface so users with different abilities can use it effectively.";

        }


        // Complete progress
        fill.style.width =
            "100%";


        // Save answer
        const saved =
            await saveAnswer(isCorrect);


        if (saved) {

            answerSaved = true;

            missionCompleted = true;

            nextBtn.disabled = false;

        }

    });

});


// ========================================
// LOCK OPTIONS
// ========================================

function lockOptions(
    selected,
    isCorrect
) {

    options.forEach((option) => {

        option.disabled = true;


        if (
            option.dataset.answer ===
            selected
        ) {

            option.style.border =
                isCorrect
                    ? "2px solid #00ff88"
                    : "2px solid #ff4d4d";

        }


        if (
            option.dataset.answer ===
            correctAnswer
        ) {

            option.style.opacity =
                "1";

        }

        else {

            option.style.opacity =
                "0.55";

        }

    });

}


// ========================================
// SAVE ANSWER
// ========================================

async function saveAnswer(isCorrect) {

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

                category:
                    category,

                questionNumber:
                    questionNumber,

                answer:
                    selectedAnswer,

                score:
                    selectedScore,

                correct:
                    isCorrect,

                completed:
                    true,

                completedAt:
                    new Date().toISOString()

            }
        );


        return true;

    }

    catch (error) {

        console.error(
            "UI3 Firebase Save Error:",
            error
        );


        statusText.textContent =
            "❌ Could not save your answer. Please try again.";


        options.forEach((option) => {

            option.disabled = false;

        });


        return false;

    }

}


// ========================================
// CONTINUE TO MISSION 4
// ========================================

nextBtn.addEventListener(
    "click",
    () => {

        if (!answerSaved) {

            return;

        }


        window.location.href =
            "Ui4.html";

    }
);
