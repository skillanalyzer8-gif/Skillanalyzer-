import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startMission = document.getElementById("startMission");
const statusText = document.getElementById("statusText");

let currentUser = null;
let missionCompleted = false;


// Check authentication
onAuthStateChanged(auth, (user) => {

  if (user) {

    currentUser = user;

  } else {

    alert("Please login first.");
    window.location.href = "Login.html";

  }

});


// Activate Gravity Core
startMission.addEventListener("click", async () => {

  if (!currentUser) {

    alert("Please login first.");
    window.location.href = "Login.html";

    return;

  }


  if (missionCompleted) {

    return;

  }


  // Prevent multiple clicks
  startMission.disabled = true;
  startMission.style.opacity = "0.6";

  statusText.textContent =
    "🤖 AI is recording your Gravity Room mission...";


  try {

    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        "mission14"
      ),
      {
        missionNumber: 14,
        answer: "Gravity Core Activation Started",
        completed: true,
        completedAt: new Date().toISOString()
      }
    );


    missionCompleted = true;

    statusText.textContent =
      "✅ Gravity Core Mission Recorded. Proceeding to the next mission...";


    // Continue only after Firebase saves successfully
    setTimeout(() => {

      window.location.href = "Lead15.html";

    }, 1000);


  } catch (error) {

    console.error(
      "Lead Mission 14 Firebase Error:",
      error
    );

    statusText.textContent =
      "❌ Unable to record your mission progress. Please try again.";

    startMission.disabled = false;
    startMission.style.opacity = "1";

  }

});
