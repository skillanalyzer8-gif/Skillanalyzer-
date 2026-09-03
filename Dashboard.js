import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ======================================
// HELPER
// ======================================

function goTo(page) {
    window.location.href = page;
}


// ======================================
// PROGRESS
// ======================================

function updateProgress(value) {

    let progress = Number(value);

    if (isNaN(progress)) {
        progress = 0;
    }

    progress = Math.max(
        0,
        Math.min(100, progress)
    );

    document.getElementById(
        "progressFill"
    ).style.width = progress + "%";

    document.getElementById(
        "progressPercent"
    ).textContent = progress + "%";


    const progressText =
        document.getElementById("progressText");


    if (progress === 0) {

        progressText.textContent =
            "Complete your first mission to start your journey.";

    } else if (progress === 100) {

        progressText.textContent =
            "Amazing! You completed your Skill Analyzer journey.";

    } else {

        progressText.textContent =
            `${progress}% completed. Keep going and discover your strengths!`;

    }
}


// ======================================
// FIREBASE AUTHENTICATION
// ======================================

onAuthStateChanged(auth, async (user) => {

    // USER NOT LOGGED IN
    if (!user) {

        goTo("Login.html");

        return;
    }


    try {

        // GET USER DOCUMENT
        const userRef = doc(
            db,
            "users",
            user.uid
        );

        const userSnap =
            await getDoc(userRef);


        if (userSnap.exists()) {

            const userData =
                userSnap.data();


            // ==========================
            // WELCOME NAME
            // ==========================

            const welcomeMessage =
                document.getElementById(
                    "welcomeMessage"
                );


            if (userData.fullName) {

                welcomeMessage.textContent =
                    `Welcome Back, ${userData.fullName} 👋`;

            } else {

                welcomeMessage.textContent =
                    "Welcome Back 👋";
            }


            // ==========================
            // PROGRESS
            // ==========================

            updateProgress(
                userData.progress ??
                userData.missionCompletion ??
                0
            );


            // ==========================
            // AI ANALYSIS
            // ==========================

            document.getElementById(
                "observationStat"
            ).textContent =
                userData.observation ?? "--";


            document.getElementById(
                "decisionStat"
            ).textContent =
                userData.decision ?? "--";


            document.getElementById(
                "leadershipStat"
            ).textContent =
                userData.leadership ?? "--";


        } else {

            document.getElementById(
                "welcomeMessage"
            ).textContent =
                "Welcome Back 👋";

            updateProgress(0);
        }


    } catch (error) {

        console.error(
            "Error loading user data:",
            error
        );

        document.getElementById(
            "welcomeMessage"
        ).textContent =
            "Welcome Back 👋";

        updateProgress(0);
    }

});


// ======================================
// START JOURNEY
// ======================================

document
    .getElementById("startJourneyBtn")
    .addEventListener(
        "click",
        () => {

            goTo(
                "DeveloperMindset.html"
            );

        }
    );


// ======================================
// SOFTWARE DEVELOPMENT
// ======================================

document
    .getElementById("softwareCard")
    .addEventListener(
        "click",
        () => {

            goTo(
                "DeveloperMindset.html"
            );

        }
    );


// ======================================
// UI / UX
// ======================================

document
    .getElementById("uiCard")
    .addEventListener(
        "click",
        () => {

            goTo(
                "Ui1.html"
            );

        }
    );


// ======================================
// ENTREPRENEURSHIP
// ======================================

document
    .getElementById("entrepreneurCard")
    .addEventListener(
        "click",
        () => {

            goTo(
                "Enter1.html"
            );

        }
    );


// ======================================
// LEADERSHIP
// ======================================

document
    .getElementById("leadershipCard")
    .addEventListener(
        "click",
        () => {

            goTo(
                "Lead1.html"
            );

        }
    );


// ======================================
// PROFILE
// ======================================

document
    .getElementById("profileBtn")
    .addEventListener(
        "click",
        () => {

            goTo(
                "Profile.html"
            );

        }
    );
