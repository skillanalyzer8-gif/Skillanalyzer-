None selected 

Skip to content
Using Gmail with screen readers
Enable desktop notifications for Gmail.
   OK  No, thanks
16 of 106
E10
Inbox

Skillanalyzer <skillanalyzer8@gmail.com>
Wed 2 Sept, 07:54 (1 day ago)
to me

import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startPitch = document.getElementById("startPitch");
const pitchText = document.getElementById("pitchText");
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
// START SHARK TANK PITCH
// ===============================

startPitch.addEventListener("click", function () {

  // ===============================
  // CONTINUE TO MISSION 11
  // ===============================

  if (startPitch.textContent.includes("Continue")) {

    if (!missionCompleted) {

      alert("Please wait until Mission 10 is saved.");

      return;

    }

    window.location.href = "Enter11.html";

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
    "🎤 Your startup pitch has started.";

  pitchText.textContent =
    "Presenting your startup idea to the investors...";


  // ===============================
  // PITCH STAGE 2
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "📊 Investors are analysing your business.";

    pitchText.textContent =
      "Explaining your customers, product and growth potential...";

  }, 1500);


  // ===============================
  // PITCH STAGE 3
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "🧠 Investors are evaluating your pitch.";

    pitchText.textContent =
      "Demonstrating why your startup can create real value...";

  }, 3000);


  // ===============================
  // PITCH COMPLETE
  // ===============================

  setTimeout(async function () {

    pitchText.textContent =
      "🚀 Startup pitch successfully completed.";

    statusText.textContent =
      "🤖 AI has completed your investor evaluation.";


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
    // SAVE MISSION 10 TO FIREBASE
    // ===============================

    try {

      await setDoc(
        doc(
          db,
          "users",
          currentUser.uid,
          "missions",
          "mission10"
        ),
        {
          missionNumber: 10,
          answer: "Shark Tank Startup Pitch Completed",
          completed: true,
          completedAt: new Date().toISOString()
        }
      );


      missionCompleted = true;


      statusText.textContent =
        "✅ Mission 10 Completed & Saved Successfully";


      // ===============================
      // ENABLE CONTINUE
      // ===============================

      startPitch.textContent =
        "Continue to Mission 11 →";

      startPitch.disabled = false;
      startPitch.style.opacity = "1";


    } catch (error) {

      console.error("Firebase Error:", error);

      statusText.textContent =
        "❌ Could not save mission. Please try again.";

      startPitch.disabled = false;
      startPitch.style.opacity = "1";

      pitchStarted = false;

    }

  }, 4500);

});
