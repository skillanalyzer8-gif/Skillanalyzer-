import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startTesting = document.getElementById("startTesting");
const labText = document.getElementById("labText");
const statusText = document.getElementById("statusText");

let currentUser = null;
let testingStarted = false;
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
// INITIAL BUTTON STATE
// ===============================

startTesting.disabled = false;


// ===============================
// START CUSTOMER TESTING
// ===============================

startTesting.addEventListener("click", function () {

  // If this is the Continue button
  if (startTesting.textContent.includes("Continue")) {

    if (!missionCompleted) {

      alert("Please wait until Mission 4 is saved.");

      return;

    }

    window.location.href = "Enter5.html";

    return;

  }


  if (testingStarted) {
    return;
  }

  testingStarted = true;

  startTesting.disabled = true;
  startTesting.style.opacity = "0.6";

  statusText.textContent =
    "📱 Customer is testing the prototype...";

  labText.textContent =
    "Waiting for customer feedback...";


  // ===============================
  // TESTING STAGE 1
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "👤 First customer is using the prototype...";

    labText.textContent =
      "Customer is exploring the product...";

  }, 1500);


  // ===============================
  // TESTING STAGE 2
  // ===============================

  setTimeout(function () {

    statusText.textContent =
      "💬 Customer feedback received!";

    labText.textContent =
      "Customer found some areas that could be improved.";

  }, 3000);


  // ===============================
  // TEST COMPLETE
  // ===============================

  setTimeout(async function () {

    labText.textContent =
      "⭐ Customer testing completed.";

    statusText.textContent =
      "🤖 AI has recorded the customer feedback.";


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
    // SAVE MISSION 4 TO FIREBASE
    // ===============================

    try {

      await setDoc(
        doc(
          db,
          "users",
          currentUser.uid,
          "missions",
          "mission4"
        ),
        {
          missionNumber: 4,
          answer: "
        