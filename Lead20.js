import { auth, db } from "./firebase.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// DOM elements
const leaderAvatar = document.getElementById("leaderAvatar");
const leaderTitle = document.getElementById("leaderTitle");
const leaderQuote = document.getElementById("leaderQuote");

const scoreFill = document.getElementById("scoreFill");
const scoreText = document.getElementById("scoreText");

const traitList = document.getElementById("traitList");
const revealBtn = document.getElementById("revealBtn");


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


// Reveal Leadership Legacy
revealBtn.addEventListener("click", async () => {

  if (!currentUser) {

    alert("Please login first.");
    window.location.href = "Login.html";

    return;

  }

  if (missionCompleted) {

    return;

  }


  revealBtn.disabled = true;
  revealBtn.style.opacity = "0.6";

  leaderTitle.textContent =
    "Analyzing your leadership journey...";

  leaderQuote.textContent =
    "AI is synchronizing your decisions from all twenty missions...";


  traitList.innerHTML = `
    <li>Analyzing decision making...</li>
    <li>Analyzing problem solving...</li>
    <li>Analyzing emotional intelligence...</li>
    <li>Analyzing crisis management...</li>
  `;


  let score = 0;

  scoreFill.style.width = "0%";
  scoreText.textContent = "0%";


  // Score animation
  const scoreInterval = setInterval(() => {

    score += 5;

    if (score > 92) {

      score = 92;

    }

    scoreFill.style.width =
      score + "%";

    scoreText.textContent =
      score + "%";


    if (score >= 92) {

      clearInterval(scoreInterval);

    }

  }, 60);


  try {

    // Save Mission 20
    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        "mission20"
      ),
      {
        missionNumber: 20,

        answer: "Final Leadership Legacy Revealed",

        score: 92,

        leaderTitle: "Advanced Leader",

        traits: [
          "Problem Solving",
          "Decision Making",
          "Emotional Intelligence",
          "Crisis Management",
          "Strategic Thinking"
        ],

        completed: true,

        completedAt: new Date().toISOString()
      }
    );


    // Mark overall assessment completed
    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid
      ),
      {
        assessmentCompleted: true,

        finalCategory: "Leadership",

        finalMission: 20,

        finalAnswer: "Final Leadership Legacy Revealed",

        finalScore: 92,

        completedAt: new Date().toISOString()
      },
      {
        merge: true
      }
    );


    clearInterval(scoreInterval);

    scoreFill.style.width = "92%";
    scoreText.textContent = "92%";


    // Final profile
    leaderAvatar.textContent = "👑";

    leaderTitle.textContent =
      "Advanced Leader";

    leaderQuote.textContent =
      "You have demonstrated strong decision-making, problem-solving, strategic thinking, and the ability to lead through difficult situations.";


    // Leadership traits
    traitList.innerHTML = `
      <li>🧠 Strong Problem Solving</li>
      <li>🎯 Strategic Decision Making</li>
      <li>💜 Emotional Intelligence</li>
      <li>🚨 Crisis Management</li>
      <li>🌍 Leadership & Team Thinking</li>
    `;


    missionCompleted = true;

    revealBtn.textContent =
      "ASSESSMENT COMPLETED ✓";

    revealBtn.disabled = true;

    revealBtn.style.opacity = "0.7";


  } catch (error) {

    console.error(
      "Lead20 Firebase Error:",
      error
    );

    clearInterval(scoreInterval);

    revealBtn.disabled = false;
    revealBtn.style.opacity = "1";

    scoreFill.style.width = "0%";
    scoreText.textContent = "0%";

    leaderTitle.textContent =
      "Analysis Failed";

    leaderQuote.textContent =
      "❌ Could not save your final assessment. Please try again.";

  }

});



