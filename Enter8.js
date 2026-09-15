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
// MISSION CONFIG
// ===============================

const category = "entrepreneurship";

const questionNumber = 8;

const questionId = "entrepreneurship_q8";


// ===============================
// ANSWER SCORES
// ===============================

const scores = {

    criticalIssue: 5,

    panic: 2,

    ignore: 1,

    marketing: 3

};


// Correct answer

const correctAnswer = "criticalIssue";


// ===============================
// ELEMENTS
// ===============================

const options = document.querySelectorAll(".option");

const nextBtn = document.getElementById("nextBtn");

const statusText = document.getElementById("statusText");

const crisisText = document.getElementById("crisisText");

const progressFill = document.querySelector(".fill");


// ===============================
// STATE
// ===============================

let currentUser = null;

let selectedAnswer = null;

let selectedScore = 0;

let answerLocked = false;

let answerSaved = false;


// ===============================
// INITIAL STATE
// ===============================

nextBtn.disabled = true;

if (progressFill) {

    progressFill.style.width = "0%";

}


// ===============================
// CHECK PREVIOUS ANSWER
// ===============================

async function checkPreviousAnswer() {

    if (!currentUser) return;

    try {

        const answerRef = doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            questionId
        );

        const answerSnap = await getDoc(answerRef);


        if (!answerSnap.exists()) {

            return;

        }


        const data = answerSnap.data();


        if (!data.completed) {

            return;

        }


        // Restore previous answer

        selectedAnswer = data.answer;

        selectedScore = data.score || 0;

        answerLocked = true;

        answerSaved = true;


        // Restore visual state

        options.forEach(option => {

            const answer = option.dataset.answer;


            if (answer === selectedAnswer) {

                option.classList.add("selected");

            } else {

                option.style.opacity = "0.45";

            }

        });


        if (crisisText) {

            crisisText.textContent =
                "🚨 Your crisis-management decision has already been completed.";

        }


        if (statusText) {

            if (data.correct) {

                statusText.textContent =
                    "✅ Good decision! You prioritized the most important problem.";

            } else {

                statusText.textContent =
                    "📊 Your previous crisis decision has been restored.";

            }

        }


        if (progressFill) {

            progressFill.style.width = "100%";

        }


        nextBtn.disabled = false;


    } catch (error) {

        console.error(
            "Error checking previous answer:",
            error
        );

    }

}


// ===============================
// SAVE ANSWER
// ===============================

async function saveAnswer() {

    if (!currentUser || !selectedAnswer) {

        return;

    }


    try {

        const answerRef = doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            questionId
        );


        await setDoc(answerRef, {

            category: category,

            questionNumber: questionNumber,

            answer: selectedAnswer,

            score: selectedScore,

            correct: selectedAnswer === correctAnswer,

            completed: true,

            completedAt: new Date()

        });


        answerSaved = true;

        nextBtn.disabled = false;


        if (statusText) {

            if (selectedAnswer === correctAnswer) {

                statusText.textContent =
                    "✅ Excellent! You stayed calm and prioritized the highest-impact problem.";

            } else {

                statusText.textContent =
                    "📊 Your crisis-management decision has been recorded.";

            }

        }


    } catch (error) {

        console.error(
            "Error saving answer:",
            error
        );


        if (statusText) {

            statusText.textContent =
                "⚠️ Could not save your answer. Please try again.";

        }

    }

}


// ===============================
// OPTION CLICK
// ===============================

options.forEach(option => {

    option.addEventListener("click", async () => {


        // Prevent changing answer

        if (answerLocked) {

            return;

        }


        selectedAnswer =
            option.dataset.answer;


        selectedScore =
            scores[selectedAnswer] || 0;


        answerLocked = true;


        // Dim other options

        options.forEach(otherOption => {

            if (otherOption !== option) {

                otherOption.style.opacity = "0.45";

            }

        });


        // Highlight selected option

        option.classList.add("selected");


        // Update crisis area

        if (crisisText) {

            crisisText.textContent =
                "🤖 AI Startup Mentor is evaluating your crisis-management decision...";

        }


        // Update status

        if (statusText) {

            statusText.textContent =
                "🔍 Analyzing your ability to prioritize problems under pressure...";

        }


        // Progress

        if (progressFill) {

            progressFill.style.width = "100%";

        }


        // Analysis delay

        await new Promise(resolve => {

            setTimeout(resolve, 1200);

        });


        // Save answer

        await saveAnswer();

    });

});


// ===============================
// CONTINUE
// ===============================

nextBtn.addEventListener("click", () => {


    if (!selectedAnswer) {

        return;

    }


    if (!answerSaved) {

        return;

    }


    window.location.href =
        "Enter9.html";

});


// ===============================
// FIREBASE AUTH
// ===============================

onAuthStateChanged(auth, async user => {


    if (!user) {

        window.location.href =
            "Login.html";

        return;

    }


    currentUser = user;


    await checkPreviousAnswer();

});
