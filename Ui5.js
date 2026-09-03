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
// START CHALLENGE
// ========================================

startBtn.addEventListener("click", () => {

    startBtn.style.display = "none";

    status.innerHTML =
        "Loading typography comparison...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showFonts, 1800);

});


// ========================================
// SHOW FONT CHOICES
// ========================================

function showFonts() {

    designArea.innerHTML = `

        <h2>
            📰 Choose The Best Font
        </h2>

        <p>
            Which typography gives users the best reading experience?
        </p>


        <div class="fontCard">

            <h3>
                Font A
            </h3>

            <p>
                ❌ Decorative font<br>
                ❌ Small size<br>
                ❌ Tight spacing
            </p>

        </div>


        <div class="fontCard">

            <h3>
                Font B
            </h3>

            <p>
                ✅ Clean font<br>
                ✅ Comfortable spacing<br>
                ✅ Easy to read
            </p>

        </div>


        <div class="fontCard">

            <h3>
                Font C
            </h3>

            <p>
                🎨 Stylish font<br>
                ❌ Difficult for long articles
            </p>

        </div>


        <div class="fontCard">

            <h3>
                Font D
            </h3>

            <p>
                ⚡ Thin font<br>
                ❌ Low readability
            </p>

        </div>

    `;


    // ========================================
    // FONT CARD EVENTS
    // ========================================

    document
        .querySelectorAll(".fontCard")
        .forEach((card, index) => {

            card.addEventListener("click", () => {

                reviewFont(index);

            });

        });

}


// ========================================
// REVIEW FONT
// ========================================

async function reviewFont(choice) {

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
    let readability = "";
    let usability = "";
    let rating = "";
    let score = 0;


    // ========================================
    // CORRECT ANSWER = FONT B
    // ========================================

    if (choice === 1) {

        title =
            "🏆 Perfect Typography";

        message =
            "Excellent! Clean fonts with proper spacing improve readability and create a better reading experience.";

        readability =
            "99 / 100";

        usability =
            "97%";

        rating =
            "★★★★★";

        score = 100;


    } else {

        title =
            "⚠ Typography Needs Improvement";

        message =
            "Beautiful fonts are not always readable. Good typography always puts the user first.";

        readability =
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
            📖 Readability : ${readability}
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
        "Saving your typography decision...";


    // ========================================
    // SAVE MISSION 4 TO FIRESTORE
    // ========================================

    try {

        await setDoc(
            doc(
                db,
                "users",
                currentUser.uid,
                "missions",
                "mission4"
            ),
            {

                missionNumber: 4,

                answer:
                    choice === 1
                        ? "Font B"
                        : `Font ${String.fromCharCode(65 + choice)}`,

                score: score,

                readability:
                    readability,

                usability:
                    usability,

                designRating:
                    rating,

                category:
                    "Typography",

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
            "✅ Mission 4 completed! Your typography decision has been saved.";

    } catch (error) {

        // ========================================
        // FIREBASE ERROR
        // ========================================

        console.error(
            "UI4 Firebase Error:",
            error
        );


        status.innerHTML =
            "❌ Could not save your result. Please try again.";

    }

}
