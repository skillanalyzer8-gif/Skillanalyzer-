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

    status.innerHTML = "Loading wireframe layouts...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showWireframes, 1800);

});


// ===============================
// SHOW WIREFRAME OPTIONS
// ===============================

function showWireframes() {

    designArea.innerHTML = `

        <h2>🏦 Choose The Best Wireframe</h2>

        <p>
            Which wireframe creates the clearest user journey
            for a mobile banking application?
        </p>


        <div class="wireframeCard">

            <h3>Wireframe A</h3>

            <p>
                🏦 Account balance hidden in menu<br>
                ❌ Important actions are difficult to find<br>
                ❌ Poor user flow
            </p>

        </div>


        <div class="wireframeCard">

            <h3>Wireframe B</h3>

            <p>
                💰 Balance clearly visible<br>
                ✅ Send Money and Pay Bills easily accessible<br>
                ✅ Clear and logical user journey
            </p>

        </div>


        <div class="wireframeCard">

            <h3>Wireframe C</h3>

            <p>
                📋 Many options on the first screen<br>
                ❌ Too much information<br>
                ❌ Difficult to prioritize actions
            </p>

        </div>


        <div class="wireframeCard">

            <h3>Wireframe D</h3>

            <p>
                🎨 Focuses heavily on decoration<br>
                ❌ Important banking actions are unclear<br>
                ❌ Weak task flow
            </p>

        </div>

    `;


    document
        .querySelectorAll(".wireframeCard")
        .forEach((card, index) => {

            card.addEventListener("click", () => {

                reviewWireframe(index);

            });

        });

}


// ===============================
// REVIEW WIREFRAME
// ===============================

async function reviewWireframe(choice) {

    if (missionCompleted) return;


    if (!currentUser) {

        alert("Please login first.");
        window.location.href = "Login.html";

        return;

    }


    let title = "";
    let message = "";
    let userFlow = "";
    let usability = "";
    let rating = "";
    let score = 0;


    // Wireframe B = Correct answer
    if (choice === 1) {

        title = "🏆 Excellent Wireframe Choice";

        message =
            "Excellent! A strong wireframe makes important information visible and guides users through tasks in a clear, logical order.";

        userFlow = "99 / 100";

        usability = "97%";

        rating = "★★★★★";

        score = 100;

    } else {

        title = "⚠ Wireframe Needs Improvement";

        message =
            "A good wireframe should prioritize important content, support clear task flows, and make essential actions easy to find.";

        userFlow = "73 / 100";

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
            🧭 User Flow : ${userFlow}
        </h3>

        <h3>
            😊 Usability : ${usability}
        </h3>

        <h3>
            ⭐ Wireframe Rating : ${rating}
        </h3>

        <h3>
            🎯 Mission Score : ${score}%
        </h3>

    `;


    status.innerHTML = "Saving your wireframe decision...";


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
                "mission11"
            ),

            {

                missionNumber: 11,

                answer:
                    choice === 1
                        ? "Wireframe B"
                        : `Wireframe ${String.fromCharCode(65 + choice)}`,

                score: score,

                userFlow: userFlow,

                usability: usability,

                wireframeRating: rating,

                category: "Wireframe Design",

                completed: true,

                completedAt: new Date().toISOString()

            }

        );


        missionCompleted = true;


        status.innerHTML =
            "✅ Mission 11 completed! Your wireframe decision has been saved.";


    } catch (error) {

        console.error("UI11 Firebase Error:", error);

        status.innerHTML =
            "❌ Could not save your result. Please try again.";

    }

}