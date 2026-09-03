import { auth, db } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// DOM elements
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

    status.innerHTML = "Loading navigation layouts...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showNavigationLayouts, 1800);

});


// ===============================
// SHOW NAVIGATION OPTIONS
// ===============================

function showNavigationLayouts() {

    designArea.innerHTML = `

        <h2>🛍 Choose The Best Navigation</h2>

        <p>
            Which navigation style gives shopping app users
            the easiest experience?
        </p>

        <div class="navCard">

            <h3>Navigation A</h3>

            <p>
                🎨 Many menu options<br>
                ❌ Too many categories<br>
                ❌ Difficult to find features
            </p>

        </div>


        <div class="navCard">

            <h3>Navigation B</h3>

            <p>
                🧭 Clear navigation bar<br>
                ✅ Important sections are easy to reach<br>
                ✅ Simple and predictable
            </p>

        </div>


        <div class="navCard">

            <h3>Navigation C</h3>

            <p>
                ✨ Hidden menu system<br>
                ❌ Users must search for features<br>
                ❌ Poor discoverability
            </p>

        </div>


        <div class="navCard">

            <h3>Navigation D</h3>

            <p>
                ⚡ Complex navigation structure<br>
                ❌ Too many screens<br>
                ❌ Confusing user flow
            </p>

        </div>

    `;


    document.querySelectorAll(".navCard").forEach((card, index) => {

        card.addEventListener("click", () => {

            reviewNavigation(index);

        });

    });

}


// ===============================
// REVIEW USER'S CHOICE
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
            "Excellent! Clear and predictable navigation helps users find products and features quickly.";

        discoverability = "99 / 100";

        usability = "97%";

        rating = "★★★★★";

        score = 100;

    } else {

        title = "⚠ Navigation Needs Improvement";

        message =
            "Good navigation should be clear, predictable, easy to discover, and simple for users to understand.";

        discoverability = "73 / 100";

        usability = "79%";

        rating = "★★★☆☆";

        score = 70;

    }


    // Show result
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
            ⭐ Design Rating : ${rating}
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
                "mission7"
            ),

            {

                missionNumber: 7,

                answer:
                    choice === 1
                        ? "Navigation B"
                        : `Navigation ${String.fromCharCode(65 + choice)}`,

                score: score,

                discoverability: discoverability,

                usability: usability,

                designRating: rating,

                category: "Navigation Design",

                completed: true,

                completedAt: new Date().toISOString()

            }

        );


        missionCompleted = true;


        status.innerHTML =
            "✅ Mission 7 completed! Your navigation decision has been saved.";


    } catch (error) {

        console.error("UI7 Firebase Error:", error);

        status.innerHTML =
            "❌ Could not save your result. Please try again.";

    }

}