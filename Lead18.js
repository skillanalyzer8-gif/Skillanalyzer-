import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// DOM elements
const startAI = document.getElementById("startAI");
const growthFill = document.getElementById("growthFill");
const growthText = document.getElementById("growthText");
const statusText = document.getElementById("statusText");
const aiCore = document.getElementById("aiCore");

let currentUser = null;
let missionCompleted = false;


// Authentication
onAuthStateChanged(auth, (user) => {

  if (user) {

    currentUser = user;

  } else {

    alert("Please login first.");
    window.location.href = "Login.html";

  }

});


// Initialize AI
startAI.addEventListener("click", async () => {

  if (!currentUser) {

    alert("Please login first.");
    window.location.href = "Login.html";

    return;

  }

  if (missionCompleted) {

    return;

  }

  startAI.disabled = true;
  startAI.style.opacity = "0.6";

  statusText.textContent =
    "🤖 AI Core awakening... Personality development in progress.";

  growthFill.style.width = "0%";
  growthText.textContent = "0%";


  // Personality growth animation
  let growth = 0;

  const growthInterval = setInterval(() => {

    growth += 10;

    growthFill.style.width =
      growth + "%";

    growthText.textContent =
      growth + "%";

    if (growth >= 100) {

      clearInterval(growthInterval);

    }

  }, 150);


  try {

    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        "mission18"
      ),
      {
        missionNumber: 18,

        answer: "AI Evolution Mission Completed",

        completed: true,

        completedAt: new Date().toISOString()
      }
    );


    clearInterval(growthInterval);

    growthFill.style.width = "100%";
    growthText.textContent = "100%";

    missionCompleted = true;

    statusText.textContent =
      "✅ AI Core initialized successfully. Mission 18 completed!";

    setTimeout(() => {

      window.location.href = "Lead19.html";

    }, 1200);


  } catch (error) {

    console.error(
      "Lead18 Firebase Error:",
      error
    );

    clearInterval(growthInterval);

    startAI.disabled = false;
    startAI.style.opacity = "1";

    statusText.textContent =
      "❌ Could not save mission progress. Please try again.";

  }

});
