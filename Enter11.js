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

const questionNumber = 11;

const questionId = "entrepreneurship_q11";


// ===============================
// ANSWER SCORES
// ===============================

const scores = {

    research: 5,

    advertising: 3,

    copy: 2,

    launch: 1

};


// Correct answer

const correctAnswer = "research";


// ===============================
// ELEMENTS
// ===============================

const options = document.querySelectorAll(".option");

const nextBtn = document.getElementById("nextBtn");

const statusText = document.getElementById("statusText");

const worldText = document.getElementById("worldText");

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


        if (worldText) {

            worldText.textContent =
                "🌍 Your global expansion decision has already been completed.";

        }


        if (statusText) {

            if (data.correct) {

                statusText.textContent =
                    "✅ Good strategy! You researched the new market before expanding.";

            } else {

                statusText.textContent =
                    "📊 Your previous expansion decision has been restored.";

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
                    "✅ Excellent! You studied the new market before making an expansion decision.";

            } else {

                statusText.textContent =
                    "📊 Your expansion decision has been recorded.";

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


        // Update world area

        if (worldText) {

            worldText.textContent =
                "🤖 AI Business Mentor is analyzing your global expansion strategy...";

        }


        // Update status

        if (statusText) {

            statusText.textContent =
                "🔍 Analyzing market research, competition, customer needs, and expansion risk...";

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
        "Enter12.html";

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
