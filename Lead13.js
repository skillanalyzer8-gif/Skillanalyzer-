import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const observeBtn = document.getElementById("observeBtn");
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


// Start observation
observeBtn.addEventListener("click", async () => {

  if (!currentUser) {

    alert("Please login first.");
    window.location.href = "Login.html";

    return;

  }


  if (missionCompleted) {

    return;

  }


  // Prevent multiple clicks
  observeBtn.disabled = true;
  observeBtn.style.opacity = "0.6";

  statusText.textContent =
    "🤖 AI is recording your observation session...";


  try {

    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        "mission13"
      ),
      {
        missionNumber: 13,
        answer: "Shadow Leader Observation Started",
        completed: true,
        completedAt: new Date().toISOString()
      }
    );


    missionCompleted = true;

    statusText.textContent =
      "✅ Observation recorded. Proceeding to the next mission...";


    // Continue only after Firebase successfully saves
    setTimeout(() => {

      window.location.href = "Lead14.html";

    }, 1000);


  } catch (error) {

    console.error(
      "Lead Mission 13 Firebase Error:",
      error
    );

    statusText.textContent =
      "❌ Unable to record your mission progress. Please try again.";

    observeBtn.disabled = false;
    observeBtn.style.opacity = "1";

  }

});
