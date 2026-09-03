import { auth, db } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


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

    status.innerHTML =
        "Loading microinteraction examples...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showMicrointeractions, 1800);

});


// ===============================
// SHOW MICROINTERACTION OPTIONS
// ===============================

function showMicrointeractions() {

    designArea.innerHTML = `

        <h2>✨ Choose The Best Interaction Design</h2>

        <p>
            Which microinteraction provides the best
            experience for a social media application?
        </p>


        <div class="microCard">

            <h3>Interaction A</h3>

            <p>
                ❤️ Like button has no visual response<br>
                ❌ User cannot tell if the action worked<br>
                ❌ Interface feels unresponsive
            </p>

        </div>


        <div class="microCard">

            <h3>Interaction B</h3>

            <p>
                ❤️ Like button gives immediate visual feedback<br>
                ✅ Smooth button animation<br>
                ✅ Loading indicators appear when needed<br>
                ✅ Feedback is quick and subtle
            </p>

        </div>


        <div class="microCard">

            <h3>Interaction C</h3>

            <p>
                🎆 Large animations after every action<br>
                ❌ Distracting effects<br>
                ❌ Slows down the experience
            </p>

        </div>


        <div class="microCard">

            <h3>Interaction D</h3>

            <p>
                🔔 Constant notifications and animations<br>
                ❌ Too many interruptions<br>
                ❌ Users lose focus
            </p>

        </div>

    `;


    document
        .querySelectorAll(".microCard")
        .forEach((card, index) => {

            card.addEventListener("click", () => {

                reviewMicrointeraction(index);

            });

        });

}


// ===============================
// REVIEW USER CHOICE
// ===============================

async function reviewMicrointeraction(choice) {

    if (missionCompleted) return;


    if (!currentUser) {

        alert("Please login first.");
        window.location.href = "Login.html";

        return;

    }


    let title = "";
    let message = "";
    let responsiveness = "";
    let satisfaction = "";
    let rating = "";
    let score = 0;


    // ===============================
    // CORRECT ANSWER → B
    // ===============================

    if (choice === 1) {

        title = "🏆 Excellent Microinteraction Design";

        message =
            "Excellent! Small, fast and purposeful interactions make interfaces feel responsive without distracting users.";

        responsiveness = "99 / 100";

        satisfaction = "98%";

        rating = "★★★★★";

        score = 100;

    }


    // ===============================
    // WRONG ANSWER
    // ===============================

    else {

        title = "⚠ Interaction Needs Improvement";

        message =
            "Good microinteractions should provide useful feedback while remaining subtle. Excessive or missing feedback can reduce usability.";

        responsiveness = "73 / 100";

        satisfaction = "79%";

        rating = "★★★☆☆";

        score = 70;

    }


    // ===============================
    // DISPLAY RESULT
    // ===============================

    designArea.innerHTML = `

        <h2>${title}</h2>

        <br>

        <p>
            ${message}
        </p>

        <br>

        <h3>
            ⚡ Interface Responsiveness : ${responsiveness}
        </h3>

        <h3>
            😊 User Satisfaction : ${satisfaction}
        </h3>

        <h3>
            ⭐ Interaction Rating : ${rating}
        </h3>

        <h3>
            🎯 Mission Score : ${score}%
        </h3>

    `;


    status.innerHTML =
        "Saving your interaction decision...";


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
                "mission18"
            ),

            {

                missionNumber: 18,

                answer:
                    choice === 1
                        ? "Interaction B"
                        : `Interaction ${String.fromCharCode(65 + choice)}`,

                score: score,

                responsiveness: responsiveness,

                satisfaction: satisfaction,

                interactionRating: rating,

                category: "Microinteractions",

                completed: true,

                completedAt:
                    new Date().toISOString()

            }

        );


        missionCompleted = true;


        status.innerHTML =
            "✅ Mission 18 completed! Your interaction decision has been saved.";

    }


    catch (error) {

        console.error(
            "UI18 Firebase Error:",
            error
        );

        status.innerHTML =
            "❌ Could not save your result. Please try again.";

    }

}
