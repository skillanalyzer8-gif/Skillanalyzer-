import { auth, db } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const startBtn = document.getElementById("startChallenge");
const designArea = document.querySelector(".designArea");
const status = document.getElementById("statusText");

let currentUser = null;
let missionCompleted = false;


// ===============================
// AUTHENTICATION
// ===============================

onAuthStateChanged(auth, (user) => {

    if (user) {

        currentUser = user;

    } else {

        alert("Please login first.");
        window.location.href = "Login.html";

    }

});


// ===============================
// COMPLETE JOURNEY
// ===============================

startBtn.addEventListener("click", async () => {

    if (missionCompleted) return;


    if (!currentUser) {

        alert("Please login first.");
        window.location.href = "Login.html";

        return;

    }


    startBtn.style.display = "none";

    status.innerHTML =
        "🏆 Evaluating your 20-mission UX journey...";

    navigator.vibrate?.([
        100,
        80,
        100,
        80,
        200
    ]);


    setTimeout(() => {

        completeFinalMission();

    }, 1800);

});


// ===============================
// FINAL EVALUATION
// ===============================

async function completeFinalMission() {

    const finalScore = 100;

    const finalCategory = "UX Mastery";

    const finalAnswer =
        "Completed all 20 UI/UX Missions";


    // ===============================
    // DISPLAY FINAL RESULT
    // ===============================

    designArea.innerHTML = `

        <h2>🏆 UX MASTERY ACHIEVED!</h2>

        <br>

        <p>
            Congratulations! You have successfully completed
            all 20 UI/UX learning missions.
        </p>

        <br>

        <h3>
            🎨 Missions Completed : 20 / 20
        </h3>

        <h3>
            🧠 UX Mastery Score : ${finalScore}%
        </h3>

        <h3>
            ⭐ Final Rating : ★★★★★
        </h3>

        <h3>
            🏅 Achievement : UX Design Master
        </h3>

        <br>

        <p>
            You have completed your journey through
            UI/UX fundamentals, accessibility, typography,
            navigation, research, personalization,
            microinteractions and more.
        </p>

    `;


    status.innerHTML =
        "Saving your final UX mastery result...";


    // ===============================
    // SAVE MISSION 20
    // ===============================

    try {

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

                answer: finalAnswer,

                score: finalScore,

                category: finalCategory,

                finalRating: "★★★★★",

                missionsCompleted: 20,

                completed: true,

                completedAt:
                    new Date().toISOString()

            }

        );


        // ===============================
        // UPDATE USER PROFILE
        // ===============================

        await setDoc(

            doc(
                db,
                "users",
                currentUser.uid
            ),

            {

                assessmentCompleted: true,

                finalCategory: finalCategory,

                finalMission: 20,

                finalAnswer: finalAnswer,

                finalScore: finalScore,

                completedAt:
                    new Date().toISOString()

            },

            {
                merge: true

           
