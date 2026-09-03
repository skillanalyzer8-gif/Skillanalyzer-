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

const startCrisis = document.getElementById("startCrisis");
const newsText = document.getElementById("newsText");
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
// HANDLE CRISIS
// ===============================

startCrisis.addEventListener("click", function () {

  // If mission is already completed,
  // continue to Mission 17

  if (missionCompleted) {

    window.location.href = "Enter17.html";

    return;

  }


  // Prevent double clicks

  if (started) {

    return;

  }

  started = true;

  startCrisis.disabled = true;

  startCrisis.style.opacity = "0.5";


  // ===============================
  // STEP 1 — EMERGENCY REPORT
  // ===============================

  newsText.textContent =
    "🚨 Gathering reports from global business networks...";

  statusText.textContent =
    "🔄 Assessing the impact on customers, employees and investors...";


  setTimeout(function () {

    // ===============================
    // STEP 2 — AI ANALYSIS
    // ===============================

    newsText.textContent =
      "🤖 AI is analyzing the global business crisis...";

    statusText.textContent =
      "⚠ Preparing the company's emergency response...";


    setTimeout(async function () {

      // ===============================
      // CHECK LOGIN
      // ===============================

      if (!currentUser) {

        newsText.textContent =
          "❌ Login session not found.";

        statusText.textContent =
          "Please login again.";

        alert("Please login again.");

        window.location.href = "Login.html";

        return;

      }


      // ===============================
      // SAVE MISSION 16
      // ===============================

      try {

        await setDoc(

          doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            "mission16"
          ),

          {

            missionNumber: 16,

            answer: "Global Business Crisis Response Completed",

            completed: true,

            completedAt: new Date().toISOString()

          }

        );


        // ===============================
        // SUCCESS
        // ===============================

        missionCompleted = true;

        newsText.textContent =
          "✅ Global crisis response successfully completed.";

        statusText.textContent =
          "🌍 Company Response: Crisis Management Completed";


        startCrisis.disabled = false;

        startCrisis.style.opacity = "1";

        startCrisis.textContent =
          "➡ CONTINUE TO MISSION 17";


      } catch (error) {

        console.error(
          "Mission 16 Firebase Error:",
          error
        );

        newsText.textContent =
          "❌ Unable to save mission.";

        statusText.textContent =
          "Please check your internet connection and try again.";


        startCrisis.disabled = false;

        startCrisis.style.opacity = "1";

        started = false;

      }

    }, 1200);

  }, 1000);

});
