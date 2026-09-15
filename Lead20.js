import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc,
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


// Leadership mission configuration
const category = "leadership";
const questionNumber = 20;
const questionId = "leadership_q20";


// Authentication
onAuthStateChanged(auth, async (user) => {

  if (!user) {

    alert("Please login first.");
    window.location.href = "Login.html";

    return;
  }

  currentUser = user;

  // Check whether Lead20 was already completed
  try {

    const missionRef = doc(
      db,
      "users",
      currentUser.uid,
      "missions",
      questionId
    );

    const missionSnap = await getDoc(missionRef);

    if (missionSnap.exists()) {

      const data = missionSnap.data();

      if (data.completed === true) {

        missionCompleted = true;

        showSavedResult(data);
      }
    }

  } catch (error) {

    console.error(
      "Lead20 restore error:",
      error
    );

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
    "AI is analyzing your decisions from all 20 missions...";


  traitList.innerHTML = `
    <li>🧠 Analyzing decision making...</li>
    <li>🎯 Analyzing problem solving...</li>
    <li>💜 Analyzing emotional intelligence...</li>
    <li>🚨 Analyzing crisis management...</li>
    <li>🌍 Analyzing strategic thinking...</li>
  `;


  scoreFill.style.width = "0%";
  scoreText.textContent = "0%";


  try {

    // -----------------------------------------
    // READ ALL 20 LEADERSHIP MISSIONS
    // -----------------------------------------

    let totalScore = 0;
    let completedMissions = 0;


    for (let i = 1; i <= 20; i++) {

      const missionId =
        `leadership_q${i}`;


      const missionRef = doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        missionId
      );


      const missionSnap =
        await getDoc(missionRef);


      if (missionSnap.exists()) {

        const data =
          missionSnap.data();


        if (data.completed === true) {

          completedMissions++;

          totalScore +=
            Number(data.score) || 0;
        }

      }

    }


    // -----------------------------------------
    // CHECK ALL 20 MISSIONS
    // -----------------------------------------

    if (completedMissions < 20) {

      throw new Error(
        `Only ${completedMissions}/20 leadership missions completed.`
      );

    }


    // -----------------------------------------
    // MAXIMUM SCORE
    // -----------------------------------------

    const maxScore = 100;


    // Convert score to percentage
    let percentage =
      Math.round(
        (totalScore / maxScore) * 100
      );


    // Keep percentage between 0 and 100
    percentage =
      Math.max(
        0,
        Math.min(100, percentage)
      );


    // -----------------------------------------
    // DETERMINE LEADERSHIP PROFILE
    // -----------------------------------------

    let avatar;
    let title;
    let quote;
    let traits;


    if (percentage >= 85) {

      avatar = "👑";

      title =
        "Visionary Leader";

      quote =
        "You demonstrate strong decision-making, strategic thinking, empathy, problem-solving, and the ability to guide teams through difficult situations.";

      traits = [
        "🧠 Exceptional Problem Solving",
        "🎯 Strategic Decision Making",
        "💜 Strong Emotional Intelligence",
        "🚨 Effective Crisis Management",
        "🌍 Visionary Team Leadership"
      ];

    }

    else if (percentage >= 70) {

      avatar = "⭐";

      title =
        "Strategic Leader";

      quote =
        "You show strong leadership potential with good decision-making, teamwork, problem-solving, and strategic thinking.";

      traits = [
        "🧠 Strong Problem Solving",
        "🎯 Strategic Thinking",
        "💜 Team Awareness",
        "🚨 Crisis Response",
        "🌍 Leadership Potential"
      ];

    }

    else if (percentage >= 50) {

      avatar = "🧭";

      title =
        "Developing Leader";

      quote =
        "You have developed important leadership abilities and can continue improving your decision-making, communication, and strategic thinking.";

      traits = [
        "🧠 Problem Solving",
        "🎯 Decision Making",
        "💬 Communication",
        "🤝 Teamwork",
        "📈 Growth Potential"
      ];

    }

    else {

      avatar = "🌱";

      title =
        "Emerging Leader";

      quote =
        "You are beginning your leadership journey. With more practice in decision-making, teamwork, and problem-solving, your leadership abilities can continue to grow.";

      traits = [
        "🌱 Leadership Growth",
        "🧠 Problem Solving Practice",
        "🎯 Decision Making Practice",
        "🤝 Team Development",
        "📈 Future Potential"
      ];

    }


    // -----------------------------------------
    // ANIMATE SCORE
    // -----------------------------------------

    let animatedScore = 0;


    const scoreInterval =
      setInterval(() => {

        animatedScore += 2;


        if (animatedScore >= percentage) {

          animatedScore =
            percentage;

          clearInterval(
            scoreInterval
          );

        }


        scoreFill.style.width =
          animatedScore + "%";

        scoreText.textContent =
          animatedScore + "%";


      }, 40);


    // -----------------------------------------
    // SAVE FINAL LEADERSHIP RESULT
    // -----------------------------------------

    const completedAt =
      new Date().toISOString();


    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        questionId
      ),
      {

        category: category,

        questionNumber:
          questionNumber,

        answer:
          "Final Leadership Legacy Revealed",

        score:
          totalScore,

        percentage:
          percentage,

        leaderTitle:
          title,

        traits:
          traits,

        completed:
          true,

        completedAt:
          completedAt

      }
    );


    // -----------------------------------------
    // MARK LEADERSHIP CATEGORY COMPLETE
    // -----------------------------------------

    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid
      ),
      {

        leadershipCompleted:
          true,

        leadershipFinalMission:
          20,

        leadershipFinalScore:
          totalScore,

        leadershipPercentage:
          percentage,

        leadershipTitle:
          title,

        leadershipTraits:
          traits,

        leadershipCompletedAt:
          completedAt

      },
      {
        merge: true
      }
    );


    // -----------------------------------------
    // DISPLAY FINAL PROFILE
    // -----------------------------------------

    setTimeout(() => {

      scoreFill.style.width =
        percentage + "%";

      scoreText.textContent =
        percentage + "%";


      leaderAvatar.textContent =
        avatar;


      leaderTitle.textContent =
        title;


      leaderQuote.textContent =
        quote;


      traitList.innerHTML =
        traits
          .map(
            trait =>
              `<li>${trait}</li>`
          )
          .join("");


      revealBtn.textContent =
        "LEADERSHIP ASSESSMENT COMPLETED ✓";


      revealBtn.disabled =
        true;

      revealBtn.style.opacity =
        "0.7";


      missionCompleted =
        true;


    }, 1000);


  } catch (error) {

    console.error(
      "Lead20 Firebase Error:",
      error
    );


    revealBtn.disabled =
      false;

    revealBtn.style.opacity =
      "1";


    scoreFill.style.width =
      "0%";

    scoreText.textContent =
      "0%";


    leaderTitle.textContent =
      "Analysis Failed";


    leaderQuote.textContent =
      "❌ " + error.message;

  }

});


// -----------------------------------------
// SHOW SAVED RESULT
// -----------------------------------------

function showSavedResult(data) {

  const percentage =
    Number(data.percentage) || 0;


  const title =
    data.leaderTitle ||
    "Leadership Profile";


  const traits =
    Array.isArray(data.traits)
      ? data.traits
      : [];


  let avatar = "👑";


  if (percentage >= 85) {

    avatar = "👑";

  }

  else if (percentage >= 70) {

    avatar = "⭐";

  }

  else if (percentage >= 50) {

    avatar = "🧭";

  }

  else {

    avatar = "🌱";

  }


  leaderAvatar.textContent =
    avatar;


  leaderTitle.textContent =
    title;


  leaderQuote.textContent =
    "Your leadership assessment has already been completed.";


  scoreFill.style.width =
    percentage + "%";


  scoreText.textContent =
    percentage + "%";


  traitList.innerHTML =
    traits
      .map(
        trait =>
          `<li>${trait}</li>`
      )
      .join("");


  revealBtn.textContent =
    "LEADERSHIP ASSESSMENT COMPLETED ✓";


  revealBtn.disabled =
    true;


  revealBtn.style.opacity =
    "0.7";

}
