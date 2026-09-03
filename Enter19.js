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

const startFuture = document.getElementById("startFuture");
const futureText = document.getElementById("futureText");
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
// START FUTURE SUMMIT
// ===============================

startFuture.addEventListener("click", function () {

  // If Mission 19 is already completed,
  // continue to Mission 20

  if (missionCompleted) {

    window.location.href = "Enter20.html";

    return;

  }


  // Prevent double clicks

  if (started) {

    return;

  }

  started = true;

  startFuture.disabled = true;

  startFuture.style.opacity = "0.5";


  // ===============================
  // STEP 1 — SUMMIT BEGINS
  // ===============================

  futureText.textContent =
    "🌍 Gathering governments, scientists and global leaders...";

  statusText.textContent =
    "🔄 Preparing the Future Council...";


  setTimeout(function () {

    // ===============================
    // STEP 2 — FUTURE VISION
    // ===============================

    futureText.textContent =
      "🤖 AI Global Mentor is evaluating the future project opportunities...";

    statusText.textContent =
      "🚀 Analyzing global impact and long-term potential...";


    setTimeout(async function () {

      // ===============================
      // CHECK LOGIN
      // ===============================

      if (!currentUser) {

        futureText.textContent =
          "❌ Login session not found.";

        statusText.textContent =
          "Please login again.";

        alert("Please login again.");

        window.location.href = "Login.html";

        return;

      }


      // ===============================
      // SAVE MISSION 19
      // ===============================

      try {

        await setDoc(

          doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            "mission19"
          ),

          {

            missionNumber: 19,

            answer: "Global Future Summit Completed",

            completed: true,

            completedAt: new Date().toISOString()

          }

        );


        // ===============================
        // SUCCESS
        // ===============================

        missionCompleted = true;

        futureText.textContent =
          "✅ Global Future Summit completed successfully.";

        statusText.textContent =
          "🌍 Global Future Status: Summit Completed";


        startFuture.disabled = false;

        startFuture.style.opacity = "1";

        startFuture.textContent =
          "➡ CONTINUE TO MISSION 20";


      } catch (error) {

        console.error(
          "Mission 19 Firebase Error:",
          error
        );

        futureText.textContent =
          "❌ Unable to save mission.";

        statusText.textContent =
          "Please check your internet connection and try again.";


        startFuture.disabled = false;

        startFuture.style.opacity = "1";

        started = false;

      }

    }, 1200);

  }, 1000);

});
