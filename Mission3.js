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
// ELEMENTS
// ===============================

const optionsContainer = document.getElementById("options");
const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.getElementById("statusText");
const nextBtn = document.getElementById("nextBtn");


// ===============================
// QUESTION DETAILS
// ===============================

const category = "softwareDevelopment";
const questionNumber = 3;
const questionId = "softwareDevelopment_q3";


// ===============================
// SCORES
// ===============================

const scores = {
    restoreBackup: 5,
    identifyTables: 4,
    shutdownApp: 3,
    ignoreIssue: 1
};


// ===============================
// STATE
// ===============================

let currentUser = null;
let selectedAnswer = "";
let selectedScore = 0;
let answerLocked = false;
let answerSaved = false;


// ===============================
// INITIAL STATE
// ===============================

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";


// ===============================
// SHUFFLE OPTIONS
// ===============================

function shuffleOptions() {

    const optionElements = Array.from(optionsContainer.children);

    for (let i = optionElements.length - 1; i > 0; i--) {

        const randomIndex = Math.floor(Math.random() * (i + 1));

        optionsContainer.appendChild(
            optionElements[randomIndex]
        );
    }
}


// ===============================
// AUTHENTICATION
// ===============================

onAuthStateChanged(auth, async function (user) {

    if (!user) {

        alert("Please login first.");

        window.location.href = "Login.html";

        return;
    }

    currentUser = user;

    await checkPreviousAnswer();

});


// ===============================
// CHECK PREVIOUS ANSWER
// ===============================

async function checkPreviousAnswer() {

    try {

        const questionRef = doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            questionId
        );

        const questionSnap = await getDoc(questionRef);


        // --------------------------------
        // ALREADY ANSWERED
        // --------------------------------

        if (questionSnap.exists()) {

            const data = questionSnap.data();

            if (data.completed === true) {

                selectedAnswer = data.answer || "";
                selectedScore = data.score || 0;

                answerLocked = true;
                answerSaved = true;

                showPreviouslyAnswered();

                return;
            }
        }


        // --------------------------------
        // NEW QUESTION
        // --------------------------------

        shuffleOptions();

        enableOptions();

    } catch (error) {

        console.error(
            "Error checking previous answer:",
            error
        );

        text.textContent =
            "❌ Could not load your previous answer.";
    }
}


// ===============================
// ENABLE OPTIONS
// ===============================

function enableOptions() {

    options.forEach(function (option) {

        option.addEventListener(
            "click",
            handleAnswer
        );

    });
}


// ===============================
// HANDLE ANSWER
// ===============================

async function handleAnswer() {

    // Prevent second selection
    if (answerLocked) {
        return;
    }

    // Check login
    if (!currentUser) {

        alert("Please login first.");

        return;
    }


    // Get selected answer
    selectedAnswer =
        this.dataset.answer;


    // Get score
    selectedScore =
        scores[selectedAnswer] || 0;


    // Lock immediately
    answerLocked = true;


    // Disable every option
    options.forEach(function (option) {

        option.style.pointerEvents = "none";
        option.style.opacity = "0.65";

    });


    // Highlight selected option
    this.classList.add("active");
    this.style.opacity = "1";


    // AI analysis
    fill.style.width = "0%";

    text.textContent =
        "🤖 AI is analysing your decision...";


    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";


    // Progress animation
    setTimeout(function () {

        fill.style.width =
            `${selectedScore * 20}%`;

    }, 100);


    // Save answer
    setTimeout(async function () {

        await saveAnswer();

    }, 1500);

}


// ===============================
// SAVE ANSWER
// ===============================

async function saveAnswer() {

    if (!currentUser) {

        text.textContent =
            "❌ Please login again.";

        answerLocked = false;

        return;
    }


    try {

        const questionRef = doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            questionId
        );


        await setDoc(
            questionRef,
            {

                category: category,

                questionNumber: questionNumber,

                answer: selectedAnswer,

                score: selectedScore,

                completed: true,

                completedAt:
                    new Date().toISOString()

            },
            {
                merge: true
            }
        );


        answerSaved = true;

        text.textContent =
            "✅ Decision Recorded Successfully";


        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";


        console.log(
            "Mission 3 saved successfully!"
        );


    } catch (error)