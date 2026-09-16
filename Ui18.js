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

const category = "uiux";
const questionNumber = 18;
const questionId = "uiux_q18";

const correctAnswer = "subtle";


// ===============================
// SCORES
// ===============================

const scores = {

    missing: 1,

    excessive: 3,

    confusing: 2,

    subtle: 5

};


// ===============================
// DOM ELEMENTS
// ===============================

const options =
    document.querySelectorAll(".option");

const statusText =
    document.getElementById("statusText");

const fill =
    document.getElementById("fill");

const nextBtn =
    document.getElementById("nextBtn");


// ===============================
// VARIABLES
// ===============================

let currentUser = null;

let selectedAnswer = "";

let selectedScore = 0;

let missionCompleted = false;

let answerSaved = false;


// ===============================
// INITIAL BUTTON STATE
// ===============================

nextBtn.disabled = true;

nextBtn.style.opacity = "0.5";


// ===============================
// AUTHENTICATION
// ===============================

onAuthStateChanged(auth, async (user) => {

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

        nextBtn.style.opacity = "0.5";

        alert("Please login first.");

        window.location.href =
            "Login.html";

    }

});


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

                missionCompleted = true;

                answerSaved = true;


                options.forEach((option) => {

                    if (
                        option.dataset.answer ===
                        selectedAnswer
                    ) {

                        option.classList.add("active");

                    } else {

                        option.style.opacity =
                            "0.6";

                    }

                    option.style.pointerEvents =
                        "none";

                });


                fill.style.width =
                    `${selectedScore * 20}%`;


                if (data.correct === true) {

                    statusText.textContent =
                        "✅ Excellent! Microinteractions should be useful, quick, and subtle.";

                } else {

                    statusText.textContent =
                        "⚠ You already completed Mission 18. Your previous decision has been restored.";

                }


                nextBtn.disabled = false;

                nextBtn.style.opacity = "1";


                console.log(
                    "Ui18 previous answer restored."
                );


                return;

            }

        }


        console.log(
            "No previous Ui18 answer found."
        );

    } catch (error) {

        console.error(
            "Error checking Ui18:",
            error
        );

    }

}


// ===============================
// OPTION CLICK
// ===============================

options.forEach((option) => {

    option.addEventListener("click", async () => {

        if (missionCompleted) return;


        if (!currentUser) {

            alert("Please login first.");

            window.location.href =
                "Login.html";

            return;

        }


        selectedAnswer =
            option.dataset.answer;


        selectedScore =
            scores[selectedAnswer] || 0;


        missionCompleted = true;


        options.forEach((item) => {

            item.style.pointerEvents =
                "none";

        });


        option.classList.add("active");


        options.forEach((item) => {

            if (item !== option) {

                item.style.opacity =
                    "0.6";

            }

        });


        fill.style.width =
            `${selectedScore * 20}%`;


        if (selectedAnswer === correctAnswer) {

            statusText.textContent =
                "✅ Excellent! Small, purposeful and subtle feedback makes an interface feel responsive without distracting users.";

        } else {

            statusText.textContent =
                "⚠ Good attempt. Effective microinteractions should provide useful feedback without overwhelming the user.";

        }


        await saveMission();

    });

});


// ===============================
// SAVE MISSION
// ===============================

async function saveMission() {

    if (!currentUser) return;


    const isCorrect =
        selectedAnswer === correctAnswer;


    statusText.textContent =
        "💾 Saving your interaction decision...";


    try {

        const answerRef = doc(

            db,

            "users",

            currentUser.uid,

            "missions",

            questionId

        );


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
                "✅ Excellent! Mission 18 completed successfully.";

        } else {

            statusText.textContent =
                "⚠ Mission 18 completed. Remember: good microinteractions should be useful, quick and subtle.";

        }


        nextBtn.disabled = false;

        nextBtn.style.opacity = "1";


        console.log(
            "Ui18 saved successfully."
        );


    } catch (error) {

        console.error(
            "Error saving Ui18:",
            error
        );


        answerSaved = false;

        missionCompleted = false;


        statusText.textContent =
            "❌ Could not save your decision. Please try again.";

        nextBtn.disabled = true;

        nextBtn.style.opacity = "0.5";

    }

}


// ===============================
// CONTINUE TO MISSION 19
// ===============================

nextBtn.addEventListener("click", () => {

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
        "Ui19.html";

});
