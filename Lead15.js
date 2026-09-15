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
// ELEMENTS
// ===============================

const options = document.getElementById("options");
const statusText = document.getElementById("statusText");
const nextBtn = document.getElementById("nextBtn");
const progressFill = document.querySelector(".fill");

// ===============================
// MISSION SETTINGS
// ===============================

const category = "leadership";
const questionNumber = 15;
const questionId = "leadership_q15";

const correctAnswer = "prioritize";

const scores = {
prioritize: 5,
rush: 2,
alone: 3,
equal: 1
};

// ===============================
// STATE
// ===============================

let currentUser = null;
let selectedAnswer = null;
let selectedScore = null;
let missionCompleted = false;
let answerSaved = false;

// Continue disabled initially

if (nextBtn) {
nextBtn.disabled = true;
}

// ===============================
// AUTHENTICATION
// ===============================

onAuthStateChanged(auth, async (user) => {

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

if (!currentUser) return;

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

    missionCompleted = true;
    answerSaved = true;

    lockOptions();

    if (progressFill) {
      progressFill.style.width = "100%";
    }

    if (statusText) {
      statusText.textContent =
        "Mission 15 already completed. You can continue.";
    }

    if (nextBtn) {
      nextBtn.disabled = false;
    }

  }

}

} catch (error) {

console.error(
  "Lead Mission 15 restore error:",
  error
);

}

}

// ===============================
// OPTION SELECTION
// ===============================

if (options) {

options.addEventListener("click", async (event) => {

const option = event.target.closest(".option");

if (!option) return;

if (missionCompleted || answerSaved) {
  return;
}


selectedAnswer = option.dataset.answer;

selectedScore = scores[selectedAnswer] || 0;

const isCorrect =
  selectedAnswer === correctAnswer;


// ===============================
// LOCK OPTIONS
// ===============================

const allOptions =
  options.querySelectorAll(".option");

allOptions.forEach((item) => {

  item.style.pointerEvents = "none";
  item.style.opacity = "0.6";

});

option.style.opacity = "1";


// ===============================
// SHOW RESULT
// ===============================

if (isCorrect) {

  option.style.border =
    "2px solid #00ff88";

  if (statusText) {

    statusText.textContent =
      "Correct! Strong leaders prioritize critical problems and use the team's strengths effectively.";

  }

} else {

  option.style.border =
    "2px solid #ff5555";


  const correctOption =
    options.querySelector(
      `[data-answer="${correctAnswer}"]`
    );

  if (correctOption) {

    correctOption.style.opacity = "1";
    correctOption.style.border =
      "2px solid #00ff88";

  }


  if (statusText) {

    statusText.textContent =
      "Not the best choice. Effective leaders prioritize the most important problems instead of rushing or handling everything alone.";

  }

}


// ===============================
// PROGRESS
// ===============================

if (progressFill) {

  progressFill.style.width = "100%";

}


// ===============================
// SAVE ANSWER
// ===============================

await saveAnswer();

});

}

// ===============================
// SAVE ANSWER TO FIRESTORE
// ===============================

async function saveAnswer() {

if (!currentUser) return;

if (!selectedAnswer) return;

if (answerSaved) return;

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
    correct: selectedAnswer === correctAnswer,
    completed: true,
    completedAt: new Date().toISOString()
  }
);


answerSaved = true;
missionCompleted = true;


if (nextBtn) {
  nextBtn.disabled = false;
}

} catch (error) {

console.error(
  "Lead Mission 15 Firebase Error:",
  error
);


answerSaved = false;
missionCompleted = false;


if (statusText) {

  statusText.textContent =
    "❌ Unable to save your answer. Please try again.";

}

}

}

// ===============================
// LOCK PREVIOUSLY ANSWERED OPTIONS
// ===============================

function lockOptions() {

if (!options) return;

const allOptions =
options.querySelectorAll(".option");

allOptions.forEach((option) => {

option.style.pointerEvents = "none";


if (
  option.dataset.answer === selectedAnswer
) {

  option.style.opacity = "1";


  if (selectedAnswer === correctAnswer) {

    option.style.border =
      "2px solid #00ff88";

  } else {

    option.style.border =
      "2px solid #ff5555";


    const correctOption =
      options.querySelector(
        `[data-answer="${correctAnswer}"]`
      );


    if (correctOption) {

      correctOption.style.opacity = "1";
      correctOption.style.border =
        "2px solid #00ff88";

    }

  }

} else {

  option.style.opacity = "0.6";

}

});

}

// ===============================
// CONTINUE TO MISSION 16
// ===============================

if (nextBtn) {

nextBtn.addEventListener("click", () => {

if (!answerSaved) {

  if (statusText) {

    statusText.textContent =
      "Please select an answer first.";

  }

  return;

}


window.location.href = "Lead16.html";

});

                         }
