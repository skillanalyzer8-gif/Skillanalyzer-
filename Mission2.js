// ============================================
// SOFTWARE DEVELOPMENT — QUESTION 2
// Mission2.js
// ============================================

import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ============================================
// ELEMENTS
// ============================================

const optionsContainer = document.getElementById("options");

const options =
    Array.from(document.querySelectorAll(".option"));

const fill =
    document.querySelector(".fill");

const statusText =
    document.querySelector(".analysis p");

const nextBtn =
    document.getElementById("nextBtn");


// ============================================
// QUESTION INFORMATION
// ============================================

const category = "softwareDevelopment";

const questionNumber = 2;

const questionId =
    `softwareDevelopment_q${questionNumber}`;


// ============================================
// SCORING
// ============================================

const scores = {

    notifyCustomers: 3,

    investigateLogs: 5,

    rollbackDeployment: 4,

    waitReports: 1

};


// ============================================
// STATE
// ============================================

let currentUser = null;

let selectedAnswer = null;

let selectedScore = 0;

let answerLocked = false;

let answerSaved = false;


// ============================================
// INITIAL UI
// ============================================

nextBtn.disabled = true;

nextBtn.style.opacity = "0.5";

fill.style.width = "0%";


// ============================================
// SHUFFLE OPTIONS
// ============================================

function shuffleOptions() {

    const shuffledOptions = [...options];


    // Fisher-Yates shuffle

    for (
        let i = shuffledOptions.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));


        [
            shuffledOptions[i],
            shuffledOptions[randomIndex]
        ] =
        [
            shuffledOptions[randomIndex],
            shuffledOptions[i]
        ];

    }


    shuffledOptions.forEach(option => {

        optionsContainer.appendChild(option);

    });

}


// ============================================
// AUTHENTICATION
// ============================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        currentUser = null;

        statusText.textContent =
            "❌ Please login first.";

        options.forEach(option => {

            option.style.pointerEvents = "none";

        });

        nextBtn.disabled = true;

        return;

    }


    currentUser = user;

    console.log(
        "Logged in user:",
        currentUser.uid
    );


    // Check if Question 2 was already answered

    await checkPreviousAnswer();

});


// ============================================
// CHECK PREVIOUS ANSWER
// ============================================

async function checkPreviousAnswer() {

    try {

        const questionRef = doc(

            db,

            "users",

            currentUser.uid,

            "missions",

            questionId

        );


        const questionSnapshot =
            await getDoc(questionRef);


        // ========================================
        // ALREADY ANSWERED
        // ========================================

        if (questionSnapshot.exists()) {

            const data =
                questionSnapshot.data();


            if (data.completed === true) {

                selectedAnswer =
                    data.answer;

                selectedScore =
                    data.score;

                answerLocked = true;

                answerSaved = true;


                showPreviouslyAnswered();

                return;

            }

        }


        // ========================================
        // NEW QUESTION
        // ========================================

        shuffleOptions();

        enableOptions();


        statusText.textContent =
            "🤖 Waiting for your decision...";

    }

    catch (error) {

        console.error(
            "Error checking previous answer:",
            error
        );


        statusText.textContent =
            "❌ Unable to load this question.";

    }

}


// ============================================
// ENABLE OPTIONS
// ============================================

function enableOptions() {

    options.forEach(option => {

        option.style.pointerEvents = "auto";

        option.style.cursor = "pointer";


        option.addEventListener(
            "click",
            handleAnswer
        );

    });

}


// ============================================
// HANDLE ANSWER
// ============================================

async function handleAnswer(event) {

    // ========================================
    // ABSOLUTE LOCK
    // ========================================

    if (answerLocked) {

        return;

    }


    // ========================================
    // CHECK LOGIN
    // ========================================

    if (!currentUser) {

        alert("Please login first.");

        return;

    }


    const selectedOption =
        event.currentTarget;


    // ========================================
    // GET ANSWER ID
    // ========================================

    selectedAnswer =
        selectedOption.dataset.answer;


    // ========================================
    // GET SCORE
    // ========================================

    selectedScore =
        scores[selectedAnswer];


    // ========================================
    // LOCK IMMEDIATELY
    // ========================================

    answerLocked = true;


    options.forEach(option => {

        option.style.pointerEvents = "none";

        option.style.cursor = "not-allowed";

    });


    // ========================================
    // HIGHLIGHT SELECTED OPTION
    // ========================================

    selectedOption.classList.add("selected");


    // ========================================
    // AI ANALYSIS
    // ========================================

    statusText.textContent =
        "🤖 AI is analysing your decision...";


    nextBtn.disabled = true;

    nextBtn.style.opacity = "0.5";


    fill.style.width = "0%";


    setTimeout(() => {

        fill.style.width =
            `${selectedScore * 20}%`;

    }, 100);


    // ========================================
    // SAVE ANSWER
    // ========================================

    const savedSuccessfully =
        await saveAnswer();


    // ========================================
    // SAVE FAILED
    // ========================================

    if (!savedSuccessfully) {

        statusText.textContent =
            "❌ Could not save your answer. Please try again.";

        return;

    }


    // ========================================
    // SAVE SUCCESS
    // ========================================

    answerSaved = true;


    statusText.textContent =
        `✅ Decision recorded — Score: ${selectedScore}/5`;


    nextBtn.disabled = false;

    nextBtn.style.opacity = "1";

}


// ============================================
// SAVE ANSWER TO FIRESTORE
// ============================================

async function saveAnswer() {

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

                completed:
                    true,

                completedAt:
                    new Date().toISOString()

            },

            {

                merge: true

            }

        );


        console.log(
            "Question 2 saved successfully."
        );


        return true;

    }

    catch (error) {

        console.error(
            "Firebase save error:",
            error
        );


        alert(
            "Firebase error: " +
            error.message
        );


        return false;

    }

}


// ============================================
// SHOW PREVIOUSLY ANSWERED
// ============================================

function showPreviouslyAnswered() {

    options.forEach(option => {

        option.style.pointerEvents =
            "none";

        option.style.cursor =
            "not-allowed";


        if (
            option.dataset.answer ===
            selectedAnswer
        ) {

            option.classList.add(
                "selected"
            );

        }

    });


    fill.style.width =
        `${selectedScore * 20}%`;


    statusText.textContent =
        `🔒 Already answered — Score: ${selectedScore}/5`;


    nextBtn.disabled = false;

    nextBtn.style.opacity = "1";

}


// ============================================
// NEXT QUESTION
// ============================================

nextBtn.addEventListener(
    "click",
    () => {

        if (!answerSaved) {

            alert(
                "Please select an answer first."
            );

            return;

        }


        if (!answerLocked) {

            alert(
                "Please complete the question first."
            );

            return;

        }


        window.location.href =
            "Mission3.html";

    }
);
