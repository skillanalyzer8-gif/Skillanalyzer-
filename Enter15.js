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

const startImpact = document.getElementById("startImpact");
const impactText = document.getElementById("impactText");
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
// BUILD YOUR LEGACY
// ===============================

startImpact.addEventListener("click", function () {

  // If mission is already completed,
  // continue to Mission 16

  if (missionCompleted) {

    window.location.href = "Enter16.html";

    return;

  }


  // Prevent double clicks

  if (started) {

    return;

  }

  started = true;

  startImpact.disabled = true;

  startImpact.style.opacity = "0.5";


  // ===============================
  // STEP 1
  // ===============================

  impactText.textContent =
    "🌍 Analyzing global impact opportunities...";

  statusText.textContent =
    "🤖 AI is evaluating your company's potential impact...";


  setTimeout(function () {

    // ===============================
    // STEP 2
    // ===============================

    impactText.textContent =
      "✨ Your vision could improve millions of lives.";

    statusText.textContent =
      "🌎 Building a meaningful company legacy...";


    setTimeout(async function () {

      // ===============================
      // CHECK LOGIN
      // ===============================

      if (!currentUser) {

        impactText.textContent =
          "❌ Login session not found.";

        statusText.textContent =
          "Please login again.";

        alert("Please login again.");

        window.location.href = "Login.html";

        return;

      }


      // ===============================
      // SAVE MISSION 15
      // ===============================

      try {

        await setDoc(

          doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            "mission15"
          ),

          {

            missionNumber: 15,

            answer: "Global Impact Legacy Completed",

            completed: true,

            completedAt: new Date().toISOString()

          }

        );


        // ===============================
        // SUCCESS
        // ===============================

        missionCompleted = true;

        impactText.textContent =
          "✅ Your global impact vision has been recorded.";

        statusText.textContent =
          "🌍 Company Legacy: Impact Mission Completed";


        startImpact.disabled = false;

        startImpact.style.opacity = "1";

        startImpact.textContent =
          "➡ CONTINUE TO MISSION 16";


      } catch (error) {

        console.error(
          "Mission 15 Firebase Error:",
          error
        );

        impactText.textContent =
          "❌ Unable to save mission.";

        statusText.textContent =
          "Please check your internet connection and try again.";


        startImpact.disabled = false;

        startImpact.style.opacity = "1";

        started = false;

      }

    }, 1200);

  }, 1000);

});
