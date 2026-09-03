mport { auth, db } from "./firebase.js";

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

    status.innerHTML = "Loading accessibility designs...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showAccessibilityOptions, 1800);

});


// ===============================
// SHOW ACCESSIBILITY OPTIONS
// ===============================

function showAccessibilityOptions() {

    designArea.innerHTML = `

        <h2>🎓 Choose The Most Accessible Design</h2>

        <p>
            Which design allows the widest range of students
            to use the educational app comfortably?
        </p>


        <div class="accessCard">

            <h3>Design A</h3>

            <p>
                🎨 Very small text<br>
                ❌ Difficult to read<br>
                ❌ Poor visual accessibility
            </p>

        </div>


        <div class="accessCard">

            <h3>Design B</h3>

            <p>
                ♿ Accessible controls<br>
                ✅ Clear readable text<br>
                ✅ Good color contrast<br>
                ✅ Supports keyboard and assistive technologies
            </p>

        </div>


        <div class="accessCard">

            <h3>Design C</h3>

            <p>
                🌈 Color-only instructions<br>
                ❌ Information depends only on color<br>
                ❌ Difficult for some users to interpret
            </p>

        </div>


        <div class="accessCard">

            <h3>Design D</h3>

            <p>
                🖱 Mouse-only interaction<br>
                ❌ Limited interaction methods<br>
                ❌ Difficult for users who cannot use a mouse
            </p>

        </div>

    `;


    document
        .querySelectorAll(".accessCard")
        .forEach((card, index) => {

            card.addEventListener("click", () => {

                reviewAccessibility(index);

            });

        });

}


// ===============================
// REVIEW ACCESSIBILITY
// ===============================

async function reviewAccessibility(choice) {

    if (missionCompleted) return;


    if (!currentUser) {

        alert("Please login first.");
        window.location.href = "Login.html";

        return;

    }


    let title = "";
    let message = "";
    let accessibilityScore = "";
    let usability = "";
    let rating = "";
    let score = 0;


    // Design B = Correct answer
    if (choice === 1) {

        title = "🏆 Excellent Accessibility Choice";

        message =
            "Excellent! Accessible design considers readable content, sufficient contrast, flexible interaction methods, and support for assistive technologies.";

        accessibilityScore = "99 / 100";

        usability = "97%";

        rating = "★★★★★";

        score = 100;

    } else {

        title = "⚠ Accessibility Needs Improvement";

        message =
            "Accessible design should not depend on a single way of seeing or interacting with an interface. Consider readability, contrast, keyboard access, and assistive technology support.";

        accessibilityScore = "73 / 100";

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
            ♿ Accessibility Score : ${accessibilityScore}
        </h3>

        <h3>
            😊 User Experience : ${usability}
        </h3>

        <h3>
            ⭐ Accessibility Rating : ${rating}
        </h3>

        <h3>
            🎯 Mission Score : ${score}%
        </h3>

    `;


    status.innerHTML = "Saving your accessibility decision...";


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
                "mission14"
            ),

            {

                missionNumber: 14,

                answer:
                    choice === 1
                        ? "Design B"
                        : `Design ${String.fromCharCode(65 + choice)}`,

                score: score,

                accessibilityScore: accessibilityScore,

                usability: usability,

                accessibilityRating: rating,

                category: "Accessibility",

                completed: true,

                completedAt: new Date().toISOString()

            }

        );


        missionCompleted = true;


        status.innerHTML =
            "✅ Mission 14 completed! Your accessibility decision has been saved.";


    } catch (error) {

        console.error("UI14 Firebase Error:", error);

        status.innerHTML =
            "❌ Could not save your result. Please try again.";

    }

}