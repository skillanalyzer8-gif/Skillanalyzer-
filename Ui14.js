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
const questionNumber = 14;
const questionId = "uiux_q14";

const correctAnswer = "inclusive";


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
// SCORES
// ===============================

const scores = {

    visual: 2,

    complex: 1,

    audio: 3,

    inclusive: 5

};


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


        if (
            answerSnap.exists() &&
            answerSnap.data().completed === true
        ) {

            const data =
                answerSnap.data();


            selectedAnswer =
                data.answer || "";


            selectedScore =
                data.score || 0;


            missionCompleted = true;

            answerSaved = true;


            // Restore selected option

            options.forEach(function (option) {

                if (
                    option.dataset.answer ===
                    selectedAnswer
                ) {

                    option.classList.add("active");

                } else {

                    option.style.opacity = "0.6";

                }


                option.style.pointerEvents =
                    "none";

            });


            // Restore progress

            if (fill) {

                fill.style.width =
                    `${selectedScore * 20}%`;

            }


            // Restore status

            if (
                selectedAnswer ===
                correctAnswer
            ) {

                statusText.textContent =
                    "✅ Excellent! You selected the most inclusive accessibility approach.";

            } else {

                statusText.textContent =
                    "⚠ You already completed Mission 14.";

            }


            nextBtn.disabled = false;
            nextBtn.style.opacity = "1";


            console.log(
                "UI/UX Mission 14 previous answer restored."
            );

        }

    } catch (error) {

        console.error(
            "Error checking Mission 14:",
            error
        );

    }

}


// ===============================
// SAVE MISSION
// ===============================

async function saveMission() {

    if (!currentUser) {

        statusText.textContent =
            "❌ Please login again.";

        return;

    }


    const isCorrect =
        selectedAnswer === correctAnswer;


    try {

        await setDoc(

            doc(
                db,
                "users",
                currentUser.uid,
                "missions",
                questionId
            ),

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


        missionCompleted = true;

        answerSaved = true;


        if (isCorrect) {

            statusText.textContent =
                "✅ Excellent! Accessible design should support different abilities, interaction methods, and ways of receiving information.";

        } else {

            statusText.textContent =
                "⚠ Review the choice. Accessible design should support a wide range of users instead of relying on one interaction method.";

        }


        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";


        console.log(
            "UI/UX Mission 14 saved successfully."
        );


    } catch (error) {

        console.error(
            "Error saving Mission 14:",
            error
        );


        answerSaved = false;


        statusText.textContent =
            "❌ Could not save your decision. Please try again.";


        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";

    }

}


// ===============================
// OPTION CLICK
// ===============================

options.forEach(function (option) {

    option.addEventListener(
        "click",
        async function () {

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
                Number(option.dataset.score);


            // Lock all options

            options.forEach(function (item) {

                item.style.pointerEvents =
                    "none";

            });


            // Highlight selected option

            options.forEach(function (item) {

                if (
                    item.dataset.answer ===
                    selectedAnswer
                ) {

                    item.classList.add("active");

                } else {

                    item.style.opacity = "0.6";

                }

            });


            // Update progress

            if (fill) {

                fill.style.width =
                    `${selectedScore * 20}%`;

            }


            statusText.textContent =
                "♿ Analyzing your accessibility decision...";


            // Small delay

            await new Promise(function (resolve) {

                setTimeout(resolve, 700);

            });


            await saveMission();

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
            nextBtn.style.opacity = "0.5";


            alert(
                "Please login first."
            );


            window.location.href =
                "Login.html";

        }

    }

);


// ===============================
// CONTINUE TO MISSION 15
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
            "Ui15.html";

    }
);
