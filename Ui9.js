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

    status.innerHTML = "Loading dark mode interfaces...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showDarkModes, 1800);

});


// ===============================
// SHOW DARK MODE OPTIONS
// ===============================

function showDarkModes() {

    designArea.innerHTML = `

        <h2>🎵 Choose The Best Dark Mode</h2>

        <p>
            Which dark mode interface provides the best
            readability and user experience?
        </p>


        <div class="darkCard">

            <h3>Theme A</h3>

            <p>
                🖤 Pure black background<br>
                ❌ Extremely bright text<br>
                ❌ Harsh contrast
            </p>

        </div>


        <div class="darkCard">

            <h3>Theme B</h3>

            <p>
                🌙 Comfortable dark background<br>
                ✅ Soft readable text<br>
                ✅ Balanced contrast
            </p>

        </div>


        <div class="darkCard">

            <h3>Theme C</h3>

            <p>
                🌈 Very bright colors<br>
                ❌ Distracting interface<br>
                ❌ Poor dark-mode consistency
            </p>

        </div>


        <div class="darkCard">

            <h3>Theme D</h3>

            <p>
                ⚡ Low-contrast interface<br>
                ❌ Text is difficult to read<br>
                ❌ Poor accessibility
            </p>

        </div>

    `;


    document.querySelectorAll(".darkCard").forEach((card, index) => {

        card.addEventListener("click", () => {

            reviewDarkMode(index);

        });

    });

}


// ===============================
// REVIEW DARK MODE
// ===============================

async function reviewDarkMode(choice) {

    if (missionCompleted) return;


    if (!currentUser) {

        alert("Please login first.");
        window.location.href = "Login.html";

        return;

    }


    let title = "";
    let message = "";
    let readability = "";
    let accessibility = "";
    let rating = "";
    let score = 0;


    // Theme B = Correct answer
    if (choice === 1) {

        title = "🏆 Perfect Dark Mode Choice";

        message =
            "Excellent! A comfortable dark background with readable text and balanced contrast creates a better experience.";

        readability = "99 / 100";

        accessibility = "97%";

        rating = "★★★★★";

        score = 100;

    } else {

        title = "⚠ Dark Mode Needs Improvement";

        message =
            "A good dark theme should maintain comfortable contrast, readable text, and consistent visual hierarchy.";

        readability = "73 / 100";

        accessibility = "79%";

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
            👁 Readability : ${readability}
        </h3>

        <h3>
            ♿ Accessibility : ${accessibility}
        </h3>

        <h3>
            ⭐ Design Rating : ${rating}
        </h3>

        <h3>
            🎯 Mission Score : ${score}%
        </h3>

    `;


    status.innerHTML = "Saving your dark mode decision...";


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
                "mission9"
            ),

            {

                missionNumber: 9,

                answer:
                    choice === 1
                        ? "Theme B"
                        : `Theme ${String.fromCharCode(65 + choice)}`,

                score: score,

                readability: readability,

                accessibility: accessibility,

                designRating: rating,

                category: "Dark Mode Design",

                completed: true,

                completedAt: new Date().toISOString()

            }

        );


        missionCompleted = true;


        status.innerHTML =
            "✅ Mission 9 completed! Your dark mode decision has been saved.";


    } catch (error) {

        console.error("UI9 Firebase Error:", error);

        status.innerHTML =
            "❌ Could not save your result. Please try again.";

    }

}
