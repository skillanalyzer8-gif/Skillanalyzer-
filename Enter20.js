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

const beginLegacy = document.getElementById("beginLegacy");
const legacyText = document.getElementById("legacyText");
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
// BEGIN FINAL DECISION
// ===============================

beginLegacy.addEventListener("click", function () {

  // Prevent another run after completion

  if (missionCompleted) {

    return;

  }


  // Prevent double clicks

  if (started) {

    return;

  }

  started = true;

  beginLegacy.disabled = true;

  beginLegacy.style.opacity = "0.5";


  // ===============================
  // STEP 1 — FINAL CHAMBER
  // ===============================

  legacyText.textContent =
    "🌍 The Legacy Council is gathering...";

  statusText.textContent =
    "🔄 Preparing your final entrepreneurship evaluation...";


  setTimeout(function () {

    // ===============================
    // STEP 2 — FINAL ANALYSIS
    // ===============================

    legacyText.textContent =
      "🤖 AI Global Council is reviewing your journey through 20 missions...";

    statusText.textContent =
      "👑 Evaluating your entrepreneurship mindset...";


    setTimeout(function () {

      // ===============================
      // STEP 3 — FINAL DECISION
      // ===============================

      legacyText.textContent =
        "✨ Your entrepreneurial journey has reached its final stage.";

      statusText.textContent =
        "🌟 Generating your final entrepreneurship result...";


      setTimeout(async function () {

        // ===============================
        // CHECK LOGIN
        // ===============================

        if (!currentUser) {

          legacyText.textContent =
            "❌ Login session not found.";

          statusText.textContent =
            "Please login again.";

          alert("Please login again.");

          window.location.href = "Login.html";

          return;

        }


        // ===============================
        // SAVE MISSION 20
        // ===============================

        try {

          await setDoc(

            doc(
              db,
              "users",
              currentUser.uid,
              "missions",
              "mission20"
            ),

            {

              missionNumber: 20,

              answer: "Final Entrepreneurship Legacy Completed",

              completed: true,

              completedAt: new Date().toISOString()

            }

          );


          // ===============================
          // MARK ASSESSMENT COMPLETED
          // ===============================

          await setDoc(

            doc(
              db,
              "users",
              currentUser.uid
            ),

            {

              assessmentCompleted: true,

              finalCategory: "Entrepreneurship",

              finalMission: 20,

              finalAnswer:
                "Final Entrepreneurship Legacy Completed",

              assessmentCompletedAt:
                new Date().toISOString()

            },

            { merge: true }

          );


          // ===============================
          // FINAL SUCCESS
          // ===============================

          missionCompleted = true;

          legacyText.textContent =
            "🏆 Your Entrepreneurship Journey Is Complete!";

          statusText.textContent =
            "👑 FINAL LEGACY RECORDED SUCCESSFULLY";


          beginLegacy.disabled = true;

          beginLegacy.style.opacity = "1";

          beginLegacy.textContent =
            "🎉 ENTREPRENEURSHIP COMPLETED";


        } catch (error) {

          console.error(
            "Mission 20 Firebase Error:",
            error
          );

          legacyText.textContent =
            "❌ Unable to save your final mission.";

          statusText.textContent =
            "Please check your internet connection and try again.";


          beginLegacy.disabled = false;

          beginLegacy.style.opacity = "1";

          started = false;

        }

      }, 1200);

    }, 1200);

  }, 1200);

});
