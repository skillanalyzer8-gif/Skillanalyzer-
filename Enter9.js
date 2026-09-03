import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startMeeting = document.getElementById("startMeeting");
const meetingText = document.getElementById("meetingText");
const statusText = document.getElementById("statusText");

let currentUser = null;
let meetingStarted = false;
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
// START CLIENT MEETING
// ===============================

startMeeting.addEventListener("click", function () {

  // ===============================
  // CONTINUE TO MISSION 10
  // ===============================

  if (startMeeting.textContent.includes("Continue")) {

    if (!missionCompleted) {

      alert("Please wait until Mission 9 is saved.");

      return;

    }

    window.location.href = "Enter10.html";

    return;

  }


  if (meetingStarted) {
    return;
  }

  meetingStarted = true;

  startMeeting.disabled = true;
  startMeeting.style.opacity = "0.6";


  // ===============================
  // MEETING STAGE 1
  // ===============================

  statusText.textContent =
    "🤝 Client meeting started.";

  meetingText.textContent =
    "The client is explaining their software requirements...";


  // ===============================
  // MEETING STAGE 2
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "💬 Discussing requirements and expectations...";

    meetingText.textContent =
      "The client has a limited budget but high expectations.";

  }, 1500);


  // ===============================
  // MEETING STAGE 3
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "🧠 Negotiating a balanced solution...";

    meetingText.textContent =
      "Finding a solution that provides value for both sides...";

  }, 3000);


  // ===============================
  // MEETING COMPLETE
  // ===============================

  setTimeout(async function () {

    meetingText.textContent =
      "🚀 Client negotiation completed.";

    statusText.textContent =
      "🤖 AI has evaluated your negotiation approach.";


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
    // SAVE MISSION 9 TO FIREBASE
    // ===============================

    try {

      await setDoc(
        doc(
          db,
          "users",
          currentUser.uid,
          "missions",
          "mission9"
        ),
        {
          missionNumber: 9,
          answer: "Client Negotiation Completed",
          completed: true,
          completedAt: new Date().toISOString()
        }
      );


      missionCompleted = true;


      statusText.textContent =
        "✅ Mission 9 Completed & Saved Successfully";


      // ===============================
      // ENABLE CONTINUE
      // ===============================

      startMeeting.textContent =
        "Continue to Mission 10 →";

      startMeeting.disabled = false;
      startMeeting.style.opacity = "1";


    } catch (error) {

      console.error("Firebase Error:", error);

      statusText.textContent =
        "❌ Could not save mission. Please try again.";

      startMeeting.disabled = false;
      startMeeting.style.opacity = "1";

      meetingStarted = false;

    }

  }, 4500);

});
