import { auth, db } from "./firebase.js";

import {
doc,
getDoc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// =====================================
// MISSION CONFIGURATION
// =====================================

const category = "entrepreneurship";

const questionNumber = 5;

const questionId = "entrepreneurship_q5";

// =====================================
// SCORE SYSTEM
// =====================================

const scores = {

customerProblem: 5,

addFeatures: 3,

changeLogo: 2,

increasePrice: 1

};

// =====================================
// HTML ELEMENTS
// =====================================

const options =
document.querySelectorAll(".option");

const nextBtn =
document.getElementById("nextBtn");

const statusText =
document.getElementById("statusText");

const progressFill =
document.querySelector(".fill");

// =====================================
// STATE
// =====================================

let currentUser = null;

let selectedAnswer = null;

let selectedScore = 0;

let answerLocked = false;

let answerSaved = false;

// =====================================
// INITIAL STATE
// =====================================

nextBtn.disabled = true;

// =====================================
// CHECK PREVIOUS ANSWER
// =====================================

async function checkPreviousAnswer() {

if (!currentUser) return;


try {

    const missionRef = doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        questionId
    );


    const missionSnap =
        await getDoc(missionRef);


    if (missionSnap.exists()) {

        const data =
            missionSnap.data();


        selectedAnswer =
            data.answer;

        selectedScore =
            data.score || 0;

        answerLocked = true;

        answerSaved = true;


        options.forEach(option => {

            if (
                option.dataset.answer ===
                selectedAnswer
            ) {

                option.classList.add(
                    "selected"
                );

            } else {

                option.style.opacity =
                    "0.5";

            }

        });


        progressFill.style.width =
            "100%";


        statusText.textContent =
            "✅ Your previous answer was already saved.";


        nextBtn.disabled = false;

    }

} catch (error) {

    console.error(
        "Error checking Entrepreneurship Mission 5:",
        error
    );

}

}

// =====================================
// SAVE ANSWER
// =====================================

async function saveAnswer() {

if (
    !currentUser ||
    !selectedAnswer
) {

    return false;

}


try {

    const missionRef = doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        questionId
    );


    await setDoc(

        missionRef,

        {

            category: category,

            questionNumber:
                questionNumber,

            answer:
                selectedAnswer,

            score:
                selectedScore,

            correct:
                selectedAnswer ===
                "customerProblem",

            completed: true,

            completedAt:
                new Date()

        },

        {
            merge: true
        }

    );


    answerSaved = true;

    nextBtn.disabled = false;


    statusText.textContent =
        "✅ Decision saved successfully!";


    return true;

} catch (error) {

    console.error(
        "Error saving Entrepreneurship Mission 5:",
        error
    );


    statusText.textContent =
        "❌ Unable to save your decision. Please try again.";


    return false;

}

}

// =====================================
// OPTION SELECTION
// =====================================

options.forEach(option => {

option.addEventListener(
    "click",
    async () => {

        if (answerLocked) return;


        selectedAnswer =
            option.dataset.answer;


        selectedScore =
            scores[selectedAnswer] || 0;


        answerLocked = true;


        options.forEach(item => {

            if (item === option) {

                item.classList.add(
                    "selected"
                );

            } else {

                item.style.opacity =
                    "0.5";

            }

        });


        progressFill.style.width =
            "100%";


        statusText.textContent =
            "🤖 AI is analyzing your product decision...";


        await new Promise(resolve =>
            setTimeout(
                resolve,
                1200
            )
        );


        await saveAnswer();

    }
);

});

// =====================================
// CONTINUE
// =====================================

nextBtn.addEventListener(
"click",
() => {

    if (
        !selectedAnswer ||
        !answerSaved
    ) {

        return;

    }


    window.location.href =
        "Enter6.html";

}

);

// =====================================
// AUTHENTICATION
// =====================================

onAuthStateChanged(
auth,
async user => {

    if (!user) {

        window.location.href =
            "Login.html";

        return;

    }


    currentUser = user;


    console.log(
        "Entrepreneurship Mission 5 user:",
        currentUser.uid
    );


    await checkPreviousAnswer();

}

);
