// ============================================
// SOFTWARE DEVELOPMENT — QUESTION 1
// DeveloperMindset.js
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
const options = Array.from(document.querySelectorAll(".option"));

const fill = document.querySelector(".fill");
const statusText = document.getElementById("statusText");
const nextBtn = document.getElementById("nextBtn");


// ============================================
// QUESTION INFORMATION
// ============================================

const category = "softwareDevelopment";
const questionNumber = 1;

const questionId = `softwareDevelopment_q${questionNumber}`;


// ============================================
// SCORING
// ============================================
//
// 5 = Best engineering decision
// 4 = Good decision
// 3 = Reasonable but not ideal
// 2 = Weak decision
// 1 = Poor decision
//

const scores = {

    logs: 5,

    rollback: 3,

    reproduce: 4,

    ignore: 1

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
// INITIAL UI STATE
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
    for (let i = shuffledOptions.length - 1; i > 0; i--) {

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


    // Check whether Q1 was already answered

    await checkPreviousAnswer();

});


// ============================================
// CHECK IF QUESTION WAS ALREADY ANSWERED
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


        // ----------------------------------------
        // QUESTION ALREADY COMPLETED
        // ----------------------------------------

        if (questionSnapshot.exists()) {

            const data =
                questionSnapshot.data();


            if (data.completed === true) {

                selectedAnswer = data.answer;

                selectedScore = data.score;

                answerLocked = true;

                answerSaved = true;


                showPreviouslyAnswered();


                return;

            }

        }


        // ----------------------------------------
        // NEW QUESTION
        // ----------------------------------------

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

    // ----------------------------------------
    // ABSOLUTE LOCK
    // ----------------------------------------

    if (answerLocked) {

        return;

    }


    // ----------------------------------------
    // MAKE SURE USER IS LOGGED IN
    // ----------------------------------------

    if (!currentUser) {

        alert("Please login first.");

        return;

    }


    const selectedOption =
        event.currentTarget;


    // ----------------------------------------
    // GET ANSWER
    // ----------------------------------------

    selectedAnswer =
        selectedOption.dataset.answer;


    // ----------------------------------------
    // GET SCORE
    // ----------------------------------------

    selectedScore =
        scores[selectedAnswer];


    // ----------------------------------------
    // LOCK IMMEDIATELY
    // ----------------------------------------

    answerLocked = true;


    options.forEach(option => {

        option.style.pointerEvents = "none";

        option.style.cursor = "not-allowed";

    });


    // ----------------------------------------
    // HIGHLIGHT SELECTED ANSWER
    // ----------------------------------------

    selectedOption.classList.add("selected");


    // ----------------------------------------
    // SHOW ANALYSIS
    // ----------------------------------------

    statusText.textContent =
        "🤖 AI is analysing your decision...";


    nextBtn.disabled = true;

    nextBtn.style.opacity = "0.5";


    fill.style.width = "0%";


    // Small progress animation

    setTimeout(() => {

        fill.style.width =
            `${selectedScore * 20}%`;

    }, 100);


    // ----------------------------------------
    // SAVE ANSWER TO FIREBASE
    // ----------------------------------------

    const savedSuccessfully =
        await saveAnswer();


    // ----------------------------------------
    // SAVE FAILED
    // ----------------------------------------

    if (!savedSuccessfully) {

        statusText.textContent =
            "❌ Could not save your answer. Please try again.";

        return;

    }


    // ----------------------------------------
    // SAVE SUCCESS
    // ----------------------------------------

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


        console.log(
            "Question 1 saved successfully."
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
// SHOW PREVIOUSLY ANSWERED QUESTION
// ============================================

function showPreviouslyAnswered() {

    // ----------------------------------------
    // LOCK ALL OPTIONS
    // ----------------------------------------

    options.forEach(option => {

        option.style.pointerEvents = "none";

        option.style.cursor = "not-allowed";


        // Highlight previously selected option

        if (
            option.dataset.answer === selectedAnswer
        ) {

            option.classList.add("selected");

        }

    });


    // ----------------------------------------
    // SHOW SAVED SCORE
    // ----------------------------------------

    fill.style.width =
        `${selectedScore * 20}%`;


    statusText.textContent =
        `🔒 Already answered — Score: ${selectedScore}/5`;


    // ----------------------------------------
    // ALLOW NEXT
    // ----------------------------------------

    nextBtn.disabled = false;

    nextBtn.style.opacity = "1";

}


// ============================================
// NEXT QUESTION
// ============================================

nextBtn.addEventListener("click", () => {

    // ----------------------------------------
    // DO NOT CONTINUE WITHOUT SAVED ANSWER
    // ----------------------------------------

    if (!answerSaved) {

        alert(
            "Please select an answer first."
        );

        return;

    }


    // ----------------------------------------
    // ANSWER IS PERMANENTLY LOCKED
    // ----------------------------------------

    if (!answerLocked) {

        alert(
            "Please complete the question first."
        );

        return;

    }


    // ----------------------------------------
    // GO TO QUESTION 2
    // ----------------------------------------

    window.location.href =
        "DeveloperMindset2.html";

});
