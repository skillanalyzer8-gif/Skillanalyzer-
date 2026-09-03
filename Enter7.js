import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startHiring = document.getElementById("startHiring");
const officeText = document.getElementById("officeText");
const statusText = document.getElementById("statusText");

let currentUser = null;
let hiringStarted = false;
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
// START HIRING
// ===============================

startHiring.addEventListener("click", function () {

  // ===============================
  // CONTINUE TO MISSION 8
  // ===============================

  if (startHiring.textContent.includes("Continue")) {

    if (!missionCompleted) {

      alert("Please wait until Mission 7 is saved.");

      return;

    }

    window.location.href = "Enter8.html";

    return;

  }


  if (hiringStarted) {
    return;
  }

  hiringStarted = true;

  startHiring.disabled = true;
  startHiring.style.opacity = "0.6";


  // ===============================
  // HIRING STAGE 1
  // ===============================

  statusText.textContent =
    "🔎 Searching for the right talent...";

  officeText.textContent =
    "Reviewing potential team members...";


  // ===============================
  // HIRING STAGE 2
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "👥 Evaluating candidate strengths...";

    officeText.textContent =
      "Matching skills with startup needs...";

  }, 1500);


  // ===============================
  // HIRING STAGE 3
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "⭐ Strong team members identified!";

    officeText.textContent =
      "Your first team is ready to join the startup.";

  }, 3000);


  // ===============================
  // HIRING COMPLETE
  // ===============================

  setTimeout(async function () {

    officeText.textContent =
      "🚀 Your startup team has been formed.";

    statusText.textContent =
      "🤖 AI has evaluated your hiring decision.";


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
    // SAVE MISSION 7 TO FIREBASE
    // ===============================

    try {

      await setDoc(
        doc(
          db,
          "users",
          currentUser.uid,
          "missions",
          "mission7"
        ),
        {
          missionNumber: 7,
          answer: "First Startup Team Hired",
          completed: true,
          completedAt: new Date().toISOString()
        }
      );


      missionCompleted = true;


      statusText.textContent =
        "✅ Mission 7 Completed & Saved Successfully";


      // ===============================
      // ENABLE CONTINUE
      // ===============================

      startHiring.textContent =
        "Continue to Mission 8 →";

      startHiring.disabled = false;
      startHiring.style.opacity = "1";


    } catch (error) {

      console.error("Firebase Error:", error);

      statusText.textContent =
        "❌ Could not save mission. Please try again.";

      startHiring.disabled = false;
      startHiring.style.opacity = "1";

      hiringStarted = false;

    }

  }, 4500);

});
