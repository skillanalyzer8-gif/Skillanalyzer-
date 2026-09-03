import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ===============================
// GET HTML ELEMENTS
// ===============================

const startTrading = document.getElementById("startTrading");
const stockPrice = document.getElementById("stockPrice");
const marketText = document.getElementById("marketText");
const statusText = document.getElementById("statusText");


// ===============================
// VARIABLES
// ===============================

let currentUser = null;
let missionCompleted = false;
let started = false;


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
// OPEN MARKET
// ===============================

startTrading.addEventListener("click", function () {

  // If Mission 14 is already completed,
  // continue to Mission 15

  if (missionCompleted) {

    window.location.href = "Enter15.html";

    return;

  }


  // Prevent double clicks

  if (started) {

    return;

  }

  started = true;

  startTrading.disabled = true;

  startTrading.style.opacity = "0.5";


  // ===============================
  // STEP 1 — OPENING MARKET
  // ===============================

  marketText.textContent =
    "📊 Connecting to live market...";

  statusText.textContent =
    "🔄 Preparing trading session...";


  setTimeout(function () {

    // ===============================
    // STEP 2 — MARKET OPENS
    // ===============================

    stockPrice.textContent = "₹105";

    marketText.textContent =
      "📈 Market is now open. Investors are watching.";

    statusText.textContent =
      "🟢 Trading Active";


    setTimeout(async function () {

      // ===============================
      // CHECK LOGIN
      // ===============================

      if (!currentUser) {

        marketText.textContent =
          "❌ Login session not found.";

        statusText.textContent =
          "Please login again.";

        alert("Please login again.");

        window.location.href = "Login.html";

        return;

      }


      // ===============================
      // SAVE MISSION 14
      // ===============================

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

            answer: "Stock Market Trading Session Completed",

            completed: true,

            completedAt: new Date().toISOString()

          }

        );


        // ===============================
        // SUCCESS
        // ===============================

        missionCompleted = true;

        marketText.textContent =
          "✅ Trading session completed successfully.";

        statusText.textContent =
          "🟢 Market Session Recorded";


        startTrading.disabled = false;

        startTrading.style.opacity = "1";

        startTrading.textContent =
          "➡ CONTINUE TO MISSION 15";


      } catch (error) {

        console.error(
          "Mission 14 Firebase Error:",
          error
        );

        marketText.textContent =
          "❌ Unable to save mission.";

        statusText.textContent =
          "Please check your internet connection and try again.";


        startTrading.disabled = false;

        startTrading.style.opacity = "1";

        started = false;

      }

    }, 1200);

  }, 1000);

});
