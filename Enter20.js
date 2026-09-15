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
const statusText = document.getElementById("statusText");
const legacyText = document.getElementById("legacyText");
const nextBtn = document.getElementById("nextBtn");

// ===============================
// MISSION DETAILS
// ===============================

const category = "entrepreneurship";
const questionNumber = 20;
const questionId = "entrepreneurship_q20";

// ===============================
// VARIABLES
// ===============================

let currentUser = null;
let selectedAnswer = null;
let selectedScore = 0;
let answerLocked = false;
let answerSaved = false;

// ===============================
// ANSWER SCORES
// ===============================

const scores = {

impact: 5,

profit: 1,

fame: 2,

competition: 3

};

// ===============================
// CORRECT ANSWER
// ===============================

const correctAnswer = "impact";

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

    selectedAnswer = data.answer;

    selectedScore = data.score;

    answerLocked = true;

    answerSaved = true;


    options.forEach(function (option) {

      option.disabled = true;

      if (option.dataset.answer === selectedAnswer) {

        option.style.border = "2px solid #00ff88";

      } else {

        option.style.opacity = "0.45";

      }

    });


    legacyText.textContent =
      "🌍 Your final entrepreneurship decision has already been recorded.";

    statusText.textContent =
      "✅ Mission 20 already completed.";

    nextBtn.disabled = false;

  }

}

} catch (error) {

console.error(
  "Error checking Mission 20:",
  error
);

}

}

// ===============================
// SELECT ANSWER
// ===============================

options.forEach(function (option) {

option.addEventListener("click", function () {

if (answerLocked) {

  return;

}


selectedAnswer = option.dataset.answer;

selectedScore = scores[selectedAnswer];

answerLocked = true;


// ===============================
// LOCK ALL OPTIONS
// ===============================

options.forEach(function (item) {

  item.disabled = true;

  if (item.dataset.answer === selectedAnswer) {

    item.style.border = "2px solid #00ff88";

  } else {

    item.style.opacity = "0.45";

  }

});


// ===============================
// SHOW RESULT
// ===============================

if (selectedAnswer === correctAnswer) {

  statusText.textContent =
    "🏆 Excellent! A strong entrepreneurial legacy is built by creating lasting value and solving meaningful problems.";

  legacyText.textContent =
    "🌍 Your final decision demonstrates long-term vision, responsibility and value creation.";

} else {

  statusText.textContent =
    "⚠️ The strongest choice is to create lasting value by solving meaningful problems and improving people's lives.";

  legacyText.textContent =
    "💡 Good attempt. A strong entrepreneur should think beyond profit, fame and competition.";

}


// ===============================
// SAVE ANSWER
// ===============================

setTimeout(function () {

  saveAnswer();

}, 1200);

});

});

// ===============================
// SAVE ANSWER TO FIRESTORE
// ===============================

async function saveAnswer() {

if (!currentUser) {

alert("Please login again.");

window.location.href = "Login.html";

return;

}

try {

// ===============================
// SAVE MISSION 20
// ===============================

await setDoc(

  doc(
    db,
    "users",
    currentUser.uid,
    "missions",
    questionId
  ),

  {

    category: category,

    questionNumber: questionNumber,

    answer: selectedAnswer,

    score: selectedScore,

    correct: selectedAnswer === correctAnswer,

    completed: true,

    completedAt: new Date().toISOString()

  }

);


// ===============================
// MARK ENTREPRENEURSHIP COMPLETE
// ===============================

await setDoc(

  doc(
    db,
    "users",
    currentUser.uid
  ),

  {

    entrepreneurshipCompleted: true,

    entrepreneurshipFinalMission: 20,

    entrepreneurshipFinalAnswer: selectedAnswer,

    entrepreneurshipCompletedAt:
      new Date().toISOString()

  },

  { merge: true }

);


// ===============================
// SUCCESS
// ===============================

answerSaved = true;

legacyText.textContent =
  "🏆 Your Entrepreneurship Journey Is Complete!";

statusText.textContent =
  "👑 Final Entrepreneurship Answer Saved Successfully.";

nextBtn.disabled = false;

} catch (error) {

console.error(
  "Mission 20 Firebase Error:",
  error
);


statusText.textContent =
  "❌ Unable to save your final answer. Please try again.";

answerLocked = false;

answerSaved = false;


options.forEach(function (option) {

  option.disabled = false;

  option.style.opacity = "1";

  option.style.border = "";

});

}

}

// ===============================
// FINAL BUTTON
// ===============================

nextBtn.addEventListener("click", function () {

if (!answerSaved) {

return;

}

// Result page will be connected later
// after all 80 missions are completed.

});
