import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ===============================
// GET HTML ELEMENTS
// ===============================

const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const analysisText = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");


// ===============================
// VARIABLES
// ===============================

let currentUser = null;
let selectedAnswer = "";
let missionCompleted = false;


// ===============================
// CHECK LOGIN
// ===============================

onAuthStateChanged(auth, function (user) {

  if (user) {

    currentUser = user;

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
// OPTION SELECTION
// ===============================

options.forEach(function (option) {

  option.addEventListener("click", function () {

    // Remove previous selection

    options.forEach(function (item) {

      item.classList.remove("active");

    });


    // Highlight selected option

    this.classList.add("active");


    // Get selected answer

    selectedAnswer = this.textContent.trim();


    // Reset progress

    fill.style.width = "0%";


    analysisText.textContent =
      "🤖 AI Leadership Engine is analyzing your decision...";


    // Disable Continue while analyzing

    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";


    // Start progress animation

    setTimeout(function () {

      fill.style.width = "100%";

    }, 100);


    // ===============================
    // ANALYZE + SAVE
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
        "🤖 Recording your leadership decision...";


      try {

        // Save Mission 1

        await setDoc(

          doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            "mission1"
          ),

          {

            missionNumber: 1,

            answer: selectedAnswer,

            completed: true,

            completedAt: new Date().toISOString()

          }

        );


        // ===============================
        // SUCCESS
        // ===============================

        missionCompleted = true;

        analysisText.textContent =
          "✅ Leadership Decision Recorded Successfully";


        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";


      } catch (error) {

        console.error(
          "Lead Mission 1 Firebase Error:",
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


// ===============================
// CONTINUE TO MISSION 2
// ===============================

nextBtn.addEventListener("click", function () {

  if (selectedAnswer === "") {

    alert("Please select an option first.");

    return;

  }


  if (!missionCompleted) {

    alert(
      "Please wait until your leadership decision is saved."
    );

    return;

  }


  window.location.href = "Lead2.html";

});
