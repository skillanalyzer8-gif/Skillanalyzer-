import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// DOM elements
const startMission = document.getElementById("startMission");
const resourceFill = document.getElementById("resourceFill");
const resourceText = document.getElementById("resourceText");
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


// Start Operation
startMission.addEventListener("click", async () => {

  if (!currentUser) {

    alert("Please login first.");
    window.location.href = "Login.html";

    return;

  }

  if (missionCompleted) {

    return;

  }


  startMission.disabled = true;
  startMission.style.opacity = "0.6";

  statusText.textContent =
    "🚨 Command Center activated. AI is analyzing your emergency priorities...";


  // Resource analysis animation
  let resource = 100;

  resourceFill.style.width = "100%";
  resourceText.textContent = "100%";


  const resourceInterval = setInterval(() => {

    resource -= 10;

    if (resource < 0) {
      resource = 0;
    }

    resourceFill.style.width =
      resource + "%";

    resourceText.textContent =
      resource + "%";


    if (resource <= 0) {

      clearInterval(resourceInterval);

    }

  }, 150);


  try {

    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        "mission19"
      ),
      {
        missionNumber: 19,

        answer: "Crisis Commander Mission Completed",

        completed: true,

        completedAt: new Date().toISOString()
      }
    );


    clearInterval(resourceInterval);

    missionCompleted = true;

    statusText.textContent =
      "✅ Emergency operation recorded. Mission 19 completed!";

    setTimeout(() => {

      window.location.href = "Lead20.html";

    }, 1200);


  } catch (error) {

    console.error(
      "Lead19 Firebase Error:",
      error
    );

    clearInterval(resourceInterval);

    startMission.disabled = false;
    startMission.style.opacity = "1";

    resourceFill.style.width = "100%";
    resourceText.textContent = "100%";

    statusText.textContent =
      "❌ Could not save mission progress. Please try again.";

  }

});
