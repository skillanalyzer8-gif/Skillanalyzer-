import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const optionsContainer = document.getElementById("options");
const options = Array.from(document.querySelectorAll(".option"));

const nextBtn = document.getElementById("nextBtn");
const statusText = document.getElementById("statusText");
const fill = document.querySelector(".fill");


// QUESTION INFORMATION

const category = "softwareDevelopment";
const questionNumber = 1;

const missionId = `question${questionNumber}`;


// SCORE FOR EACH ANSWER

const scores = {

    logs: 5,

    rollback: 3,

    reproduce: 2,

    ignore: 1

};


let currentUser = null;
let selectedAnswer = null;
let locked = false;


// ------------------------------------
// RANDOMIZE OPTIONS
// ------------------------------------

function shuffleOptions() {

    const shuffled = [...options];

    shuffled.sort(() => Math.random() - 0.5);

    shuffled.forEach(option => {

        optionsContainer.appendChild(option);

    });

}


// ------------------------------------
// CHECK USER LOGIN
// ------------------------------------

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        alert("Please login first.");

        return;

    }


    currentUser = user;

    await checkPreviousAnswer();

});


// ------------------------------------
// CHECK FIREBASE FOR PREVIOUS ANSWER
// ------------------------------------

async function checkPreviousAnswer() {

    try {

        const questionRef = doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            missionId
        );


        const questionSnap = await getDoc(questionRef);


        if (questionSnap.exists()) {

            const data = questionSnap.data();

            if (data.completed === true) {

                selectedAnswer = data.answer;

                locked = true;

                showLockedAnswer();

                return;

            }

        }


        // Only randomize if question has NOT been answered

        shuffleOptions();

        enableOptions();

    }

    catch (error) {

        console.error(
            "Error checking previous answer:",
            error
        );

    }

}


// ------------------------------------
// ENABLE OPTIONS
// ------------------------------------

function enableOptions() {

    options.forEach(option => {

        option.style.cursor = "pointer";

        option.addEventListener(
            "click",
            handleAnswer
        );

    });

}


// ------------------------------------
// ANSWER SELECTION
// ------------------------------------

async function handleAnswer(event) {

    if (locked) {

        return;

    }


    const option = event.currentTarget;

    selectedAnswer = option.dataset.answer;

    locked = true;


    // REMOVE CLICK POSSIBILITY

    options.forEach(item => {

        item.style.pointerEvents = "none";

    });


    // HIGHLIGHT SELECTED ANSWER

    option.classList.add("selected");


    // GET SCORE

    const score = scores[selectedAnswer];


    // SHOW RESULT

    statusText.innerText =
        `🤖 Decision recorded — Score: ${score}/5`;


    fill.style.width =
        `${score * 20}%`;


    // SAVE TO FIREBASE

    await saveAnswer(score);


    // ENABLE NEXT

    nextBtn.disabled = false;

}


// ------------------------------------
// SAVE ANSWER
// ------------------------------------

async function saveAnswer(score) {

    try {

        await setDoc(

            doc(
                db,
                "users",
                currentUser.uid,
                "missions",
                missionId
            ),

            {

                category: category,

                questionNumber: questionNumber,

                answer: selectedAnswer,

                score: score,

                completed: true,

                completedAt: new Date().toISOString()

            },

            {

                merge: true

            }

        );


        console.log(
            "Question saved successfully."
        );

    }

    catch (error) {

        console.error(
            "Error saving answer:",
            error
        );

    }

}


// ------------------------------------
// SHOW LOCKED ANSWER AFTER REFRESH
// ------------------------------------

function showLockedAnswer() {

    options.forEach(option => {

        option.style.pointerEvents = "none";

        option.style.cursor = "not-allowed";


        if (
            option.dataset.answer === selectedAnswer
        ) {

            option.classList.add("selected");

        }

    });


    const score = scores[selectedAnswer];


    statusText.innerText =
        `🔒 Already answered — Score: ${score}/5`;


    fill.style.width =
        `${score * 20}%`;


    nextBtn.disabled = false;

}


// ------------------------------------
// NEXT QUESTION
// ------------------------------------

nextBtn.addEventListener("click", () => {

    window.location.href = "DeveloperMindset2.html";

});
