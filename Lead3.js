import { auth, db } from "./firebase.js";

import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ===============================
// GET HTML ELEMENTS
// ===============================

const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const analysisText = document.getElementById("statusText");
const nextBtn = document.getElementById("nextBtn");

// ===============================
// VARIABLES
// ===============================

let currentUser = null;
let selectedAnswer = "";
let selectedScore = 0;
let missionCompleted = false;
let answerSaved = false;

// ===============================
// MISSION SETTINGS
// ===============================

const category = "leadership";
const questionNumber = 3;
const questionId = "leadership_q3";

// ===============================
// CORRECT ANSWER
// ===============================

const correctAnswer = "prioritize";

// ===============================
// SCORES
// ===============================

const scores = {

ignore: 1,

overnight: 2,

deliver: 3,

prioritize: 5

};

// ===============================
// CHECK LOGIN
// ===============================

onAuthStateChanged(auth, async function (user) {

if (user) {

currentUser = user;

await checkPreviousAnswer();

} else {

alert("Please login first.");

window.location.href = "Login.html";

}

});

// ===============================
// INITIAL BUTTON STATE
// ===============================

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

// ===============================
// CHECK PREVIOUS ANSWER
// ===============================

async function checkPreviousAnswer() {

try {

const missionRef = doc(
  db,
  "users",
  currentUser.uid,
  "missions",
  questionId
);

const missionSnap = await getDoc(missionRef);


if (missionSnap.exists()) {

  const data = missionSnap.data();


  if (data.completed === true) {

    selectedAnswer = data.answer || "";
    selectedScore = data.score || 0;

    missionCompleted = true;
    answerSaved = true;


    // Restore selected option

    options.forEach(function (option) {

      if (option.dataset.answer === selectedAnswer) {

        option.classList.add("active");

      }

    });


    // Lock all options

    options.forEach(function (option) {

      option.style.pointerEvents = "none";

    });


    // Restore progress

    fill.style.width = "100%";


    analysisText.textContent =
      "✅ Crisis Management Decision Already Recorded";


    // Enable Continue

    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";

  }

}

} catch (error) {

console.error(
  "Lead Mission 3 Previous Answer Error:",
  error
);

}

}

// ===============================
// OPTION SELECTION
// ===============================

options.forEach(function (option) {

option.addEventListener("click", function () {

// Prevent changing answer after saving

if (answerSaved) {

  return;

}


// Store answer ID

selectedAnswer = this.dataset.answer;


// Get score

selectedScore =
  scores[selectedAnswer] || 0;


// Check correctness

const isCorrect =
  selectedAnswer === correctAnswer;


// Highlight selected option

options.forEach(function (item) {

  item.classList.remove("active");

});

this.classList.add("active");


// Lock options during analysis

options.forEach(function (item) {

  item.style.pointerEvents = "none";

});


// Reset progress

fill.style.width = "0%";


analysisText.textContent =
  "🤖 AI Crisis Manager is analyzing your decision...";


// Disable Continue

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";


// Progress animation

setTimeout(function () {

  fill.style.width = "100%";

}, 100);


// ===============================
// SAVE ANSWER
// ===============================

setTimeout(async function () {

  if (!currentUser) {

    analysisText.textContent =
      "❌ Login session not found.";

    alert("Please login again.");

    window.location.href = "Login.html";

    return;

  }


  analysisText.textContent =
    "🤖 Recording your crisis-management decision...";


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

        questionNumber: questionNumber,

        answer: selectedAnswer,

        score: selectedScore,

        correct: isCorrect,

        completed: true,

        completedAt: new Date().toISOString()

      }

    );


    // ===============================
    // SUCCESS
    // ===============================

    missionCompleted = true;
    answerSaved = true;


    analysisText.textContent =
      isCorrect
        ? "✅ Excellent! You prioritized the critical bugs and managed the team fairly."
        : "📊 Decision recorded. Continue to the next mission.";


    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";


  } catch (error) {

    console.error(
      "Lead Mission 3 Firebase Error:",
      error
    );


    analysisText.textContent =
      "❌ Unable to save your decision. Please try again.";


    // Allow retry

    options.forEach(function (item) {

      item.style.pointerEvents = "auto";

    });


    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";

  }

}, 1500);

});

});

// ===============================
// CONTINUE TO MISSION 4
// ===============================

nextBtn.addEventListener("click", function () {

if (selectedAnswer === "") {

alert("Please select an option first.");

return;

}

if (!missionCompleted || !answerSaved) {

alert(
  "Please wait until your crisis-management decision is saved."
);

return;

}

window.location.href = "Lead4.html";

});
