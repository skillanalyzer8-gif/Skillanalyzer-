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

const startDefense = document.getElementById("startDefense");
const defenseText = document.getElementById("defenseText");
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
// START DEFENSE
// ===============================

startDefense.addEventListener("click", async function () {

  // If mission is already completed,
  // go to Mission 13

  if (missionCompleted) {

    window.location.href = "Enter13.html";

    return;

  }


  // Prevent accidental double clicks

  if (started) {

    return;

  }

  started = true;

  startDefense.disabled = true;

  startDefense.style.opacity = "0.5";

  defenseText.textContent =
    "🛡 Activating startup defense systems...";

  statusText.textContent =
    "🔍 Analyzing competitor activity...";


  // Small animation delay

  setTimeout(async function () {

    defenseText.textContent =
      "🤖 AI is identifying the most important threats...";

    statusText.textContent =
      "⚡ Prioritizing critical business risks...";


    setTimeout(async function () {

      // ===============================
      // CHECK USER AGAIN
      // ===============================

      if (!currentUser) {

        defenseText.textContent =
          "❌ Login session not found.";

        statusText.textContent =
          "Please login again.";

        alert("Please login again.");

        window.location.href = "Login.html";

        return;

      }


      // ===============================
      // SAVE TO FIREBASE
      // ===============================

      try {

        await setDoc(

          doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            "mission12"
          ),

          {

            missionNumber: 12,

            answer: "Startup Defense Strategy Completed",

            completed: true,

            completedAt: new Date().toISOString()

          }

        );


        // ===============================
        // SUCCESS
        // ===============================

        missionCompleted = true;

        defenseText.textContent =
          "✅ Startup Defense Strategy Completed";

        statusText.textContent =
          "🛡 Your startup defense system is active.";


        startDefense.disabled = false;

        startDefense.style.opacity = "1";

        startDefense.textContent =
          "➡ CONTINUE TO MISSION 13";


      } catch (error) {

        console.error(
          "Mission 12 Firebase Error:",
          error
        );

        defenseText.textContent =
          "❌ Unable to save your mission.";

        statusText.textContent =
          "Please check your connection and try again.";

        startDefense.disabled = false;

        startDefense.style.opacity = "1";

        started = false;

      }

    }, 1200);

  }, 1000);

});
