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

    status.innerHTML = "Loading typography styles...";

    navigator.vibrate?.([100, 80, 100]);

    setTimeout(showTypographyStyles, 1800);

});


// ===============================
// SHOW TYPOGRAPHY OPTIONS
// ===============================

function showTypographyStyles() {

    designArea.innerHTML = `

        <h2>📰 Choose The Best Typography</h2>

        <p>
            Which typography style provides the best
            reading experience for a news application?
        </p>


        <div class="typographyCard">

            <h3>Typography A</h3>

            <p>
                🎨 Decorative typeface<br>
                ❌ Difficult to read in long articles<br>
                ❌