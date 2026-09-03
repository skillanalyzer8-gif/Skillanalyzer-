import { auth, db } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ========================================
// DOM ELEMENTS
// ========================================

const startBtn =
    document.getElementById("startChallenge");

const designArea =
    document.querySelector(".designArea");

const status =
    document.getElementById("statusText");


let currentUser = null;
let missionCompleted = false;


// ========================================
// AUTHENTICATION
// ========================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        currentUser = user;

    } else {

        alert("Please login first.");

        window.location.href = "Login.html";

    }

});


// ========================================
// START ICON CHALLENGE
// ========================================

startBtn.addEventListener("click", () => {

    startBtn.style.display = "none";

    status.innerHTML =
        "Loading icon comparison...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showIcons, 1800);

});


// ========================================
// SHOW ICON CHOICES
// ========================================

function showIcons() {

    designArea.innerHTML = `

        <h2>
            🍔 Choose The Best Icon
        </h2>

        <p>
            Which icon style is easiest for food delivery users to recognize?
        </p>


        <div class="iconCard">

            <h3>
                Icon A
            </h3>

            <p>
                🎨 Highly detailed<br>
                ❌ Too complicated<br>
                ❌ Difficult to recognize quickly
            </p>

        </div>


        <div class="iconCard">

            <h3>
                Icon B
            </h3>

            <p>
                🍔 Simple design<br>
                ✅ Clear meaning<br>
                ✅ Easy to recognize
            </p>

        </div>


        <div class="iconCard">

            <h3>
                Icon C
            </h3>

            <p>
                ✨ Decorative style<br>
                ❌ Too many elements<br>
                ❌ Poor scalability
            </p>

        </div>


        <div class="iconCard">

            <h3>
                Icon D
            </h3>

            <p>
                ⚡ Very abstract<br>
                ❌ Difficult to understand<br>
                ❌ Weak visual meaning
            </p>

        </div>

    `;


    // ========================================
    // ICON CARD EVENTS
    // ========================================

    document
        .querySelectorAll(".iconCard")
        .forEach((card, index) => {

            card.addEventListener("click", () => {

                reviewIcon(index);

            });

        });

}


// ========================================
// REVIEW ICON
// ========================================

async function reviewIcon(choice) {

    // Prevent multiple submissions
    if (missionCompleted) {

        return;

    }


    // ========================================
    // CHECK AUTHENTICATION
    // ========================================

    if (!currentUser) {

        alert("Please login first.");

        window.location.href = "Login.html";

        return;

    }


    let title = "";
    let message = "";
    let clarity = "";
    let usability = "";
    let rating = "";
    let score = 0;


    // ========================================
    // CORRECT ANSWER = ICON B
    // ========================================

    if (choice === 1) {

        title =
            "🏆 Perfect Icon Choice";

        message =
            "Excellent! Simple and recognizable icons help users understand actions quickly.";

        clarity =
            "99 / 100";

        usability =
            "97%";

        rating =
            "★★★★★";

        score = 100;


    } else {

        title =
            "⚠ Icon Needs Improvement";

        message =
            "Good icons should be simple, meaningful, recognizable, and easy to understand.";

        clarity =
            "73 / 100";

        usability =
            "79%";

        rating =
            "★★★☆☆";

        score = 70;

    }


    // ========================================
    // SHOW RESULT
    // ========================================

    designArea.innerHTML = `

        <h2>
            ${title}
        </h2>

        <br>

        <p>
            ${message}
        </p>

        <br>

        <h3>
            👁 Icon Clarity : ${clarity}
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


    status.innerHTML =
        "Saving your icon design decision...";


    // ========================================
    // SAVE MISSION 6
    // ========================================

    try {

        await setDoc(
            doc(
                db,
                "users",
                currentUser.uid,
                "missions",
                "mission6"
            ),
            {

                missionNumber: 6,

                answer:
                    choice === 1
                        ? "Icon B"
                        : `Icon ${String.fromCharCode(65 + choice)}`,

                score: score,

                clarity:
                    clarity,

                usability:
                    usability,

                designRating:
                    rating,

                category:
                    "Icon Design",

                completed:
                    true,

                completedAt:
                    new Date().toISOString()

            }
        );


        // ========================================
        // MISSION COMPLETED
        // ========================================

        missionCompleted = true;


        status.innerHTML =
            "✅ Mission 6 completed! Your icon design decision has been saved.";


    } catch (error) {

        // ========================================
        // FIREBASE ERROR
        // ========================================

        console.error(
            "UI6 Firebase Error:",
            error
        );


        status.innerHTML =
            "❌ Could not save your result. Please try again.";

    }

}