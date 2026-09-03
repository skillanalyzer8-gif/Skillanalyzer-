import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// DOM elements
const healthFill = document.getElementById("healthFill");
const healthText = document.getElementById("healthText");

const natureValue = document.getElementById("natureValue");
const economyValue = document.getElementById("economyValue");
const happyValue = document.getElementById("happyValue");
const waterValue = document.getElementById("waterValue");

const turns = document.getElementById("turns");
const statusText = document.getElementById("statusText");

const forestBtn = document.getElementById("forestBtn");
const riverBtn = document.getElementById("riverBtn");
const pollinatorBtn = document.getElementById("pollinatorBtn");
const wildlifeBtn = document.getElementById("wildlifeBtn");
const industryBtn = document.getElementById("industryBtn");


let currentUser = null;
let missionCompleted = false;

let turnCount = 5;

let nature = 50;
let economy = 50;
let happiness = 50;
let water = 50;

let decisions = [];


// Authentication
onAuthStateChanged(auth, (user) => {

  if (user) {

    currentUser = user;

  } else {

    alert("Please login first.");
    window.location.href = "Login.html";

  }

});


// Update the UI
function updateUI() {

  nature = Math.max(0, Math.min(100, nature));
  economy = Math.max(0, Math.min(100, economy));
  happiness = Math.max(0, Math.min(100, happiness));
  water = Math.max(0, Math.min(100, water));

  const ecosystemHealth =
    Math.round(
      (nature + economy + happiness + water) / 4
    );

  natureValue.textContent = nature;
  economyValue.textContent = economy;
  happyValue.textContent = happiness;
  waterValue.textContent = water;

  turns.textContent = turnCount;

  healthText.textContent =
    ecosystemHealth + "%";

  healthFill.style.width =
    ecosystemHealth + "%";
}


// Disable all action buttons
function disableButtons() {

  forestBtn.disabled = true;
  riverBtn.disabled = true;
  pollinatorBtn.disabled = true;
  wildlifeBtn.disabled = true;
  industryBtn.disabled = true;

}


// Apply a leadership decision
async function makeDecision(decision) {

  if (!currentUser) {

    alert("Please login first.");
    window.location.href = "Login.html";

    return;

  }

  if (missionCompleted || turnCount <= 0) {

    return;

  }


  decisions.push(decision);


  // Apply decision effects
  switch (decision) {

    case "Plant Forest":

      nature += 12;
      happiness += 5;
      water += 6;
      economy -= 2;

      statusText.textContent =
        "🌳 Forest expanded. Nature and water resources improved.";

      break;


    case "Clean River":

      water += 15;
      nature += 8;
      happiness += 6;
      economy -= 3;

      statusText.textContent =
        "🌊 River restored. Water quality and public happiness improved.";

      break;


    case "Protect Pollinators":

      nature += 8;
      happiness += 4;
      economy += 3;

      statusText.textContent =
        "🐝 Pollinators protected. The ecosystem is becoming more stable.";

      break;


    case "Protect Wildlife":

      nature += 10;
      happiness += 7;
      economy -= 2;

      statusText.textContent =
        "🦌 Wildlife protection strengthened the ecosystem.";

      break;


    case "Expand Industry":

      economy += 15;
      happiness += 3;
      nature -= 10;
      water -= 7;

      statusText.textContent =
        "🏭 Industry expanded. Economy improved, but environmental pressure increased.";

      break;

  }


  turnCount--;

  updateUI();


  if (turnCount === 0) {

    disableButtons();

    statusText.textContent =
      "🤖 Five decisions completed. AI is analyzing your leadership choices...";

    await completeMission();

    return;

  }


  statusText.textContent +=
    ` | ${turnCount} turns remaining.`;

}


// Firebase completion
async function completeMission() {

  if (missionCompleted) {

    return;

  }

  missionCompleted = true;


  if (!currentUser) {

    return;

  }


  const ecosystemHealth =
    Math.round(
      (nature + economy + happiness + water) / 4
    );


  try {

    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        "mission17"
      ),
      {
        missionNumber: 17,

        answer: "Butterfly Effect Mission Completed",

        decisions: decisions,

        finalNature: nature,

        finalEconomy: economy,

        finalHappiness: happiness,

        finalWater: water,

        finalEcosystemHealth: ecosystemHealth,

        completed: true,

        completedAt: new Date().toISOString()
      }
    );


    statusText.textContent =
      `✅ Mission 17 completed! Final ecosystem health: ${ecosystemHealth}%.`;

    setTimeout(() => {

      window.location.href = "Lead18.html";

    }, 1200);


  } catch (error) {

    console.error(
      "Lead17 Firebase Error:",
      error
    );

    missionCompleted = false;

    turnCount++;

    decisions.pop();

    updateUI();

    forestBtn.disabled = false;
    riverBtn.disabled = false;
    pollinatorBtn.disabled = false;
    wildlifeBtn.disabled = false;
    industryBtn.disabled = false;

    statusText.textContent =
      "❌ Could not save mission progress. Please try again.";

  }

}


// Button events
forestBtn.addEventListener("click", () => {

  makeDecision("Plant Forest");

});


riverBtn.addEventListener("click", () => {

  makeDecision("Clean River");

});


pollinatorBtn.addEventListener("click", () => {

  makeDecision("Protect Pollinators");

});


wildlifeBtn.addEventListener("click", () => {

  makeDecision("Protect Wildlife");

});


industryBtn.addEventListener("click", () => {

  makeDecision("Expand Industry");

});


// Initial UI
updateUI();
