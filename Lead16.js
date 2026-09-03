import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startDream = document.getElementById("startDream");
const statusText = document.getElementById("statusText");

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


// Enter Dream
startDream.addEventListener("click", async () => {

  if (!currentUser) {

    alert("Please login first.");
    window.location.href = "Login.html";

    return;

  }

  if (missionCompleted) {

    return;

  }

  startDream.disabled = true;
  startDream.style.opacity = "0.6";

  statusText.textContent =
    "💜 AI Dream Engine is analyzing the emotional islands...";


  try {

    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        "mission16"
      ),
      {
        missionNumber: 16,
        answer: "Dream Architect Mission Completed",
        completed: true,
        completedAt: new Date().toISOString()
      }
    );


    missionCompleted = true;

    statusText.textContent =
      "✅ Dream harmony restored. Mission 16 completed!";

    setTimeout(() => {

      window.location.href = "Lead17.html";

    }, 1000);


  } catch (error) {

    console.error(
      "Lead16 Firebase Error:",
      error
    );

    startDream.disabled = false;
    startDream.style.opacity = "1";

    statusText.textContent =
      "❌ Could not save mission progress. Please try again.";

  }

});
