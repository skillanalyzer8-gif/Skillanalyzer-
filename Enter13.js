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

const startDay = document.getElementById("startDay");
const dashboardText = document.getElementById("dashboardText");
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
// START BUSINESS DAY
// ===============================

startDay.addEventListener("click", function () {

  // If already completed,
  // continue to Mission 14

  if (missionCompleted) {

    window.location.href = "Enter14.html";

    return;

  }


  // Prevent double click

  if (started) {

    return;

  }

  started = true;

  startDay.disabled = true;

  startDay.style.opacity = "0.5";


  // ===============================
  // STEP 1
  // ===============================

  dashboardText.textContent =
    "📊 Loading today's company reports...";

  statusText.textContent =
    "🔄 Collecting department updates...";


  setTimeout(function () {

    // ===============================
    // STEP 2
    // ===============================

    dashboardText.textContent =
      "🤖 AI is analyzing four emergency reports...";

    statusText.textContent =
      "⚠ Multiple business issues detected...";


    setTimeout(async function () {

      // ===============================
      // CHECK LOGIN
      // ===============================

      if (!currentUser) {

        dashboardText.textContent =
          "❌ Login session not found.";

        statusText.textContent =
          "Please login again.";

        alert("Please login again.");

        window.location.href = "Login.html";

        return;

      }


      // ===============================
      // SAVE MISSION 13
      // ===============================

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

            answer: "CEO Business Day Completed",

            completed: true,

            completedAt: new Date().toISOString()

          }

        );


        // ===============================
        // SUCCESS
        // ===============================

        missionCompleted = true;

        dashboardText.textContent =
          "✅ Today's company reports analyzed successfully.";

        statusText.textContent =
          "👨‍💼 CEO Status: Business Day Completed";


        startDay.disabled = false;

        startDay.style.opacity = "1";

        startDay.textContent =
          "➡ CONTINUE TO MISSION 14";


      } catch (error) {

        console.error(
         
