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
        "Analyzing personalization systems...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showPersonalizationSystems, 1800);

});


// ===============================
// SHOW PERSONALIZATION OPTIONS
// ===============================

function showPersonalizationSystems() {

    designArea.innerHTML = `

        <h2>🎵 Choose The Best Personalized Experience</h2>

        <p>
            Which experience provides the most useful
            personalization for a music streaming application?
        </p>


        <div class="personalCard">

            <h3>Personalization A</h3>

            <p>
                🎵 Shows the same songs to every user<br>
                ❌ No user preferences<br>
                ❌ No listening history
            </p>

        </div>


        <div class="personalCard">

            <h3>Personalization B</h3>

            <p>
                🎧 Recommends music based on listening history<br>
                ✅ Learns user preferences<br>
                ✅ Creates personalized playlists<br>
                ✅ Shows relevant artists and songs
            </p>

        </div>


        <div class="personalCard">

            <h3>Personalization C</h3>

            <p>
                🌈 Random recommendations<br>
                ❌ Unrelated content<br>
                ❌ Does not consider user interests
            </p>

        </div>


        <div class="personalCard">

            <h3>Personalization D</h3>

            <p>
                📋 Shows every available feature equally<br>
                ❌ Too much irrelevant content<br>
                ❌ No adaptation to user behavior
            </p>

        </div>

    `;


    document
        .querySelectorAll(".personalCard")
        .forEach((card, index) => {

            card.addEventListener("click", () => {

                reviewPersonalization(index);

            });

        });

}


// ===============================
// REVIEW USER CHOICE
// ===============================

async function reviewPersonalization(choice) {

    if (missionCompleted) return;


    if (!currentUser) {

        alert("Please login first.");
        window.location.href = "Login.html";

        return;

    }


    let title = "";
    let message = "";
    let relevance = "";
    let satisfaction = "";
    let rating = "";
    let score = 0;


    // ===============================
    // CORRECT ANSWER → B
    // ===============================

    if (choice === 1) {

        title = "🏆 Excellent Personalization";

        message =
            "Excellent! Using listening history and user preferences helps the app provide relevant music recommendations and a more useful experience.";

        relevance = "99 / 100";

        satisfaction = "98%";

        rating = "★★★★★";

        score = 100;

    }


    // ===============================
    // WRONG ANSWER
    // ===============================

    else {

        title = "⚠ Personalization Needs Improvement";

        message =
            "Effective personalization should consider user interests and behavior to provide relevant content instead of treating every user the same.";

        relevance = "73 / 100";

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
            🎯 Content Relevance : ${relevance}
        </h3>

        <h3>
            😊 User Satisfaction : ${satisfaction}
        </h3>

        <h3>
            ⭐ Personalization Rating : ${rating}
        </h3>

        <h3>
            🎯 Mission Score : ${score}%
        </h3>

    `;


    status.innerHTML =
        "Saving your personalization decision...";


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
                "mission19"
            ),

            {

                missionNumber: 19,

                answer:
                    choice === 1
                        ? "Personalization B"
                        : `Personalization ${String.fromCharCode(65 + choice)}`,

                score: score,

                relevance: relevance,

                satisfaction: satisfaction,

                personalizationRating: rating,

                category: "Personalization",

                completed: true,

                completedAt:
                    new Date().toISOString()

            }

        );


        missionCompleted = true;


        status.innerHTML =
            "✅ Mission 19 completed! Your personalization decision has been saved.";

    }


    catch (error) {

        console.error(
            "UI19 Firebase Error:",
            error
        );

        status.innerHTML =
            "❌ Could not save your result. Please try again.";

    }

}
