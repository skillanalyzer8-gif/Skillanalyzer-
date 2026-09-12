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
// GET HTML ELEMENTS
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
const questionNumber = 4;
const questionId = "softwareDevelopment_q4";


// ===============================
// SCORES
// ===============================

const scores = {
    memoryLeak: 5,
    cpuOverload: 4,
    networkCongestion: 3,
    diskFailure: 1
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
// DISABLE NEXT INITIALLY
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
            Math.floor(Math.random() * (i + 1));

        optionsContainer.appendChild(
            optionElements[randomIndex]
        );
    }
}


// ===============================
// CHECK LOGIN
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

        const questionSnap =
            await getDoc(questionRef);


        // ===============================
        // ALREADY ANSWERED
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


    // ===============================
    // GET ANSWER
    // ===============================

    selectedAnswer =
        this.dataset.answer;


    // ===============================
    // GET SCORE
    // ===============================

    selectedScore =
        scores[selectedAnswer] || 0;


    // ===============================
    // LOCK IMMEDIATELY
    // ===============================

    answerLocked = true;


    // Disable all options
    options.forEach(function (option) {

        option.style.pointerEvents = "none";
        option.style.opacity = "0.65";

    });


    // Keep selected option highlighted
    this.classList.add("active");
    this.style.opacity = "1";


    // ===============================
    // AI ANALYSIS
    // ===============================

    fill.style.width = "0%";

    text.textContent =
        "🤖 AI is analysing your diagnosis...";


    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";


    // ===============================
    // PROGRESS ANIMATION
    // ===============================

    setTimeout(function () {

        fill.style.width =
            `${selectedScore * 20}%`;

    }, 100);


    // ===============================
    // SAVE ANSWER
    // ===============================

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
            "✅ Diagnosis Recorded Successfully";


        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";


        console.log(
            "Mission 4 saved successfully!"
        );


    } catch (error) {

        console.error(
            "Error saving Mission 4:",
            error
        );


        answerSaved = false;


        text.textContent =
            "❌ Could not save your diagnosis.";


        alert(
            "Could not save Mission 4. Please try again."
        );

    }

}


// ===============================
// SHOW PREVIOUSLY ANSWERED
// ===============================

function showPreviouslyAnswered() {

    options.forEach(function (option) {

        // Lock options
        option.style.pointerEvents = "none";
        option.style.opacity = "0.65";


        // Highlight previous answer
        if (
            option.dataset.answer ===
            selectedAnswer
        ) {

            option.classList.add("active");

            option.style.opacity = "1";

        }

    });


    // Restore score progress
    fill.style.width =
        `${selectedScore * 20}%`;


    text.textContent =
        `✅ Already answered — Score: ${selectedScore}/5`;


    // Allow continuation
    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";

}


// ===============================
// CONTINUE TO MISSION 5
// ===============================

nextBtn.addEventListener(
    "click",
    function () {

        if (!selectedAnswer) {

            alert(
                "Please select an option first."
            );

            return;
        }


        if (!answerSaved) {

            alert(
                "Please wait until your diagnosis is saved."
            );

            return;
        }


        window.location.href =
            "Mission5.html";

    }
);