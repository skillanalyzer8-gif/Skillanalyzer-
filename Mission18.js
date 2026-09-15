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
const questionNumber = 18;
const questionId = "softwareDevelopment_q18";

// ===============================
// ELEMENTS
// ===============================

const memoryBox =
document.getElementById("memoryBox");

const countdown =
document.getElementById("countdown");

const options =
document.querySelectorAll(".option");

const fill =
document.querySelector(".fill");

const statusText =
document.getElementById("statusText");

const nextBtn =
document.getElementById("nextBtn");

// ===============================
// SCORE
// ===============================

const scores = {

continue: 1,

return: 5,

import: 3,

lambda: 2

};

// ===============================
// VARIABLES
// ===============================

let currentUser = null;

let selectedAnswer = "";

let selectedScore = 0;

let answerLocked = false;

let answerSaved = false;

let memoryTimer = null;

let timeLeft = 5;

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
            if (memoryTimer) {

                clearInterval(memoryTimer);

            }


            // Hide memory box
            memoryBox.style.display =
                "none";


            // Restore selected answer
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


            // Restore progress
            fill.style.width =
                `${selectedScore * 20}%`;


            if (data.correct === true) {

                statusText.textContent =
                    "✅ Excellent! Memory challenge completed successfully.";

            } else {

                statusText.textContent =
                    "⚠ You already completed Mission 18.";

            }


            // Enable Continue
            nextBtn.disabled = false;

            nextBtn.style.opacity = "1";


            console.log(
                "Mission 18 previous answer restored."
            );


            return;

        }

    }


    // Start timer only if mission is not completed
    startMemoryTimer();


} catch (error) {

    console.error(
        "Error checking Mission 18:",
        error
    );


    // Start timer even if checking fails
    startMemoryTimer();

}

}

// ===============================
// MEMORY TIMER
// ===============================

function startMemoryTimer() {

timeLeft = 5;

countdown.textContent =
    timeLeft;


options.forEach(function (option) {

    option.style.pointerEvents =
        "none";

    option.style.opacity =
        "0.5";

});


memoryTimer =
    setInterval(function () {

        timeLeft--;

        countdown.textContent =
            timeLeft;


        if (timeLeft <= 0) {

            clearInterval(memoryTimer);


            memoryBox.style.display =
                "none";


            options.forEach(function (option) {

                option.style.pointerEvents =
                    "auto";

                option.style.opacity =
                    "1";

            });


            statusText.textContent =
                "🧠 Memory phase complete. Choose the keyword.";

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
        selectedAnswer === "return";


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
            "✅ Excellent! Memory challenge completed successfully.";

    } else {

        statusText.textContent =
            "⚠ Incorrect. The keyword was \"return\".";

    }


    nextBtn.disabled = false;

    nextBtn.style.opacity = "1";


    console.log(
        "Mission 18 saved successfully!"
    );


} catch (error) {

    console.error(
        "Error saving Mission 18:",
        error
    );


    answerSaved = false;


    statusText.textContent =
        "❌ Could not save your memory decision.";


    nextBtn.disabled = true;

    nextBtn.style.opacity =
        "0.5";


    alert(
        "Could not save Mission 18. Please try again."
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


        // Prevent selecting during memory phase
        if (timeLeft > 0) {

            return;

        }


        answerLocked = true;


        // Get stable answer
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


        // Highlight selected answer
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
            "🤖 AI is analysing your memory...";


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
// CONTINUE TO MISSION 19
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
        "Mission19.html";

}

);
