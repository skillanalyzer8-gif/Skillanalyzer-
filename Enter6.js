import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startPitch = document.getElementById("startPitch");
const arenaText = document.getElementById("arenaText");
const statusText = document.getElementById("statusText");

let currentUser = null;
let pitchStarted = false;
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
// START INVESTOR PITCH
// ===============================

startPitch.addEventListener("click", function () {

  // ===============================
  // CONTINUE TO MISSION 7
  // ===============================

  if (startPitch.textContent.includes("Continue")) {

    if (!missionCompleted) {

      alert("Please wait until Mission 6 is saved.");

      return;

    }

    window.location.href = "Enter7.html";

    return;

  }


  if (pitchStarted) {
    return;
  }

  pitchStarted = true;

  startPitch.disabled = true;
  startPitch.style.opacity = "0.6";


  // ===============================
  // PITCH STAGE 1
  // ===============================

  statusText.textContent =
    "🎤 Presenting your startup to investors...";

  arenaText.textContent =
    "Explaining the problem and your solution...";


  // ===============================
  // PITCH STAGE 2
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "💼 Investors are evaluating your startup...";

    arenaText.textContent =
      "Demonstrating customer value and growth potential...";

  }, 1500);


  // ===============================
  // PITCH STAGE 3
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "⭐ Investors are impressed!";

    arenaText.textContent =
      "Your startup has gained investor confidence.";

  }, 3000);


  // ===============================
  // PITCH COMPLETE
  // ===============================

  setTimeout(async function () {

    arenaText.textContent =
      "🚀 Investor pitch completed.";

    statusText.textContent =
      "🤖 AI has evaluated your investor presentation.";


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
    // SAVE MISSION 6 TO FIREBASE
    // ===============================

    try {

      await setDoc(
        doc(
          db,
          "users",
          currentUser.uid,
          "missions",
          "mission6"
        ),
        {
          missionNumber: 6,
          answer: "Startup Investor Pitch Completed",
          completed: true,
          completedAt: new Date().toISOString()
        }
     
    )};