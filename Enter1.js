import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const activateBtn = document.getElementById("activateScanner");
const scannerCircle = document.getElementById("scannerCircle");
const scannerText = document.getElementById("scannerText");
const statusText = document.getElementById("statusText");

let currentUser = null;
let scannerActivated = false;
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
// ACTIVATE SCANNER
// ===============================

activateBtn.disabled = false;

activateBtn.addEventListener("click", async function () {

  if (scannerActivated) {
    return;
  }

  scannerActivated = true;

  activateBtn.disabled = true;
  activateBtn.style.opacity = "0.6";

  scannerCircle.classList.add("active");

  statusText.textContent =
    "🤖 AI is scanning the city for hidden opportunities...";

  scannerText.textContent =
    "Scanning real-world problems...";


  // ===============================
  // SCANNING ANIMATION
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "🔎 AI detected several customer problems...";

    scannerText.textContent =
      "Customer problems detected.";

  }, 1500);


  setTimeout(function () {

    statusText.textContent =
      "💡 Analysing high-value opportunities...";

    scannerText.textContent =
      "Analysing opportunities...";

  }, 3000);


  setTimeout(async function () {

    statusText.textContent =
      "🚀 Opportunity detected!";

    scannerText.textContent =
      "You discovered a potential opportunity.";

    // ===============================
    // SAVE MISSION 1 TO FIREBASE
    // ===============================

    if (!currentUser) {

      statusText.textContent =
        "❌ Login session not found.";

      alert("Please login again.");

      return;

    }

    try {

      await setDoc(
        doc(
          db,
          "users",
          currentUser.uid,
          "missions",
          "mission1"
        ),
        {
          missionNumber: 1,
          answer: "Opportunity Scanner Activated",
          completed: true,
          completedAt: new Date().toISOString()
        }
      );


      missionCompleted = true;

      statusText.textContent =
        "✅ Mission 1 Completed & Saved Successfully";

      activateBtn.textContent =
        "Continue to Mission 2 →";

      activateBtn.disabled = false;
      activateBtn.style.opacity = "1";


    } catch (error) {

      console.error("Firebase Error:", error);

      statusText.textContent =
        "❌ Could not save mission.";

      activateBtn.disabled = false;
      activateBtn.style.opacity = "1";

    }

  }, 4500);

});


// ===============================
// CONTINUE TO MISSION 2
// ===============================

activateBtn.addEventListener("click", function () {

  if (activateBtn.textContent.includes("Continue")) {

    if (!missionCompleted) {

      alert("Please wait until Mission 1 is saved.");

      return;

    }

    window.location.href = "Enter2.html";

  }

});
