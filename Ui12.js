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
// START CHALLENGE
// ===============================

startBtn.addEventListener("click", () => {

    startBtn.style.display = "none";

    status.innerHTML = "Loading color palettes...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showColorPalettes, 1800);

});


// ===============================
// SHOW COLOR PALETTES
// ===============================

function showColorPalettes() {

    designArea.innerHTML = `

        <h2>🏦 Choose The Best Color Palette</h2>

        <p>
            Which palette creates the strongest feeling
            of trust and confidence for a banking application?
        </p>


        <div class="colorCard">

            <h3>Palette A</h3>

            <p>
                🔴 Bright red dominant<br>
                ❌ Feels urgent and alarming<br>
                ❌ Not ideal for building financial trust
            </p>

        </div>


        <div class="colorCard">

            <h3>Palette B</h3>

            <p>
                🔵 Blue-based palette<br>
                ✅ Communicates trust and stability<br>
                ✅ Professional and calming
            </p>

        </div>


        <div class="colorCard">

            <h3>Palette C</h3>

            <p>
                🟡 Bright yellow dominant<br>
                ❌ Can feel overly energetic<br>
                ❌ Weak professional banking impression
            </p>

        </div>


        <div class="colorCard">

            <h3>Palette D</h3>

            <p>
                🟣 Highly saturated mixed colors<br>
                ❌ Visually distracting<br>
                ❌ Weak visual consistency
            </p>

        </div>

    `;


    document
        .querySelectorAll(".colorCard")
        .forEach((card, index) => {

            card.addEventListener("click", () => {

                reviewColorPalette(index);

            });

        });

}


// ===============================
// REVIEW COLOR PALETTE
// ===============================

async function reviewColorPalette(choice) {

    if (missionCompleted) return;


    if (!currentUser) {

        alert("Please login first.");
        window.location.href = "Login.html";

        return;

    }


    let title = "";
    let message = "";
    let trust = "";
    let consistency = "";
    let rating = "";
    let score = 0;


    // Palette B = Correct answer
    if (choice === 1) {

        title = "🏆 Excellent Color Choice";

        message =
            "Excellent! A well-balanced blue-based palette can communicate trust, stability, and professionalism in a banking interface.";

        trust = "99 / 100";

        consistency = "97%";

        rating = "★★★★★";

        score = 100;

    } else {

        title = "⚠ Color Palette Needs Improvement";

        message =
            "Good color choices should support the product's purpose, create an appropriate emotional response, and maintain visual consistency.";

        trust = "73 / 100";

        consistency = "79%";

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
            🤝 Trust & Confidence : ${trust}
        </h3>

        <h3>
            🎨 Visual Consistency : ${consistency}
        </h3>

        <h3>
            ⭐ Color Design Rating : ${rating}
        </h3>

        <h3>
            🎯 Mission Score : ${score}%
        </h3>

    `;


    status.innerHTML = "Saving your color decision...";


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
                "mission12"
            ),

            {

                missionNumber: 12,

                answer:
                    choice === 1
                        ? "Palette B"
                        : `Palette ${String.fromCharCode(65 + choice)}`,

                score: score,

                trust: trust,

                visualConsistency: consistency,

                colorRating: rating,

                category: "Color Psychology",

                completed: true,

                completedAt: new Date().toISOString()

            }

        );


        missionCompleted = true;


        status.innerHTML =
            "✅ Mission 12 completed! Your color decision has been saved.";


    } catch (error) {

        console.error("UI12 Firebase Error:", error);

        status.innerHTML =
            "❌ Could not save your result. Please try again.";

    }

}
