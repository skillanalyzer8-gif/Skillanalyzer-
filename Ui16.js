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

    status.innerHTML = "Loading navigation systems...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showNavigationSystems, 1800);

});


// ===============================
// SHOW NAVIGATION OPTIONS
// ===============================

function showNavigationSystems() {

    designArea.innerHTML = `

        <h2>✈️ Choose The Best Navigation System</h2>

        <p>
            Which navigation system provides the smoothest
            experience for a travel booking application?
        </p>


        <div class="navCard">

            <h3>Navigation A</h3>

            <p>
                📋 Large menu with every feature visible<br>
                ❌ Too many choices at once<br>
                ❌ Difficult to scan
            </p>

        </div>


        <div class="navCard">

            <h3>Navigation B</h3>

            <p>
                🧭 Clear primary navigation<br>
                ✅ Important travel features are easy to find<br>
                ✅ Consistent structure throughout the app
            </p>

        </div>


        <div class="navCard">

            <h3>Navigation C</h3>

            <p>
                🔍 Features hidden behind multiple menus<br>
                ❌ Users must search repeatedly<br>
                ❌ Poor discoverability
            </p>

        </div>


        <div class="navCard">

            <h3>Navigation D</h3>

            <p>
                🔀 Different navigation on every screen<br>
                ❌ Inconsistent user flow<br>
                ❌ Users may become confused
            </p>

        </div>

    `;


    document
        .querySelectorAll(".navCard")
        .forEach((card, index) => {

            card.addEventListener("click", () => {

                reviewNavigation(index);

            });

        });

}


// ===============================
// REVIEW NAVIGATION
// ===============================

async function reviewNavigation(choice) {

    if (missionCompleted) return;


    if (!currentUser) {

        alert("Please login first.");
        window.location.href = "Login.html";

        return;

    }


    let title = "";
    let message = "";
    let discoverability = "";
    let usability = "";
    let rating = "";
    let score = 0;


    // Navigation B = Correct answer
    if (choice === 1) {

        title = "🏆 Excellent Navigation Choice";

        message =
            "Excellent! Clear, consistent navigation helps travelers find destinations, bookings, and important features without unnecessary effort.";

        discoverability = "99 / 100";

        usability = "97%";

        rating = "★★★★★";

        score = 100;

    } else {

        title = "⚠ Navigation Needs Improvement";

        message =
            "Effective navigation should be easy to understand, consistent across screens, and should help users reach important features quickly.";

        discoverability = "73 / 100";

        usability = "79%";

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
            🧭 Navigation Discoverability : ${discoverability}
        </h3>

        <h3>
            😊 User Experience : ${usability}
        </h3>

        <h3>
            ⭐ Navigation Rating : ${rating}
        </h3>

        <h3>
            🎯 Mission Score : ${score}%
        </h3>

    `;


    status.innerHTML = "Saving your navigation decision...";


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
                "mission16"
            ),

            {

                missionNumber: 16,

                answer:
                    choice === 1
                        ? "Navigation B"
                        : `Navigation ${String.fromCharCode(65 + choice)}`,

                score: score,

                discoverability: discoverability,

                usability: usability,

                navigationRating: rating,

                category: "Navigation Design",

                completed: true,

                completedAt: new Date().toISOString()

            }

        );


        missionCompleted = true;


        status.innerHTML =
            "✅ Mission 16 completed! Your navigation decision has been saved.";


    } catch (error) {

        console.error("UI16 Firebase Error:", error);

        status.innerHTML =
            "❌ Could not save your result. Please try again.";

    }

}
