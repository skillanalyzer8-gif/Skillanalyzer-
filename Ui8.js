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

    status.innerHTML = "Loading layout comparison...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showLayouts, 1800);

});


// ===============================
// SHOW LAYOUT OPTIONS
// ===============================

function showLayouts() {

    designArea.innerHTML = `

        <h2>✈️ Choose The Best Layout</h2>

        <p>
            Which layout has the best spacing and visual hierarchy
            for a premium travel booking app?
        </p>


        <div class="layoutCard">

            <h3>Layout A</h3>

            <p>
                📦 Elements packed together<br>
                ❌ Very little spacing<br>
                ❌ Difficult to scan
            </p>

        </div>


        <div class="layoutCard">

            <h3>Layout B</h3>

            <p>
                📐 Balanced spacing<br>
                ✅ Clear visual hierarchy<br>
                ✅ Comfortable content separation
            </p>

        </div>


        <div class="layoutCard">

            <h3>Layout C</h3>

            <p>
                🌌 Excessive empty space<br>
                ❌ Content feels disconnected<br>
                ❌ Poor use of screen space
            </p>

        </div>


        <div class="layoutCard">

            <h3>Layout D</h3>

            <p>
                ⚡ Random spacing<br>
                ❌ Inconsistent alignment<br>
                ❌ Weak visual structure
            </p>

        </div>

    `;


    document.querySelectorAll(".layoutCard").forEach((card, index) => {

        card.addEventListener("click", () => {

            reviewLayout(index);

        });

    });

}


// ===============================
// REVIEW LAYOUT
// ===============================

async function reviewLayout(choice) {

    if (missionCompleted) return;


    if (!currentUser) {

        alert("Please login first.");
        window.location.href = "Login.html";

        return;

    }


    let title = "";
    let message = "";
    let hierarchy = "";
    let usability = "";
    let rating = "";
    let score = 0;


    // Layout B = Correct answer
    if (choice === 1) {

        title = "🏆 Perfect Layout Choice";

        message =
            "Excellent! Balanced spacing creates clear visual hierarchy and makes the interface easier to scan.";

        hierarchy = "99 / 100";

        usability = "97%";

        rating = "★★★★★";

        score = 100;

    } else {

        title = "⚠ Layout Needs Improvement";

        message =
            "Good layouts use consistent spacing, alignment, and hierarchy to guide the user's attention.";

        hierarchy = "73 / 100";

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
            📐 Visual Hierarchy : ${hierarchy}
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


    status.innerHTML = "Saving your layout decision...";


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
                "mission8"
            ),

            {

                missionNumber: 8,

                answer:
                    choice === 1
                        ? "Layout B"
                        : `Layout ${String.fromCharCode(65 + choice)}`,

                score: score,

                visualHierarchy: hierarchy,

                usability: usability,

                designRating: rating,

                category: "Spacing & Layout",

                completed: true,

                completedAt: new Date().toISOString()

            }

        );


        missionCompleted = true;


        status.innerHTML =
            "✅ Mission 8 completed! Your layout decision has been saved.";


    } catch (error) {

        console.error("UI8 Firebase Error:", error);

        status.innerHTML =
            "❌ Could not save your result. Please try again.";

    }

}