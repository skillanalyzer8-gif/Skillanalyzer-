import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startRadar = document.getElementById("startRadar");
const missionText = document.getElementById("missionText");
const statusText = document.getElementById("statusText");

let currentUser = null;
let scanStarted = false;
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

startRadar.disabled = false;


// ===============================
// START CUSTOMER SCAN
// ===============================

startRadar.addEventListener("click", function () {

  if (scanStarted) {
    return;
  }

  scanStarted = true;

  startRadar.disabled = true;
  startRadar.style.opacity = "0.6";

  statusText.textContent =
    "📡 Customer radar scanning...";

  missionText.textContent =
    "Searching for potential customers...";


  // ===============================
  // SCAN STAGE 1
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "🔎 Analysing customer groups...";

    missionText.textContent =
      "Identifying people who may need the product...";

  }, 1500);


  // ===============================
  // SCAN STAGE 2
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "🎯 High-potential customers detected!";

    missionText.textContent =
      "Finding the best target customers...";

  }, 3000);


  // ===============================
  // SCAN COMPLETE
  // ===============================

  setTimeout(async function () {

    statusText.textContent =
      "🤖 Customer analysis complete.";

    missionText.textContent =
      "Your first potential customers have been identified.";


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
    // SAVE MISSION 2
    // ===============================

    try {

      await setDoc(
        doc(
          db,
          "users",
          currentUser.uid,
          "missions",
          "mission2"
        ),
        {
          missionNumber: 2,
          answer: "Customer Radar Scan Completed",
          completed: true,
          completedAt: new Date().toISOString()
        }
      );


      missionCompleted = true;


      statusText.textContent =
        "✅ Mission 2 Completed & Saved Successfully";


      // ===============================
      // ENABLE CONTINUE
      // ===============================

      startRadar.textContent =
        "Continue to Mission 3 →";

      startRadar.disabled = false;
      startRadar.style.opacity = "1";


    } catch (error) {

      console.error("Firebase Error:", error);

      statusText.textContent =
        "❌ Could not save mission. Please try again.";

      startRadar.disabled = false;
      startRadar.style.opacity = "1";

      scanStarted = false;

    }

  }, 4500);

});


// ===============================
// CONTINUE TO MISSION 3
// ===============================

startRadar.addEventListener("click", function () {

  if (startRadar.textContent.includes("Continue")) {

    if (!missionCompleted) {

      alert("Please wait until Mission 2 is saved.");

      return;

    }

    window.location.href = "Enter3.html";

  }

});
