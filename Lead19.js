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
// DOM ELEMENTS
// ===============================

const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const statusText = document.getElementById("statusText");
const nextBtn = document.getElementById("nextBtn");


// ===============================
// MISSION SETTINGS
// ===============================

const category = "leadership";
const questionNumber = 19;
const questionId = "leadership_q19";

const correctAnswer = "hospital";

const scores = {
  hospital: 5,
  traffic: 3,
  fire: 2,
  flood: 1
};


// ===============================
// STATE
// ===============================

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

            option.style.border =
              "2px solid #00ff88";

            option.style.opacity = "1";

          } else {

            option.style.opacity = "0.6";

          }

        });


        if (fill) {

          fill.style.width = "100%";

        }


        statusText.textContent =
          "✅ Mission 19 already completed.";

        nextBtn.disabled = false;

      }

    }

  } catch (error) {

    console.error(
      "Lead19 Previous Answer Error:",
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


    selectedAnswer =
      option.dataset.answer;

    selectedScore =
      scores[selectedAnswer];


    const isCorrect =
      selectedAnswer === correctAnswer;


    // Lock all options

    options.forEach((item) => {

      item.disabled = true;

      item.style.pointerEvents = "none";

      item.style.opacity = "0.6";

    });


    option.style.opacity = "1";


    // Feedback

    if (isCorrect) {

      option.style.border =
        "2px solid #00ff88";

      statusText.textContent =
        "🚨 Excellent prioritization. A strong commander puts immediate human safety and life-threatening situations first.";

    } else {

      option.style.border =
        "2px solid #ff4d4d";

      statusText.textContent =
        "⚠️ Good attempt. In a crisis, the most urgent threat to human safety should receive priority.";

    }


    // Complete progress

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
      "Lead19 Firebase Save Error:",
      error
    );


    answerSaved = false;


    statusText.textContent =
      "❌ Could not save your answer. Please try again.";

  }

}


// ===============================
// CONTINUE TO MISSION 20
// ===============================

nextBtn.addEventListener("click", () => {

  if (!answerSaved) {

    return;

  }


  window.location.href =
    "Lead20.html";

});
