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
const questionNumber = 16;
const questionId = "softwareDevelopment_q16";


// ===============================
// ELEMENTS
// ===============================

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

    42: 5,

    36: 3,

    38: 4,

    40: 1

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


                if (selectedAnswer === "42") {

                    statusText.textContent =
                        "✅ Correct! Binary 101010 = Decimal 42";

                } else {

                    statusText.textContent =
                        "⚠ You already answered Mission 16.";

                }


                // Enable Continue
                nextBtn.disabled = false;

                nextBtn.style.opacity = "1";


                console.log(
                    "Mission 16 previous answer restored."
                );


                return;

            }

        }

    } catch (error) {

        console.error(
            "Error checking Mission 16:",
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

                correct:
                    selectedAnswer === "42",

                completed:
                    true,

                completedAt:
                    new Date().toISOString()

            }

        );


        answerSaved = true;


        if (selectedAnswer === "42") {

            statusText.textContent =
                "✅ Correct! Binary 101010 = Decimal 42";

        } else {

            statusText.textContent =
                "⚠ Incorrect. AI recommends reviewing binary conversion.";

        }


        nextBtn.disabled = false;

        nextBtn.style.opacity = "1";


        console.log(
            "Mission 16 saved successfully!"
        );


    } catch (error) {

        console.error(
            "Error saving Mission 16:",
            error
        );


        answerSaved = false;


        statusText.textContent =
            "❌ Could not save your binary decision.";


        nextBtn.disabled = true;

        nextBtn.style.opacity = "0.5";


        alert(
            "Could not save Mission 16. Please try again."
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


            answerLocked = true;


            // Get stable answer ID
            selectedAnswer =
                this.dataset.answer ||
                this.textContent.trim();


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
                "🤖 AI is analysing your binary decision...";


            // Keep Continue disabled
            nextBtn.disabled = true;

            nextBtn.style.opacity = "0.5";


            // Animate score
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
// CONTINUE TO MISSION 17
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
            "Mission17.html";

    }
);
