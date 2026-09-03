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

const startHiring = document.getElementById("startHiring");
const interviewText = document.getElementById("interviewText");
const statusText = document.getElementById("statusText");


// ===============================
// VARIABLES
// ===============================

let currentUser = null;
let missionCompleted = false;
let started = false;


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
// START INTERVIEWS
// ===============================

startHiring.addEventListener("click", function () {

  // If Mission 17 is already completed,
  // continue to Mission 18

  if (missionCompleted) {

    window.location.href = "Enter18.html";

    return;

  }


  // Prevent double clicks

  if (started) {

    return;

  }

  started = true;

  startHiring.disabled = true;

  startHiring.style.opacity = "0.5";


  // ===============================
  // STEP 1 — APPLICATIONS
  // ===============================

  interviewText.textContent =
    "📂 Reviewing hundreds of executive applications...";

  statusText.textContent =
    "🔍 Shortlisting the strongest candidates...";


  setTimeout(function () {

    // ===============================
    // STEP 2 — INTERVIEWS
    // ===============================

    interviewText.textContent =
      "👔 AI is preparing interviews for three exceptional candidates...";

    statusText.textContent =
      "🤖 Evaluating leadership skills, experience and vision...";


    setTimeout(async function () {

      // ===============================
      // CHECK LOGIN
      // ===============================

      if (!currentUser) {

        interviewText.textContent =
          "❌ Login session not found.";

        statusText.textContent =
          "Please login again.";

        alert("Please login again.");

        window.location.href = "Login.html";

        return;

      }


      // ===============================
      // SAVE MISSION 17
      // ===============================

      try {

        await setDoc(

          doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            "mission17"
          ),

          {

            missionNumber: 17,

            answer: "Executive Hiring Decision Completed",

            completed: true,

            completedAt: new Date().toISOString()

          }

        );


        // ===============================
        // SUCCESS
        // ===============================

        missionCompleted = true;

        interviewText.textContent =
          "✅ Executive recruitment process completed successfully.";

        statusText.textContent =
          "👔 Recruitment Status: Hiring Mission Completed";


        startHiring.disabled = false;

        startHiring.style.opacity = "1";

        startHiring.textContent =
          "➡ CONTINUE TO MISSION 18";


      } catch (error) {

        console.error(
          "Mission 17 Firebase Error:",
          error
        );

        interviewText.textContent =
          "❌ Unable to save mission.";

        statusText.textContent =
          "Please check your internet connection and try again.";


        startHiring.disabled = false;

        startHiring.style.opacity = "1";

        started = false;

      }

    }, 1200);

  }, 1000);

});
