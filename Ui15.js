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

    status.innerHTML = "Loading responsive layouts...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showResponsiveLayouts, 1800);

});


// ===============================
// SHOW RESPONSIVE OPTIONS
// ===============================

function showResponsiveLayouts() {

    designArea.innerHTML = `

        <h2>🛒 Choose The Best Responsive Layout</h2>

        <p>
            Which layout provides the best experience
            across phones, tablets and desktops?
        </p>


        <div class="responsiveCard">

            <h3>Layout A</h3>

            <p>
                📱 Fixed desktop-width layout<br>
                ❌ Content gets cut off on small screens<br>
                ❌ Requires excessive horizontal scrolling
            </p>

        </div>


        <div class="responsiveCard">

            <h3>Layout B</h3>

            <p>
                📱 Fluid responsive layout<br>
                ✅ Content adapts to different screen sizes<br>
                ✅ Flexible images and navigation<br>
                ✅ Comfortable on mobile, tablet and desktop
            </p>

        </div>


        <div class="responsiveCard">

            <h3>Layout C</h3>

            <p>
                🖥 Desktop-focused layout<br>
                ❌ Small controls on mobile<br>
                ❌ Difficult touch interaction
            </p>

        </div>


        <div class="responsiveCard">

            <h3>Layout D</h3>

            <p>
                🔄 Separate random layouts<br>
                ❌ Inconsistent experience between devices<br>
                ❌ Content hierarchy changes unnecessarily
            </p>

        </div>

    `;


    document
        .querySelectorAll(".responsiveCard")
        .forEach((card, index) => {

            card.addEventListener("click", () => {

                reviewResponsiveLayout(index);

            });

        });

}


// ===============================
// REVIEW RESPONSIVE LAYOUT
// ===============================

async function reviewResponsiveLayout(choice) {

    if (missionCompleted) return;


    if (!currentUser) {

        alert("Please login first.");
        window.location.href = "Login.html";

        return;

    }


    let title = "";
    let message = "";
    let adaptability = "";
    let usability = "";
    let rating = "";
    let score = 0;


    // Layout B = Correct answer
    if (choice === 1) {

        title = "🏆 Excellent Responsive Design Choice";

        message =
            "Excellent! A responsive layout adapts content, navigation, images, and controls to different screen sizes while maintaining a consistent user experience.";

        adaptability = "99 / 100";

        usability = "97%";

        rating = "★★★★★";

        score = 100;

    } else {

        title = "⚠ Responsive Design Needs Improvement";

        message =
            "Good responsive design should adapt to different screen sizes without making content difficult to read, navigate, or interact with.";

        adaptability = "73 / 100";

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
            📱 Device Adaptability : ${adaptability}
        </h3>

        <h3>
            😊 User Experience : ${usability}
        </h3>

        <h3>
            ⭐ Responsive Design Rating : ${rating}
        </h3>

        <h3>
            🎯 Mission Score : ${score}%
        </h3>

    `;


    status.innerHTML = "Saving your responsive design decision...";


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
                "mission15"
            ),

            {

                missionNumber: 15,

                answer:
                    choice === 1
                        ? "Layout B"
                        : `Layout ${String.fromCharCode(65 + choice)}`,

                score: score,

                deviceAdaptability: adaptability,

                usability: usability,

                responsiveRating: rating,

                category: "Responsive Design",

                completed: true,

                completedAt: new Date().toISOString()

            }

        );


        missionCompleted = true;


        status.innerHTML =
            "✅ Mission 15 completed! Your responsive design decision has been saved.";


    } catch (error) {

        console.error("UI15 Firebase Error:", error);

        status.innerHTML =
            "❌ Could not save your result. Please try again.";

    }

}
