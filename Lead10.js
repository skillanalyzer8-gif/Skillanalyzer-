import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const analysisText = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");


let currentUser = null;
let selectedAnswer = "";
let missionCompleted = false;


// Check login status
onAuthStateChanged(auth, (user) => {

  if (user) {

    currentUser = user;

  } else {

    alert("Please login first.");
    window.location.href = "Login.html";

  }

});


// Disable final button initially
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";


// Handle option selection
options.forEach((option) => {

  option.addEventListener("click", function () {

    // Remove previous selection
    options.forEach((item) => {
      item.classList.remove("active");
    });

    // Highlight selected option
    this.classList.add("active");

    // Store exact selected answer
    selectedAnswer = this.textContent.trim();

    // Reset completion state
    missionCompleted = false;

    // Reset progress
    fill.style.width = "0%";

    analysisText.textContent =
      "🤖 AI Leadership Evaluation Engine is analyzing your strategy...";

    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";


    // Start progress animation
    setTimeout(() => {

      fill.style.width = "100%";

    }, 100);


    // Save final mission
    setTimeout(async () => {

      if (!currentUser) {

        analysisText.textContent =
          "❌ Login session not found.";

        alert("Please login again.");

        window.location.href = "Login.html";

        return;

      }


      analysisText.textContent =
        "🤖 Recording your final leadership decision...";


      try {

        // Save Mission 10
        await setDoc(
          doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            "mission10"
          ),
          {
            missionNumber: 10,
            answer: selectedAnswer,
            completed: true,
            completedAt: new Date().toISOString()
          }
        );


        // Mark overall Leadership assessment as completed
        await setDoc(
          doc(db, "users", currentUser.uid),
          {
            assessmentCompleted: true,
            finalCategory: "Leadership",
            finalMission: 10,
            finalAnswer: selectedAnswer,
            completedAt: new Date().toISOString()
          },
          {
            merge: true
          }
        );


        // Mission successfully completed
        missionCompleted = true;

        analysisText.textContent =
          "✅ Final Leadership Decision Recorded Successfully";

        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";


      } catch (error) {

        console.error(
          "Lead Mission 10 Firebase Error:",
          error
        );

        analysisText.textContent =
          "❌ Unable to save your final decision.";

        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";

      }

    }, 1500);

  });

});


// View Final Result
nextBtn.addEventListener("click", () => {

  if (selectedAnswer === "") {

    alert("Please select a strategy first.");

    return;

  }


  if (!missionCompleted) {

    alert(
      "Please wait until your final leadership decision is saved."
    );

    return;

  }


  // Show final result on the same page
  analysisText.textContent =
    "🎉 Leadership Assessment Completed Successfully!";

  nextBtn.textContent = "Assessment Completed ✓";
  nextBtn.disabled = true;
  nextBtn.style.opacity = "0.8";


  // Prevent changing the answer after completion
  options.forEach((option) => {

    option.style.pointerEvents = "none";

  });

});