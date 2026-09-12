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
const questionNumber = 13;
const questionId = "softwareDevelopment_q13";


// ===============================
// ELEMENTS
// ===============================

const optionsContainer =
    document.getElementById("options");

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

    variableName: 5,

    loopStart: 3,

    printFunction: 4,

    noBug: 1

};


// ===============================
// VARIABLES
// ===============================

let currentUser = null;

let selectedAnswer = "";

let selectedScore = 0;

let answerLocked = false;

let answerSaved = false;


// ===============================
// INITIAL BUTTON STATE
// ===============================

nextBtn.disabled = true;

nextBtn.style.opacity = "0.5";


// ===============================
// SHUFFLE OPTIONS
// ===============================

function shuffleOptions() {

    const optionArray =
        Array.from(optionsContainer.children);


    for (
        let i = optionArray.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );


        const temp =
            optionArray[i];

        optionArray[i] =
            optionArray[randomIndex];

        optionArray[randomIndex] =
            temp;

    }


    optionArray.forEach(function (option) {

        optionsContainer.appendChild(option);

    });

}


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


                // Restore previous answer
                options.forEach(function (option) {

                    const isSelected =
                        option.dataset.answer ===
                        selectedAnswer;


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


                statusText.textContent =
                    "✅ You already answered Mission 13.";


                // Enable Continue
                nextBtn.disabled = false;

                nextBtn.style.opacity = "1";


                console.log(
                    "Mission 13 previous answer restored."
                );


                return;

            }

        }


        // No previous answer
        shuffleOptions();


    } catch (error) {

        console.error(
            "Error checking Mission 13:",
            error
        );


        // Still allow the page to work
        shuffleOptions();

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

                completed:
                    true,

                completedAt:
                    new Date().toISOString()

            }

        );


        answerSaved = true;


        statusText.textContent =
            "✅ Debugging Decision Recorded Successfully";


        nextBtn.disabled = false;

        nextBtn.style.opacity = "1";


        console.log(
            "Mission 13 saved successfully!"
        );


    } catch (error) {

        console.error(
            "Error saving Mission 13:",
            error
        );


        answerSaved = false;


        statusText.textContent =
            "❌ Could not save your decision.";


        nextBtn.disabled = true;

        nextBtn.style.opacity = "0.5";


        alert(
            "Could not save Mission 13. Please try again."
        );

    }

}


// ===============================
// OPTION CLICK
// ===============================

options.forEach(function (option) {

    option.addEventListener(
        "click",
        async function () {


            // VERY IMPORTANT:
            // First answer permanently locks
            if (answerLocked) {

                return;

            }


            answerLocked = true;


            // Get stable answer ID
            selectedAnswer =
                this.dataset.answer;


            // Get score from answer ID
            selectedScore =
                scores[selectedAnswer];


            // Disable every option
            options.forEach(function (item) {

                item.style.pointerEvents =
                    "none";

            });


            // Highlight selected option
            this.classList.add("active");


            // Dim remaining options
            options.forEach(function (item) {

                if (item !== option) {

                    item.style.opacity =
                        "0.6";

                }

            });


            // Reset progress
            fill.style.width =
                "0%";


            // AI analysis message
            statusText.textContent =
                "🤖 AI is analysing your debugging skill...";


            // Keep Continue disabled
            nextBtn.disabled = true;

            nextBtn.style.opacity = "0.5";


            // Animate score progress
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


            alert(
                "Please login first."
            );


            window.location.href =
                "Login.html";

        }

    }

);


// ===============================
// CONTINUE TO MISSION 14
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
            "Mission14.html";

    }
);