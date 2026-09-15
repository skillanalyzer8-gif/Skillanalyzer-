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
const questionNumber = 16;
const questionId = "uiux_q16";

const correctAnswer = "clear";


// ===============================
// SCORES
// ===============================

const scores = {

    hidden: 2,

    random: 1,

    clear: 5,

    many: 3

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


                // Restore selected option

                options.forEach((option) => {

                    const answer =
                        option.dataset.answer;

                    if (answer === selectedAnswer) {

                        option.classList.add("active");

                    } else {

                        option.style.opacity =
                            "0.6";

                    }

                    option.style.pointerEvents =
                        "none";

                });


                // Restore progress

                fill.style.width =
                    `${selectedScore * 20}%`;


                if (data.correct === true) {

                    statusText.textContent =
                        "✅ Excellent! Clear and consistent navigation is the best choice.";

                } else {

                    statusText.textContent =
                        "⚠ You already completed Mission 16. Your previous decision has been restored.";

                }


                nextBtn.disabled = false;

                nextBtn.style.opacity = "1";


                console.log(
                    "Ui16 previous answer restored."
                );


                return;

            }

        }


        console.log(
            "No previous Ui16 answer found."
        );

    } catch (error) {

        console.error(
            "Error checking Ui16:",
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


        // Get selected answer

        selectedAnswer =
            option.dataset.answer;


        selectedScore =
            scores[selectedAnswer] || 0;


        // Lock mission

        missionCompleted = true;


        options.forEach((item) => {

            item.style.pointerEvents =
                "none";

        });


        // Highlight selected answer

        option.classList.add("active");


        // Dim other answers

        options.forEach((item) => {

            if (item !== option) {

                item.style.opacity =
                    "0.6";

            }

        });


        // Update progress

        fill.style.width =
            `${selectedScore * 20}%`;


        // Correct / incorrect feedback

        if (selectedAnswer === correctAnswer) {

            statusText.textContent =
                "✅ Excellent! Clear labels, consistent navigation, and logical grouping create a smooth travel-booking experience.";

        } else {

            statusText.textContent =
                "⚠ Good attempt. Effective navigation should be clear, consistent, logically grouped, and easy to discover.";

        }


        // Save answer

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
        "💾 Saving your navigation decision...";


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
                "✅ Excellent! Mission 16 completed successfully.";

        } else {

            statusText.textContent =
                "⚠ Mission 16 completed. Review clear and consistent navigation principles.";

        }


        nextBtn.disabled = false;

        nextBtn.style.opacity = "1";


        console.log(
            "Ui16 saved successfully."
        );


    } catch (error) {

        console.error(
            "Error saving Ui16:",
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
// CONTINUE TO MISSION 17
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
        "Ui17.html";

});
