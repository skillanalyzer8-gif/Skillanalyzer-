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
const nextBtn = document.getElementById("nextBtn");

// ===============================
// VARIABLES
// ===============================

let currentUser = null;
let selectedAnswer = null;
let selectedScore = 0;
let answerLocked = false;
let answerSaved = false;

// ===============================
// MISSION DETAILS
// ===============================

const category = "entrepreneurship";
const questionNumber = 16;
const questionId = "entrepreneurship_q16";

// ===============================
// SCORES
// ===============================

const scores = {
communicate: 5,
panic: 2,
hide: 1,
spend: 3
};

// ===============================
// CORRECT ANSWER
// ===============================

const correctAnswer = "communicate";

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
    selectedScore = data.score || 0;

    answerLocked = true;
    answerSaved = true;

    options.forEach(function (option) {

      option.disabled = true;

      if (option.dataset.answer === selectedAnswer) {

        option.style.border =
          "2px solid #00ff88";

      } else {

        option.style.opacity = "0.45";

      }

    });

    statusText.textContent =
      "✅ Mission 16 already completed. You can continue.";

    nextBtn.disabled = false;

  }

}

} catch (error) {

console.error(
  "Error checking previous answer:",
  error
);

}

}

// ===============================
// OPTION CLICK
// ===============================

options.forEach(function (option) {

option.addEventListener("click", async function () {

if (answerLocked) {

  return;

}

selectedAnswer = option.dataset.answer;

selectedScore =
  scores[selectedAnswer] || 0;

answerLocked = true;


// ===============================
// LOCK ALL OPTIONS
// ===============================

options.forEach(function (item) {

  item.disabled = true;

  if (item !== option) {

    item.style.opacity = "0.45";

  }

});


// ===============================
// SHOW RESULT
// ===============================

if (selectedAnswer === correctAnswer) {

  option.style.border =
    "2px solid #00ff88";

  statusText.textContent =
    "✅ Excellent leadership! Clear communication and a practical response plan are important during a crisis.";

} else {

  option.style.border =
    "2px solid #ff5555";

  statusText.textContent =
    "⚠️ Not the strongest decision. A good leader should communicate clearly and respond to the most important problems systematically.";

}


// ===============================
// SAVE ANSWER
// ===============================

await saveAnswer();

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

    correct:
      selectedAnswer === correctAnswer,

    completed: true,

    completedAt:
      new Date().toISOString()

  }

);


// ===============================
// ANSWER SAVED
// ===============================

answerSaved = true;

nextBtn.disabled = false;

statusText.textContent =
  "✅ Answer saved. Continue to Mission 17.";

} catch (error) {

console.error(
  "Error saving Mission 16:",
  error
);

statusText.textContent =
  "❌ Could not save your answer. Please try again.";

answerLocked = false;

options.forEach(function (option) {

  option.disabled = false;

});

}

}

// ===============================
// CONTINUE TO MISSION 17
// ===============================

nextBtn.addEventListener("click", function () {

if (!answerSaved) {

return;

}

window.location.href = "Enter17.html";

});
