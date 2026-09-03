import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startLab = document.getElementById("startLab");
const machineText = document.getElementById("machineText");
const statusText = document.getElementById("statusText");

let currentUser = null;
let labStarted = false;
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

startLab.disabled = false;


// ===============================
// START PROTOTYPE LAB
// ===============================

startLab.addEventListener("click", function () {

  if (labStarted) {
    return;
  }

  labStarted = true;

  startLab.disabled = true;
  startLab.style.opacity = "0.6";

  statusText.textContent =
    "⚙️ Prototype machine starting...";

  machineText.textContent =
    "Loading startup blueprint...";


  // ===============================
  // BUILDING STAGE 1
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "🧠 Selecting essential features...";

    machineText.textContent =
      "Removing unnecessary features...";

  }, 1500);


  // ===============================
  // BUILDING STAGE 2
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "⚡ Building minimum viable prototype...";

    machineText.textContent =
      "Adding only the features customers need...";

  }, 3000);


  // ===============================
  // BUILD COMPLETE
  // ===============================

  setTimeout(async function () {

    machineText.textContent =
      "🚀 Your startup prototype is ready!";

    statusText.textContent =
      "🤖 Prototype successfully built.";


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
    // SAVE MISSION 3 TO FIREBASE
    // ===============================

    try {

      await setDoc(
        doc(
          db,
          "users",
          currentUser.uid,
          "missions",
          "mission3"
        ),
        {
          missionNumber: 3,
          answer: "AI Prototype Built",
          completed: true,
          completedAt: new Date().toISOString()
        }
      );


      missionCompleted = true;


      statusText.textContent =
        "✅ Mission 3 Completed & Saved Successfully";


      // ===============================
      // ENABLE CONTINUE
      // ===============================

      startLab.textContent =
        "Continue to Mission 4 →";

      startLab.disabled = false;
      startLab.style.opacity = "1";


    } catch (error) {

      console.error("Firebase Error:", error);

      statusText.textContent =
        "❌ Could not save mission. Please try again.";

      startLab.disabled = false;
      startLab.style.opacity = "1";

      labStarted = false;

    }

  }, 4500);

});


// ===============================
// CONTINUE TO MISSION 4
// ===============================

startLab.addEventListener("click", function () {

  if (startLab.textContent.includes("Continue")) {

    if (!missionCompleted) {

      alert("Please wait until Mission 3 is saved.");

      return;

    }

    window.location.href = "Enter4.html";

  }

});
