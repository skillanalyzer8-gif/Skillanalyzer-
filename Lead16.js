import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const statusText = document.getElementById("statusText");
const nextBtn = document.getElementById("nextBtn");


const category = "leadership";
const questionNumber = 16;
const questionId = "leadership_q16";


const correctAnswer = "understand";


const scores = {
  ignore: 1,
  understand: 5,
  force: 3,
  blame: 2
};


let currentUser = null;
let selectedAnswer = null;
let selectedScore = 0;
let answerSaved = false;


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
        answerSaved = true;


        options.forEach((option) => {

          option.disabled = true;

          option.style.pointerEvents = "none";

          if (option.dataset.answer === selectedAnswer) {

            option.style.border = "2px solid #00ff88";

          }

        });


        if (fill) {

          fill.style.width = "100%";

        }


        statusText.textContent =
          "✅ Mission 16 already completed.";


        nextBtn.disabled = false;

      }

    }

  } catch (error) {

    console.error(
      "Lead16 Previous Answer Error:",
      error
    );

  }

}


// ===============================
// OPTION SELECTION
// ===============================

options.forEach((option) => {

  option.addEventListener("click", async () => {

    if (!currentUser) {

      alert("Please login first.");

      return;

    }


    if (answerSaved) {

      return;

    }


    selectedAnswer = option.dataset.answer;

    selectedScore = scores[selectedAnswer];


    const isCorrect =
      selectedAnswer === correctAnswer;


    // Lock all options

    options.forEach((item) => {

      item.disabled = true;

      item.style.pointerEvents = "none";

      item.style.opacity = "0.6";

    });


    option.style.opacity = "1";


    if (isCorrect) {

      option.style.border =
        "2px solid #00ff88";

      statusText.textContent =
        "💜 Excellent leadership. You understood the team's emotions and supported them.";

    } else {

      option.style.border =
        "2px solid #ff4d4d";

      statusText.textContent =
        "⚠️ Good attempt. Strong leaders should understand team emotions before responding.";

    }


    if (fill) {

      fill.style.width = "100%";

    }


    await saveAnswer();

  });

});


// ===============================
// SAVE ANSWER
// ===============================

async function saveAnswer() {

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

    nextBtn.disabled = false;


  } catch (error) {

    console.error(
      "Lead16 Firebase Save Error:",
      error
    );


    statusText.textContent =
      "❌ Could not save your answer. Please try again.";

    answerSaved = false;

  }

}


// ===============================
// CONTINUE TO MISSION 17
// ===============================

nextBtn.addEventListener("click", () => {

  if (!answerSaved) {

    return;

  }


  window.location.href = "Lead17.html";

});
