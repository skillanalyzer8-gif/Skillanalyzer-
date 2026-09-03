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

const startInnovation = document.getElementById("startInnovation");
const innovationText = document.getElementById("innovationText");
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
// REVIEW INVENTIONS
// ===============================

startInnovation.addEventListener("click", function () {

  // If Mission 18 is already completed,
  // continue to Mission 19

  if (missionCompleted) {

    window.location.href = "Enter19.html";

    return;

  }


  // Prevent double clicks

  if (started) {

    return;

  }

  started = true;

  startInnovation.disabled = true;

  startInnovation.style.opacity = "0.5";


  // ===============================
  // STEP 1 — COLLECT INVENTIONS
  // ===============================

  innovationText.textContent =
    "🧪 Collecting new inventions from the Innovation Lab...";

  statusText.textContent =
    "🔄 Preparing projects for review...";


  setTimeout(function () {

    // ===============================
    // STEP 2 — AI REVIEW
    // ===============================

    innovationText.textContent =
      "🤖 AI is analyzing the most promising inventions...";

    statusText.textContent =
      "💡 Evaluating innovation, impact and future potential...";


    setTimeout(async function () {

      // ===============================
      // CHECK LOGIN
      // ===============================

      if (!currentUser) {

        innovationText.textContent =
          "❌ Login session not found.";

        statusText.textContent =
          "Please login again.";

        alert("Please login again.");

        window.location.href = "Login.html";

        return;

      }


      // ===============================
      // SAVE MISSION 18
      // ===============================

      try {

        await setDoc(

          doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            "mission18"
          ),

          {

            missionNumber: 18,

            answer: "Innovation Project Review Completed",

            completed: true,

            completedAt: new Date().toISOString()

          }

        );


        // ===============================
        // SUCCESS
        // ===============================

        missionCompleted = true;

        innovationText.textContent =
          "✅ Innovation project review completed successfully.";

        statusText.textContent =
          "🚀 Innovation Status: Review Completed";


        startInnovation.disabled = false;

        startInnovation.style.opacity = "1";

        startInnovation.textContent =
          "➡ CONTINUE TO MISSION 19";


      } catch (error) {

        console.error(
          "Mission 18 Firebase Error:",
          error
        );

        innovationText.textContent =
          "❌ Unable to save mission.";

        statusText.textContent =
          "Please check your internet connection and try again.";


        startInnovation.disabled = false;

        startInnovation.style.opacity = "1";

        started = false;

      }

    }, 1200);

  }, 1000);

});
