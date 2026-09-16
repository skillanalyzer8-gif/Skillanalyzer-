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
// CORRECT ANSWER
// ===============================

const correctAnswer = "identifyTables";


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

    const optionElements =
        Array.from(optionsContainer.children);

    for (
        let i = optionElements.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );

        const current =
            optionElements[i];

        const random =
            optionElements[randomIndex];

        optionsContainer.insertBefore(
            random,
            current
        );

    }

}


// ===============================
// AUTHENTICATION
// ===============================

onAuthStateChanged(
    auth,
    async function (user) {

        if (!user) {

            alert("Please login first.");

            window.location.href =
                "Login.html";

            return;

        }


        currentUser = user;

        console.log(
            "Mission 3 user:",
            currentUser.uid
        );


        await checkPreviousAnswer();

    }
);


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


        const questionSnap =
            await getDoc(questionRef);


        // ===============================
        // ALREADY COMPLETED
        // ===============================

        if (questionSnap.exists()) {

            const data =
                questionSnap.data();


            if (data.completed === true) {

                selectedAnswer =
                    data.answer || "";

                selectedScore =
                    data.score || 0;

                answerLocked = true;
                answerSaved = true;


                showPreviouslyAnswered();

                return;

            }

        }


        // ===============================
        // NEW QUESTION
        // ===============================

        shuffleOptions();

        enableOptions();

    } catch (error) {

        console.error(
            "Error checking previous answer:",
            error
        );


        text.textContent =
            "❌ Could not load Mission 3.";

    }

}


// ===============================
// ENABLE OPTIONS
// ===============================

function enableOptions() {

    options.forEach(function (option) {

        option.style.pointerEvents =
            "auto";

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

    // Prevent multiple answers
    if (answerLocked) {

        return;

    }


    // Check login
    if (!currentUser) {

        alert("Please login first.");

        return;

    }


    // ===============================
    // GET ANSWER
    // ===============================

    selectedAnswer =
        this.dataset.answer;


    selectedScore =
        scores[selectedAnswer] || 0;


    answerLocked = true;


    // ===============================
    // LOCK OPTIONS
    // ===============================

    options.forEach(function (option) {

        option.style.pointerEvents =
            "none";

        option.style.opacity =
            "0.65";

    });


    this.classList.add("active");

    this.style.opacity = "1";


    // ===============================
    // SHOW ANALYSIS
    // ===============================

    fill.style.width = "0%";


    text.textContent =
        "🤖 AI is analysing your decision...";


    nextBtn.disabled = true;

    nextBtn.style.opacity = "0.5";


    // ===============================
    // SCORE ANIMATION
    // ===============================

    setTimeout(function () {

        fill.style.width =
            `${selectedScore * 20}%`;

    }, 100);


    // ===============================
    // SAVE ANSWER
    // ===============================

    setTimeout(function () {

        saveAnswer();

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

                category:
                    category,

                questionNumber:
                    questionNumber,

                answer:
                    selectedAnswer,

                score:
                    selectedScore,

                correct:
                    selectedAnswer === correctAnswer,

                completed:
                    true,

                completedAt:
                    new Date().toISOString()

            },
            {
                merge: true
            }
        );


        answerSaved = true;


        // ===============================
        // RESULT MESSAGE
        // ===============================

        if (selectedAnswer === correctAnswer) {

            text.textContent =
                "✅ Excellent! Identify the corrupted tables before performing recovery.";

        } else {

            text.textContent =
                "⚠️ Good attempt. The best first step is to identify the corrupted tables before restoring data.";

        }


        // ===============================
        // ENABLE NEXT
        // ===============================

        nextBtn.disabled = false;

        nextBtn.style.opacity = "1";


        console.log(
            "Mission 3 saved successfully."
        );


    } catch (error) {

        console.error(
            "Mission 3 Firestore Error:",
            error
        );


        text.textContent =
            "❌ Could not save your decision. Please try again.";


        answerLocked = false;

        answerSaved = false;


        options.forEach(function (option) {

            option.style.pointerEvents =
                "auto";

            option.style.opacity =
                "1";

            option.classList.remove(
                "active"
            );

        });


        nextBtn.disabled = true;

        nextBtn.style.opacity = "0.5";

    }

}


// ===============================
// SHOW PREVIOUSLY ANSWERED
// ===============================

function showPreviouslyAnswered() {

    options.forEach(function (option) {

        const optionAnswer =
            option.dataset.answer;


        option.style.pointerEvents =
            "none";


        if (
            optionAnswer ===
            selectedAnswer
        ) {

            option.classList.add("active");

            option.style.opacity =
                "1";

        } else {

            option.style.opacity =
                "0.65";

        }

    });


    fill.style.width =
        `${selectedScore * 20}%`;


    if (
        selectedAnswer ===
        correctAnswer
    ) {

        text.textContent =
            "✅ Mission 3 already completed. Excellent decision.";

    } else {

        text.textContent =
            "⚠️ Mission 3 already completed. Your previous decision has been restored.";

    }


    nextBtn.disabled = false;

    nextBtn.style.opacity = "1";


    console.log(
        "Mission 3 previous answer restored."
    );

}


// ===============================
// NEXT MISSION
// ===============================

nextBtn.addEventListener(
    "click",
    function () {

        if (!answerSaved) {

            return;

        }


        console.log(
            "Moving to Mission 4..."
        );


        window.location.href =
            "Mission4.html";

    }
);