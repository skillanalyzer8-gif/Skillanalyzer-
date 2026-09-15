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

const category = "softwareDevelopment";
const questionNumber = 19;
const questionId = "softwareDevelopment_q19";

// ===============================
// ELEMENTS
// ===============================

const timer =
document.getElementById("timer");

const options =
document.querySelectorAll(".option");

const fill =
document.querySelector(".fill");

const statusText =
document.getElementById("statusText");

const nextBtn =
document.getElementById("nextBtn");

// ===============================
// SCORES
// ===============================

const scores = {

checkLogs: 5,

restartServers: 3,

informUsers: 4,

ignoreAlerts: 1

};

// ===============================
// VARIABLES
// ===============================

let currentUser = null;

let selectedAnswer = "";

let selectedScore = 0;

let answerLocked = false;

let answerSaved = false;

let timeLeft = 10;

let timerInterval = null;

// ===============================
// INITIAL BUTTON STATE
// ===============================

nextBtn.disabled = true;

nextBtn.style.opacity = "0.5";

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


    const answerSnap =
        await getDoc(answerRef);


    if (answerSnap.exists()) {

        const data =
            answerSnap.data();


        if (data.completed === true) {

            selectedAnswer =
                data.answer || "";


            selectedScore =
                data.score || 0;


            answerLocked = true;

            answerSaved = true;


            // Stop timer
            if (timerInterval) {

                clearInterval(timerInterval);

            }


            // Restore selected option
            options.forEach(function (option) {

                const optionAnswer =
                    option.dataset.answer ||
                    option.textContent.trim();


                const isSelected =
                    optionAnswer === selectedAnswer;


                if (isSelected) {

                    option.classList.add("active");

                }


                option.style.pointerEvents =
                    "none";


                if (!isSelected) {

                    option.style.opacity =
                        "0.6";

                }

            });


            // Restore score progress
            fill.style.width =
                `${selectedScore * 20}%`;


            if (data.correct === true) {

                statusText.textContent =
                    "✅ Excellent! You made the best first decision.";

            } else {

                statusText.textContent =
                    "⚠ You already completed Mission 19.";

            }


            // Enable Continue
            nextBtn.disabled = false;

            nextBtn.style.opacity = "1";


            console.log(
                "Mission 19 previous answer restored."
            );


            return;

        }

    }


    // Start timer if not completed
    startTimer();


} catch (error) {

    console.error(
        "Error checking Mission 19:",
        error
    );


    startTimer();

}

}

// ===============================
// START 10 SECOND TIMER
// ===============================

function startTimer() {

timeLeft = 10;

timer.textContent =
    timeLeft;


options.forEach(function (option) {

    option.style.pointerEvents =
        "auto";

});


timerInterval =
    setInterval(function () {

        timeLeft--;

        timer.textContent =
            timeLeft;


        // Last second
        if (timeLeft <= 0) {

            clearInterval(timerInterval);


            if (!answerLocked) {

                answerLocked = true;


                options.forEach(function (option) {

                    option.style.pointerEvents =
                        "none";

                });


                statusText.textContent =
                    "⏰ Time is up! Please select the best decision.";

            }

        }

    }, 1000);

}

// ===============================
// SAVE ANSWER
// ===============================

async function saveAnswer() {

if (!currentUser) {

    statusText.textContent =
        "❌ Please login again.";

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


    const isCorrect =
        selectedAnswer === "checkLogs";


    await setDoc(

        answerRef,

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


    answerSaved = true;


    if (isCorrect) {

        statusText.textContent =
            "✅ Excellent! Check the server logs first and investigate the failure.";

    } else {

        statusText.textContent =
            "⚠ Review the situation. Checking server logs is the best first step.";

    }


    nextBtn.disabled = false;

    nextBtn.style.opacity =
        "1";


    console.log(
        "Mission 19 saved successfully!"
    );


} catch (error) {

    console.error(
        "Error saving Mission 19:",
        error
    );


    answerSaved = false;


    statusText.textContent =
        "❌ Could not save your decision.";


    nextBtn.disabled = true;

    nextBtn.style.opacity =
        "0.5";


    alert(
        "Could not save Mission 19. Please try again."
    );

}

}

// ===============================
// OPTION CLICK
// ===============================

options.forEach(function (option) {

option.addEventListener(
    "click",
    function () {


        // Prevent changing answer
        if (answerLocked) {

            return;

        }


        // Stop timer
        if (timerInterval) {

            clearInterval(timerInterval);

        }


        answerLocked = true;


        // Get stable answer ID
        selectedAnswer =
            this.dataset.answer ||
            this.textContent.trim();


        // Get score
        selectedScore =
            scores[selectedAnswer] || 1;


        // Disable all options
        options.forEach(function (item) {

            item.style.pointerEvents =
                "none";

        });


        // Highlight selected option
        this.classList.add("active");


        // Dim other options
        options.forEach(function (item) {

            if (item !== option) {

                item.style.opacity =
                    "0.6";

            }

        });


        // Reset progress
        fill.style.width =
            "0%";


        // AI analysis
        statusText.textContent =
            "🤖 AI is analysing your emergency decision...";


        // Keep Continue disabled
        nextBtn.disabled = true;

        nextBtn.style.opacity =
            "0.5";


        // Animate score
        setTimeout(function () {

            fill.style.width =
                `${selectedScore * 20}%`;

        }, 100);


        // Save after analysis
        setTimeout(async function () {

            await saveAnswer();

        }, 1500);

    }

);

});

// ===============================
// AUTHENTICATION
// ===============================

onAuthStateChanged(

auth,

async function (user) {

    if (user) {

        currentUser = user;


        console.log(
            "Logged in:",
            currentUser.uid
        );


        await checkPreviousAnswer();


    } else {

        currentUser = null;


        statusText.textContent =
            "❌ Please login to continue.";


        nextBtn.disabled = true;

        nextBtn.style.opacity =
            "0.5";


        alert(
            "Please login first."
        );


        window.location.href =
            "Login.html";

    }

}

);

// ===============================
// CONTINUE TO MISSION 20
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
            "Please wait until your answer is saved."
        );

        return;

    }


    window.location.href =
        "Mission20.html";

}

);
