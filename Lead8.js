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


// Disable Continue initially
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

    // Reset progress bar
    fill.style.width = "0%";

    analysisText.textContent =
      "🤖 AI Emotional Intelligence Analyzer is analyzing your response...";

    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";


    // Start analysis animation
    setTimeout(() => {

      fill.style.width = "100%";

    }, 100);


    // Save answer after analysis
    setTimeout(async () => {

      if (!currentUser) {

        analysisText.textContent =
          "❌ Login session not found.";

        alert("Please login again.");

        window.location.href = "Login.html";

        return;

      }


      analysisText.textContent =
        "🤖 Recording your emotional-intelligence decision...";


      try {

        await setDoc(
          doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            "mission8"
          ),
          {
            missionNumber: 8,
            answer: selectedAnswer,
            completed: true,
            completedAt: new Date().toISOString()
          }
        );


        // Mission successfully completed
        missionCompleted = true;

        analysisText.textContent =
          "✅ Emotional Intelligence Decision Recorded Successfully";

        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";


      } catch (error) {

        console.error(
          "Lead Mission 8 Firebase Error:",
          error
        );

        analysisText.textContent =
          "❌ Unable to save your decision.";

        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";

      }

    }, 1500);

  });

});


// Continue button
nextBtn.addEventListener("click", () => {

  if (selectedAnswer === "") {

    alert("Please select an option first.");

    return;

  }


  if (!missionCompleted) {

    alert(
      "Please wait until your emotional-intelligence decision is saved."
    );

    return;

  }


  window.location.href = "Lead9.html";

});