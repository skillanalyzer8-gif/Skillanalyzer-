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
const questionNumber = 20;
const questionId = "uiux_q20";

const correctAnswer = "userCentered";


// ===============================
// SCORES
// ===============================

const scores = {

    visualOnly: 2,

    features: 3,

    userCentered: 5,

    trend: 1

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


                // Restore progress

                fill.style.width =
                    `${selectedScore * 20}%`;


                if (data.correct === true) {

                    statusText.textContent =
                        "✅ Excellent! User-centered design considers user needs, accessibility, testing, feedback, and continuous improvement.";

                } else {

                    statusText.textContent =
                        "⚠ You already completed Mission 20. Your previous decision has been restored.";

                }


                nextBtn.disabled = false;

                nextBtn.style.opacity = "1";


                console.log(
                    "Ui20 previous answer restored."
                );


                return;

            }

        }


        console.log(
            "No previous Ui20 answer found."
        );

    } catch (error) {

        console.error(
            "Error checking Ui20:",
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


        // Highlight selected option

        option.classList.add("active");


        // Dim other options

        options.forEach((item) => {

            if (item !== option) {

                item.style.opacity =
                    "0.6";

            }

        });


        // Update progress

        fill.style.width =
            `${selectedScore * 20}%`;


        // Feedback

        if (selectedAnswer === correctAnswer) {

            statusText.textContent =
                "✅ Excellent! Strong UX starts with understanding users, designing inclusively, testing the experience, and improving it continuously.";

        } else {

            statusText.textContent =
                "⚠ Good attempt. Strong UX should be user-centered rather than focused only on visuals, feature quantity, or trends.";

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
        "💾 Saving your final UX decision...";


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


        // Mark UI/UX category as completed

        await setDoc(

            doc(
                db,
                "users",
                currentUser.uid
            ),

            {

                uiuxCompleted:
                    true,

                uiuxFinalMission:
                    20,

                uiuxCompletedAt:
                    new Date().toISOString()

            },

            {
                merge: true
            }

        );


        answerSaved = true;


        if (isCorrect) {

            statusText.textContent =
                "🏆 Excellent! You completed the final UI/UX mission.";

        } else {

            statusText.textContent =
                "✅ Mission 20 completed. Your complete UI/UX score will be calculated from all 20 missions.";

        }


        nextBtn.disabled = false;

        nextBtn.style.opacity = "1";


        console.log(
            "Ui20 saved successfully."
        );


    } catch (error) {

        console.error(
            "Error saving Ui20:",
            error
        );


        answerSaved = false;

        missionCompleted = false;


        statusText.textContent =
            "❌ Could not save your final decision. Please try again.";

        nextBtn.disabled = true;

        nextBtn.style.opacity = "0.5";

    }

}


// ===============================
// FINISH UI/UX ASSESSMENT
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


    /*
       Result page will be connected later.
       For now, keep the assessment complete
       without creating the result page.
    */

    statusText.textContent =
        "🏆 UI/UX assessment completed successfully!";

});
