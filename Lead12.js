import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startMission = document.getElementById("startMission");
const typingText = document.getElementById("typingText");

let currentUser = null;
let missionCompleted = false;


// Check login status
onAuthStateChanged(auth, (user) => {

  if (user) {

    currentUser = user;

  } else {

    alert("Please login first.");
    window.location.href = "Login.html";

  }

});


// Enter the laboratory
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

  typingText.textContent =
    "AI System: Access granted. Recording mission entry...";


  try {

    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        "mission11"
      ),
      {
        missionNumber: 11,
        answer: "Entered the Impossible Machine Laboratory",
        completed: true,
        completedAt: new Date().toISOString()
      }
    );


    missionCompleted = true;

    typingText.textContent =
      "AI System: Mission 11 recorded. Laboratory access granted.";


    // Small delay before entering Mission 12
    setTimeout(() => {

      window.location.href = "Lead12.html";

    }, 1000);


  } catch (error) {

    console.error(
      "Lead Mission 11 Firebase Error:",
      error
    );

    typingText.textContent =
      "❌ Unable to record mission progress. Please try again.";

    startMission.disabled = false;
    startMission.style.opacity = "1";

  }

});