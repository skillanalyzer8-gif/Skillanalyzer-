import { auth, db } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ===============================
// DOM ELEMENTS
// ===============================

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
// START RESEARCH
// ===============================

startBtn.addEventListener("click", () => {

    startBtn.style.display = "none";

    status.innerHTML = "Analyzing user research scenarios...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showResearchScenarios, 1800);

});


// ===============================
// SHOW RESEARCH SCENARIOS
// ===============================

function showResearchScenarios() {

    designArea.innerHTML = `

        <h2>🏥 Identify The Most Important User Need</h2>

        <p>
            You are researching a healthcare app.
            Which user need should the design team prioritize?
        </p>


        <div class="researchCard">

            <h3>Research Insight A</h3>

            <p>
                🎨 Users want colorful screens<br>
                ❌ Mainly a visual preference<br>
                ❌ Not the most important healthcare need
            </p>

        </div>


        <div class="researchCard">

            <h3>Research Insight B</h3>

            <p>
                🩺 Users need quick access to important medical information<br>
                ✅ Helps users complete critical tasks quickly<br>
                ✅ Strong user need
            </p>

        </div>


        <div class="researchCard">

            <h3>Research Insight C</h3>

            <p>
                ✨ Users want more animations<br>
                ❌ Mostly decorative<br>
                ❌ Does not solve a major user problem
            </p>

        </div>


        <div class="researchCard">

            <h3>Research Insight D</h3>

            <p>
                🎭 Users want more visual effects<br>
                ❌ Entertainment-focused<br>
                ❌ Low priority for a healthcare application
            </p>

        </div>

    `;


    document.querySelectorAll(".researchCard").forEach((card, index) => {

        card.addEventListener("click", () => {

            reviewResearch(index);

        });

    });

}


// ===============================
// REVIEW RESEARCH DECISION
// ===============================

async function reviewResearch(choice) {

    if (missionCompleted) return;


    if (!currentUser) {

        alert("Please login first.");
        window.location.href = "Login.html";

        return;

    }


    let title = "";
    let message = "";
    let researchQuality = "";
    let userFocus = "";
    let rating = "";
    let score = 0;


    // Research Insight B = Correct answer
    if (choice === 1) {

        title = "🏆 Excellent Research Decision";

        message =
            "Excellent! Strong UX research focuses on real user problems and prioritizes needs that have meaningful impact.";

        researchQuality = "99 / 100";

        userFocus = "97%";

        rating = "★★★★★";

        score = 100;

    } else {

        title = "⚠ Research Needs Improvement";

        message =
            "Good UX research looks beyond visual preferences and identifies the real problems users need the product to solve.";

        researchQuality = "73 / 100";

        userFocus = "79%";

        rating = "★★★☆☆";

        score = 70;

    }


    // ===============================
    // SHOW RESULT
    // ===============================

    designArea.innerHTML = `

        <h2>${title}</h2>

        <br>

        <p>${message}</p>

        <br>

        <h3>
            🔍 Research Quality : ${researchQuality}
        </h3>

        <h3>
            👤 User Focus : ${userFocus}
        </h3>

        <h3>
            ⭐ Research Rating : ${rating}
        </h3>

        <h3>
            🎯 Mission Score : ${score}%
        </h3>

    `;


    status.innerHTML = "Saving your research decision...";


    // ===============================
    // SAVE TO FIRESTORE
    // ===============================

    try {

        await setDoc(

            doc(
                db,
                "users",
                currentUser.uid,
                "missions",
                "mission10"
            ),

            {

                missionNumber: 10,

                answer:
                    choice === 1
                        ? "Research Insight B"
                        : `Research Insight ${String.fromCharCode(65 + choice)}`,

                score: score,

                researchQuality: researchQuality,

                userFocus: userFocus,

                researchRating: rating,

                category: "User Research",

                completed: true,

                completedAt: new Date().toISOString()

            }

        );


        missionCompleted = true;


        status.innerHTML =
            "✅ Mission 10 completed! Your research decision has been saved.";


    } catch (error) {

        console.error("UI10 Firebase Error:", error);

        status.innerHTML =
            "❌ Could not save your result. Please try again.";

    }

}i