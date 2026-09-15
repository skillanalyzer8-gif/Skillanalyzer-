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
const questionNumber = 15;
const questionId = "softwareDevelopment_q15";


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

    line1: 1,

    line2: 3,

    line3: 4,

    line4: 5

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
                    "✅ You already answered Mission 15.";


                // Enable Continue
                nextBtn.disabled = false;

                nextBtn.style.opacity = "1";


                console.log(
                    "Mission 15 previous answer restored."
                );


                return;

            }

        }

    } catch (error) {

        console.error(
            "Error checking Mission 15:",
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
            "✅ Code Review Decision Recorded Successfully";


        nextBtn.disabled = false;

        nextBtn.style.opacity = "1";


        console.log(
            "Mission 15 saved successfully!"
        );


    } catch (error) {

        console.error(
            "Error saving Mission 15:",
            error
        );


        answerSaved = false;


        statusText.textContent =
            "❌ Could not save your code review decision.";


        nextBtn.disabled = true;

        nextBtn.style.opacity = "0.5";


        alert(
            "Could not save Mission 15. Please try again."
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
            // after first selection
            if (answerLocked) {

                return;

            }


            answerLocked = true;


            // Get stable answer ID
            selectedAnswer =
                this.dataset.answer;


            // Get score
            selectedScore =
                scores[selectedAnswer];


            // Disable all options
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


            // AI analysis
            statusText.textContent =
                "🤖 AI is analysing your code review skill...";


            // Keep Continue disabled
            nextBtn.disabled = true;

            nextBtn.style.opacity = "0.5";


            // Animate score progress
            setTimeout(function () {

                fill.style.width =
                    `${selectedScore * 20}%`;

            }, 100);


            // Save answer after analysis
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
// CONTINUE TO MISSION 16
// ===============================

nextBtn.addEventListener(
    "click",
    function () {


        if (!selectedAnswer) {

            alert(
                "Please select a line first."
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
            "Mission16.html";

    }
);
