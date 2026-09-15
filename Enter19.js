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
const futureText = document.getElementById("futureText");
const nextBtn = document.getElementById("nextBtn");

// ===============================
// MISSION DETAILS
// ===============================

const category = "entrepreneurship";
const questionNumber = 19;
const questionId = "entrepreneurship_q19";

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

sustainable: 5,

luxury: 2,

trend: 3,

profit: 1

};

// ===============================
// CORRECT ANSWER
// ===============================

const correctAnswer = "sustainable";

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


    futureText.textContent =
      "🌍 Your global future decision has already been recorded.";

    statusText.textContent =
      "✅ Mission 19 already completed.";

    nextBtn.disabled = false;

  }

}

} catch (error) {

console.error(
  "Error checking Mission 19:",
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
    "✅ Excellent vision! You selected a sustainable project with long-term benefits for humanity.";

  futureText.textContent =
    "🌱 Strong entrepreneurial thinking: consider sustainability, global impact and long-term value.";

} else {

  statusText.textContent =
    "⚠️ The strongest choice is the sustainable project with meaningful long-term benefits for humanity.";

  futureText.textContent =
    "💡 Good attempt. Strong entrepreneurs consider long-term impact instead of popularity or short-term profit.";

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


answerSaved = true;

statusText.textContent =
  "✅ Answer saved successfully. Continue to Mission 20.";

nextBtn.disabled = false;

} catch (error) {

console.error(
  "Mission 19 Firebase Error:",
  error
);


statusText.textContent =
  "❌ Unable to save your answer. Please try again.";

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
// CONTINUE TO MISSION 20
// ===============================

nextBtn.addEventListener("click", function () {

if (!answerSaved) {

return;

}

window.location.href = "Enter20.html";

});
