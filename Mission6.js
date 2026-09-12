import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const optionsContainer = document.getElementById("options");
const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.getElementById("statusText");
const nextBtn = document.getElementById("nextBtn");


const category = "softwareDevelopment";
const questionNumber = 6;
const questionId = "softwareDevelopment_q6";


/*
    Scoring

    Check Server Logs       = 5
    Restart API Service     = 4
    Restart Database        = 3
    Ignore the Error        = 1
*/

const scores = {

    checkLogs: 5,
    restartAPI: 4,
    restartDatabase: 3,
    ignoreError: 1

};


let currentUser = null;

let selectedAnswer = "";
let selectedScore = 0;

let answerLocked = false;
let answerSaved = false;


// Disable Continue initially
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";


// Fisher-Yates shuffle
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


// Check logged-in user
onAuthStateChanged(auth, async function (user) {

    if (!user) {

        alert("Please login first.");

        window.location.href = "Login.html";

        return;

    }


    currentUser = user;

    console.log(
        "User logged in:",
        currentUser.uid
    );


    await checkPreviousAnswer();

});


// Check whether Mission 6 was already answered
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


        // New question
        shuffleOptions();

        enableOptions();

    } catch (error) {

        console.error(
            "Error checking previous Mission 6 answer:",
            error
        );


        text.textContent =
            "❌ Could not load your previous answer.";

    }

}


// Enable options
function enableOptions() {

    options.forEach(function (option) {

        option.addEventListener(
            "click",
            handleAnswer
        );

    });

}


// Handle answer
async function handleAnswer() {

    // Prevent second selection
    if (answerLocked) {
        return;
    }


    if (!currentUser) {

        alert("Please login first.");

        return;

    }


    // Get answer ID
    selectedAnswer =
        this.dataset.answer;


    // Get score from answer ID
    selectedScore =
        scores[selectedAnswer] || 0;


    // LOCK IMMEDIATELY
    answerLocked = true;


    // Disable every option
    options.forEach(function (option) {

        option.style.pointerEvents = "none";
        option.style.opacity = "0.65";

    });


    // Highlight selected option
    this.classList.add("active");
    this.style.opacity = "1";


    // Start AI analysis
    fill.style.width = "0%";

    text.textContent =
        "🤖 AI is analysing your decision...";


    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";


    // Show score progress
    setTimeout(function () {

        fill.style.width =
            `${selectedScore * 20}%`;

    }, 100);


    // Save answer
    setTimeout(async function () {

        await saveAnswer();

    }, 1500);

}


// Save answer to Firestore
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
            "✅ API Investigation Decision Recorded Successfully";


        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";


        console.log(
            "Mission 6 saved successfully!"
        );

    } catch (error) {

        console.error(
            "Firebase error:",
            error
        );


        answerSaved = false;


        text.textContent =
            "❌ Mission 6 could not be saved.";


        alert(
            "Mission 6 could not be saved. Check Firebase."
        );

    }

}


// Restore previously answered question
function showPreviouslyAnswered() {

    options.forEach(function (option) {

        option.style.pointerEvents = "none";
        option.style.opacity = "0.65";


        if (
            option.dataset.answer ===
            selectedAnswer
        ) {

            option.classList.add("active");

            option.style.opacity = "1";

        }

    });


    fill.style.width =
        `${selectedScore * 20}%`;


    text.textContent =
        `✅ Already answered — Score: ${selectedScore}/5`;


    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";

}


// Continue to Mission 7
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
                "Please wait until Mission 6 is saved."
            );

            return;

        }


        console.log(
            "Opening Mission 7..."
        );


        window.location.href =
            "Mission7.html";

    }
);