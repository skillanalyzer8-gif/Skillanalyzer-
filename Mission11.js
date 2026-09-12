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
const questionNumber = 11;
const questionId = "softwareDevelopment_q11";


// ===============================
// DOM ELEMENTS
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

    arjun: 1,

    priya: 3,

    kiran: 5

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


                    // Restore radio button
                    const radio =
                        option.querySelector("input");


                    if (radio) {

                        radio.checked =
                            isSelected;

                    }

                });


                // Restore progress
                fill.style.width =
                    `${selectedScore * 20}%`;


                statusText.textContent =
                    "✅ You already answered Mission 11.";


                nextBtn.disabled = false;

                nextBtn.style.opacity = "1";


                console.log(
                    "Mission 11 previous answer restored."
                );


                return;

            }

        }


        // No previous answer
        shuffleOptions();


    } catch (error) {

        console.error(
            "Error checking Mission 11:",
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
            "✅ Deduction Recorded Successfully";


        nextBtn.disabled = false;

        nextBtn.style.opacity = "1";


        console.log(
            "Mission 11 saved successfully!"
        );


    } catch (error) {

        console.error(
            "Error saving Mission 11:",
            error
        );


        answerSaved = false;


        statusText.textContent =
            "❌ Could not save your deduction.";


        nextBtn.disabled = true;

        nextBtn.style.opacity = "0.5";


        alert(
            "Could not save Mission 11. Please try again."
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


            // IMPORTANT:
            // Prevent changing the answer
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


            // Check radio
            const radio =
                this.querySelector("input");


            if (radio) {

                radio.checked = true;

            }


            // Disable every option
            options.forEach(function (item) {

                item.style.pointerEvents =
                    "none";

            });


            // Highlight selected answer
            this.classList.add("active");


            // Dim other answers
            options.forEach(function (item) {

                if (item !== option) {

                    item.style.opacity =
                        "0.6";

                }

            });


            // Start analysis
            fill.style.width =
                "0%";


            statusText.textContent =
                "🤖 AI is analysing your deduction...";


            // Disable Continue
            nextBtn.disabled = true;

            nextBtn.style.opacity = "0.5";


            // Progress according to score
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
// CONTINUE TO MISSION 12
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
                "Please wait until your deduction is saved."
            );

            return;

        }


        window.location.href =
            "Mission12.html";

    }
);