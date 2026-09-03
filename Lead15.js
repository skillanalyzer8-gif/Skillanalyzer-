import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startBtn = document.getElementById("startBtn");
const rewindBtn = document.getElementById("rewindBtn");
const timer = document.getElementById("timer");
const timelineFill = document.getElementById("timelineFill");
const statusText = document.getElementById("statusText");

let currentUser = null;
let missionStarted = false;
let missionCompleted = false;
let timeRemaining = 20;
let timerInterval = null;


// Authentication
onAuthStateChanged(auth, (user) => {

  if (user) {

    currentUser = user;

  } else {

    alert("Please login first.");
    window.location.href = "Login.html";

  }

});


// Start Mission
startBtn.addEventListener("click", () => {

  if (!currentUser) {

    alert("Please login first.");
    window.location.href = "Login.html";

    return;

  }

  if (missionStarted || missionCompleted) {

    return;

  }

  missionStarted = true;

  startBtn.disabled = true;
  startBtn.style.opacity = "0.6";

  statusText.textContent =
    "⚠ Timeline active... Choose your rewind wisely.";

  timerInterval = setInterval(() => {

    if (timeRemaining > 0) {

      timeRemaining--;

      timer.textContent = timeRemaining;

      const percentage =
        (timeRemaining / 20) * 100;

      timelineFill.style.width =
        percentage + "%";

    } else {

      clearInterval(timerInterval);

      statusText.textContent =
        "⏰ Time expired. Timeline can no longer be changed.";

      completeMission();

    }

  }, 1000);

});


// Rewind 5 seconds
rewindBtn.addEventListener("click", () => {

  if (!missionStarted || missionCompleted) {

    return;

  }

  if (timeRemaining <= 0) {

    return;

  }

  timeRemaining = Math.max(
    0,
    timeRemaining - 5
  );

  timer.textContent = timeRemaining;

  const percentage =
    (timeRemaining / 20) * 100;

  timelineFill.style.width =
    percentage + "%";

  statusText.textContent =
    "⏪ Timeline rewound by 5 seconds.";

  if (timeRemaining === 0) {

    clearInterval(timerInterval);

    completeMission();

  }

});


// Save Mission 15
async function completeMission() {

  if (missionCompleted) {

    return;

  }

  missionCompleted = true;

  clearInterval(timerInterval);

  startBtn.disabled = true;
  rewindBtn.disabled = true;

  statusText.textContent =
    "🤖 Recording your Time Fracture decision...";


  try {

    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        "mission15"
      ),
      {
        missionNumber: 15,
        answer: "Time Fracture Mission Completed",
        completed: true,
        completedAt: new Date().toISOString()
      }
    );


    statusText.textContent =
      "✅ Mission 15 completed successfully!";

    setTimeout(() => {

      window.location.href = "Lead16.html";

    }, 1000);


  } catch (error) {

    console.error(
      "Lead15 Firebase Error:",
      error
    );

    missionCompleted = false;

    startBtn.disabled = false;
    rewindBtn.disabled = false;

    statusText.textContent =
      "❌ Could not save mission progress. Please try again.";

  }

}
