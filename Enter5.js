import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startAnalysis = document.getElementById("startAnalysis");
const marketText = document.getElementById("marketText");
const statusText = document.getElementById("statusText");

let currentUser = null;
let analysisStarted = false;
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
// START MARKET ANALYSIS
// ===============================

startAnalysis.addEventListener("click", function () {

  // ===============================
  // CONTINUE TO MISSION 6
  // ===============================

  if (startAnalysis.textContent.includes("Continue")) {

    if (!missionCompleted) {

      alert("Please wait until Mission 5 is saved.");

      return;

    }

    window.location.href = "Enter6.html";

    return;

  }


  if (analysisStarted) {
    return;
  }

  analysisStarted = true;

  startAnalysis.disabled = true;
  startAnalysis.style.opacity = "0.6";


  // ===============================
  // ANALYSIS STAGE 1
  // ===============================

  statusText.textContent =
    "📊 AI is analysing customer behaviour...";

  marketText.textContent =
    "Collecting market data...";


  // ===============================
  // ANALYSIS STAGE 2
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "🔎 Identifying customer pain points...";

    marketText.textContent =
      "Finding the improvements customers value most...";

  }, 1500);


  // ===============================
  // ANALYSIS STAGE 3
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "📈 High-impact improvement detected!";

    marketText.textContent =
      "The simulator has identified the strongest product improvement.";

  }, 3000);


  // ===============================
  // ANALYSIS COMPLETE
  // ===============================

  setTimeout(async function () {

    marketText.textContent =
      "🚀 Product–Market Fit analysis completed.";

    statusText.textContent =
      "🤖 AI has completed the market analysis.";


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
    // SAVE MISSION 5 TO FIREBASE
    // ===============================

    try {

      await setDoc(
        doc(
          db,
          "users",
          currentUser.uid,
          "missions",
          "mission5"
        ),
        {
          missionNumber: 5,
          answer: "Product–Market Fit Analysis Completed",
          completed: true,
          completedAt: new Date().toISOString()
        }
      );


      missionCompleted = true;


      statusText.textContent =
        "✅ Mission 5 Completed & Saved Successfully";


      // ===============================
      // ENABLE CONTINUE
      // ===============================

      startAnalysis.textContent =
        "Continue to Mission 6 →";

      startAnalysis.disabled = false;
      startAnalysis.style.opacity = "1";


    } catch (error) {

      console.error("Firebase Error:", error);

      statusText.textContent =
        "❌ Could not save mission. Please try again.";

      startAnalysis.disabled = false;
      startAnalysis.style.opacity = "1";

      analysisStarted = false;

    }

  }, 4500);

});
