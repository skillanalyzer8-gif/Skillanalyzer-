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
const questionNumber = 12;
const questionId = "softwareDevelopment_q12";


// ===============================
// DOM ELEMENTS
// ===============================

const optionsContainer =
    document.getElementById("options");

const cards =
    document.querySelectorAll(".card");

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

    forty: 3,

    fortyTwo: 5,

    fortyFour: 4,

    fortyEight: 1

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
// SHUFFLE CARDS
// ===============================

function shuffleCards() {

    const cardArray =
        Array.from(optionsContainer.children);


    for (
        let i = cardArray.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );


        const temp =
            cardArray[i];

        cardArray[i] =
            cardArray[randomIndex];

        cardArray[randomIndex] =
            temp;

    }


    cardArray.forEach(function (card) {

        optionsContainer.appendChild(card);

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


                // Restore previous selection
                cards.forEach(function (card) {

                    const isSelected =
                        card.dataset.answer ===
                        selectedAnswer;


                    if (isSelected) {

                        card.classList.add("active");

                    }


                    card.style.pointerEvents =
                        "none";


                    if (!isSelected) {

                        card.style.opacity =
                            "0.6";

                    }

                });


                // Restore progress
                fill.style.width =
                    `${selectedScore * 20}%`;


                statusText.textContent =
                    "✅ You already answered Mission 12.";


                nextBtn.disabled = false;

                nextBtn.style.opacity = "1";


                console.log(
                    "Mission 12 previous answer restored."
                );


                return;

            }

        }


        // No previous answer
        shuffleCards();


    } catch (error) {

        console.error(
            "Error checking Mission 12:",
            error
        );


        shuffleCards();

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
            "✅ Answer Recorded Successfully";


        nextBtn.disabled = false;

        nextBtn.style.opacity = "1";


        console.log(
            "Mission 12 saved successfully!"
        );


    } catch (error) {

        console.error(
            "Error saving Mission 12:",
            error
        );


        answerSaved = false;


        statusText.textContent =
            "❌ Could not save your answer.";


        nextBtn.disabled = true;

        nextBtn.style.opacity = "0.5";


        alert(
            "Could not save Mission 12. Please try again."
        );

    }

}


// ===============================
// ANSWER SELECTION
// ===============================

cards.forEach(function (card) {

    card.addEventListener(
        "click",
        async function () {


            // IMPORTANT:
            // Prevent changing answer
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


            // Disable ALL cards
            cards.forEach(function (item) {

                item.style.pointerEvents =
                    "none";

            });


            // Highlight selected card
            this.classList.add("active");


            // Dim other cards
            cards.forEach(function (item) {

                if (item !== card) {

                    item.style.opacity =
                        "0.6";

                }

            });


            // Start AI analysis
            fill.style.width =
                "0%";


            statusText.textContent =
                "🤖 AI is analysing your answer...";


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
// CONTINUE TO MISSION 13
// ===============================

nextBtn.addEventListener(
    "click",
    function () {


        if (!selectedAnswer) {

            alert(
                "Please select an answer first."
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
            "Mission13.html";

    }
);