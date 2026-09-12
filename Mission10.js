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
const questionNumber = 10;
const questionId = "softwareDevelopment_q10";


// ===============================
// DOM ELEMENTS
// ===============================

const optionsContainer = document.getElementById("options");
const options = document.querySelectorAll(".option");

const fill = document.querySelector(".fill");
const statusText = document.getElementById("statusText");
const nextBtn = document.getElementById("nextBtn");


// ===============================
// SCORES
// ===============================

const scores = {
    finalTests: 5,
    deployProduction: 4,
    rollbackRelease: 3,
    delayDeployment: 1
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
// INITIAL UI
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
            Math.floor(Math.random() * (i + 1));


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


                // Restore selected option
                options.forEach(function (option) {

                    if (
                        option.dataset.answer ===
                        selectedAnswer
                    ) {

                        option.classList.add("active");

                    }


                    option.style.pointerEvents =
                        "none";


                    if (
                        option.dataset.answer !==
                        selectedAnswer
                    ) {

                        option.style.opacity =
                            "0.6";

                    }

                });


                // Restore progress
                fill.style.width =
                    `${selectedScore * 20}%`;


                statusText.textContent =
                    "✅ You already answered Mission 10.";


                nextBtn.disabled = false;
                nextBtn.style.opacity = "1";


                console.log(
                    "Mission 10 previous answer restored."
                );


                return;
            }

        }


        // No previous answer
        shuffleOptions();


    } catch (error) {

        console.error(
            "Error checking Mission 10:",
            error
        );


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

                category: category,

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
            "🎉 Mission 10 Completed Successfully!";


        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";


        console.log(
            "Mission 10 saved successfully!"
        );


    } catch (error) {

        console.error(
            "Error saving Mission 10:",
            error
        );


        answerSaved = false;


        statusText.textContent =
            "❌ Could not save your final decision.";


        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";


        alert(
            "Could not save Mission 10. Please try again."
        );

    }

}


// ===============================
// OPTION SELECTION
// ===============================

options.forEach(function (option) {

    option.addEventListener(
        "click",
        async function () {


            // VERY IMPORTANT:
            // Prevent second selection
            if (answerLocked) {

                return;

            }


            // Lock immediately
            answerLocked = true;


            // Get answer ID
            selectedAnswer =
                this.dataset.answer;


            // Get score
            selectedScore =
                scores[selectedAnswer];


            // Disable ALL options
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


            // Start progress
            fill.style.width =
                "0%";


            statusText.textContent =
                "🤖 AI is analysing your final deployment decision...";


            // Disable Continue
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
// CONTINUE TO MISSION 11
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
                "Please wait until your final decision is saved."
            );

            return;

        }


        window.location.href =
            "Mission11.html";

    }
);