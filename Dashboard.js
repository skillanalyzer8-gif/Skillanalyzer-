// ================= FIREBASE IMPORTS =================

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ================= HTML ELEMENTS =================

const welcomeMessage =
    document.getElementById("welcomeMessage");

const startJourneyBtn =
    document.getElementById("startJourneyBtn");

const softwareCard =
    document.getElementById("softwareCard");

const uiCard =
    document.getElementById("uiCard");

const entrepreneurCard =
    document.getElementById("entrepreneurCard");

const leadershipCard =
    document.getElementById("leadershipCard");


// ================= CHECK LOGIN =================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        // User is not logged in
        window.location.href = "Login.html";

        return;
    }


    // ================= GET USER DATA =================

    try {

        const userRef = doc(db, "users", user.uid);

        const userSnapshot = await getDoc(userRef);


        if (userSnapshot.exists()) {

            const userData = userSnapshot.data();

            const fullName =
                userData.fullName || "User";

            welcomeMessage.textContent =
                `Welcome Back, ${fullName} 👋`;

        } else {

            // If user document doesn't exist
            welcomeMessage.textContent =
                "Welcome Back 👋";
        }


    } catch (error) {

        console.error(
            "Error getting user data:",
            error
        );

        welcomeMessage.textContent =
            "Welcome Back 👋";
    }

});


// ================= START JOURNEY =================

if (startJourneyBtn) {

    startJourneyBtn.addEventListener("click", () => {

        window.location.href =
            "DeveloperMindset.html";

    });

}


// ================= SOFTWARE DEVELOPMENT =================

if (softwareCard) {

    softwareCard.addEventListener("click", () => {

        window.location.href =
            "DeveloperMindset.html";

    });

}


// ================= UI / UX =================

if (uiCard) {

    uiCard.addEventListener("click", () => {

        window.location.href =
            "Ui1.html";

    });

}


// ================= ENTREPRENEURSHIP =================

if (entrepreneurCard) {

    entrepreneurCard.addEventListener("click", () => {

        window.location.href =
            "Enter1.html";

    });

}


// ================= LEADERSHIP =================

if (leadershipCard) {

    leadershipCard.addEventListener("click", () => {

        window.location.href =
            "Lead1.html";

    });

}
