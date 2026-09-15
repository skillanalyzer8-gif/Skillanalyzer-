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
const questionNumber = 17;
const questionId = "softwareDevelopment_q17";

// ===============================
// ELEMENTS
// ===============================

const steps =
document.querySelectorAll(".step");

const result =
document.getElementById("result");

const fill =
document.querySelector(".fill");

const statusText =
document.getElementById("statusText");

const nextBtn =
document.getElementById("nextBtn");

// ===============================
// SCORE
// ===============================

// Correct sequence = 5
// Incorrect sequence = 1

const scores = {

correct: 5,

incorrect: 1

};

// ===============================
// VARIABLES
// ===============================

let currentUser = null;

let selectedOrder = [];

let selectedScore = 0;

let answerLocked = false;

let answerSaved = false;

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

            // Restore previous order
            if (data.answer) {

                selectedOrder =
                    data.answer
                        .split(" → ")
                        .map(function (item) {

                            return item.trim();

                        });

            }


            selectedScore =
                data.score || 0;


            answerLocked = true;

            answerSaved = true;


            // Restore selected steps
            steps.forEach(function (step) {

                const stepOrder =
                    step.dataset.order;


                if (
                    selectedOrder.includes(
                        stepOrder
                    )
                ) {

                    step.classList.add("active");

                }


                step.style.pointerEvents =
                    "none";


                if (
                    !selectedOrder.includes(
                        stepOrder
                    )
                ) {

                    step.style.opacity =
                        "0.6";

                }

            });


            // Restore result
            result.textContent =
                selectedOrder.join(" → ");


            // Restore progress
            fill.style.width =
                `${selectedScore * 20}%`;


            if (data.correct === true) {

                statusText.textContent =
                    "✅ Excellent! Correct algorithm sequence.";

            } else {

                statusText.textContent =
                    "⚠ You already completed Mission 17.";

            }


            // Enable Continue
            nextBtn.disabled = false;

            nextBtn.style.opacity = "1";


            console.log(
                "Mission 17 previous answer restored."
            );


            return;

        }

    }

} catch (error) {

    console.error(
        "Error checking Mission 17:",
        error
    );

}

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
        JSON.stringify(selectedOrder) ===
        JSON.stringify(["1", "2", "3"]);


    await setDoc(

        answerRef,

        {

            category:
                category,

            questionNumber:
                questionNumber,

            answer:
                selectedOrder.join(" → "),

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
            "✅ Excellent! Correct algorithm sequence.";

    } else {

        statusText.textContent =
            "⚠ Incorrect sequence. Review the algorithm steps.";

    }


    nextBtn.disabled = false;

    nextBtn.style.opacity = "1";


    console.log(
        "Mission 17 saved successfully!"
    );


} catch (error) {

    console.error(
        "Error saving Mission 17:",
        error
    );


    answerSaved = false;


    statusText.textContent =
        "❌ Could not save your algorithm decision.";


    nextBtn.disabled = true;

    nextBtn.style.opacity = "0.5";


    alert(
        "Could not save Mission 17. Please try again."
    );

}

}

// ===============================
// STEP SELECTION
// ===============================

steps.forEach(function (step) {

step.addEventListener(
    "click",
    function () {


        // Prevent changing answer
        if (answerLocked) {

            return;

        }


        // Prevent selecting same step twice
        if (
            selectedOrder.includes(
                this.dataset.order
            )
        ) {

            return;

        }


        // Add selected step
        selectedOrder.push(
            this.dataset.order
        );


        // Highlight selected step
        this.classList.add("active");


        // Show selected order
        result.textContent =
            selectedOrder.join(" → ");


        // ===============================
        // CHECK ALL STEPS
        // ===============================

        if (
            selectedOrder.length ===
            steps.length
        ) {

            answerLocked = true;


            // Disable all steps
            steps.forEach(function (item) {

                item.style.pointerEvents =
                    "none";

            });


            // Check correct order
            const correctOrder =
                ["1", "2", "3"];


            const isCorrect =
                JSON.stringify(selectedOrder) ===
                JSON.stringify(correctOrder);


            // Set score
            if (isCorrect) {

                selectedScore =
                    scores.correct;

            } else {

                selectedScore =
                    scores.incorrect;

            }


            // Reset progress
            fill.style.width =
                "0%";


            // AI analysis
            statusText.textContent =
                "🤖 AI is analysing your algorithm...";


            // Keep Continue disabled
            nextBtn.disabled = true;

            nextBtn.style.opacity =
                "0.5";


            // Animate progress
            setTimeout(function () {

                fill.style.width =
                    `${selectedScore * 20}%`;

            }, 100);


            // Save after analysis
            setTimeout(async function () {

                await saveAnswer();

            }, 1500);

        }

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
// CONTINUE TO MISSION 18
// ===============================

nextBtn.addEventListener(
"click",
function () {

    if (
        selectedOrder.length !==
        steps.length
    ) {

        alert(
            "Please select all steps first."
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
        "Mission18.html";

}

);
