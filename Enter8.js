import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startCrisis = document.getElementById("startCrisis");
const crisisText = document.getElementById("crisisText");
const statusText = document.getElementById("statusText");

let currentUser = null;
let crisisStarted = false;
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
// HANDLE CRISIS
// ===============================

startCrisis.addEventListener("click", function () {

  // ===============================
  // CONTINUE TO MISSION 9
  // ===============================

  if (startCrisis.textContent.includes("Continue")) {

    if (!missionCompleted) {

      alert("Please wait until Mission 8 is saved.");

      return;

    }

    window.location.href = "Enter9.html";

    return;

  }


  if (crisisStarted) {
    return;
  }

  crisisStarted = true;

  startCrisis.disabled = true;
  startCrisis.style.opacity = "0.6";


  // ===============================
  // CRISIS STAGE 1
  // ===============================

  statusText.textContent =
    "🚨 Emergency detected!";

  crisisText.textContent =
    "Multiple startup systems are reporting problems...";


  // ===============================
  // CRISIS STAGE 2
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "🔎 Analysing the situation...";

    crisisText.textContent =
      "AI is identifying the most critical issues...";

  }, 1500);


  // ===============================
  // CRISIS STAGE 3
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "🧠 Prioritising critical problems...";

    crisisText.textContent =
      "The most urgent issues require immediate attention.";

  }, 3000);


  // ===============================
  // CRISIS COMPLETE
  // ===============================

  setTimeout(async function () {

    crisisText.textContent =
      "🚀 Crisis response completed.";

    statusText.textContent =
      "🤖 AI has evaluated your crisis-management decision.";


    // ===============================
    // CHECK USER SESSION
    // ===============================

    if (!currentUser) {

      statusText.textContent =
        "❌ Login session not found.";

      alert("Please login again.");

      return;

    }


    // ===============================
    // SAVE MISSION 8 TO FIREBASE
    // ===============================

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
          answer: "Startup Crisis Handled",
          completed: true,
          completedAt: new Date().toISOString()
        }
      );


      missionCompleted = true;


      statusText.textContent =
        "✅ Mission 8 Completed & Saved Successfully";


      // ===============================
      // ENABLE CONTINUE
      // ===============================

      startCrisis.textContent =
        "Continue to Mission 9 →";

      startCrisis.disabled = false;
      startCrisis.style.opacity = "1";


    } catch (error) {

      console.error("Firebase Error:", error);

      statusText.textContent =
        "❌ Could not save mission. Please try again.";

      startCrisis.disabled = false;
      startCrisis.style.opacity = "1";

      crisisStarted = false;

    }

  }, 4500);

});
