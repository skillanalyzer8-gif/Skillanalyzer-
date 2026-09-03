import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ===============================
// GET HTML ELEMENTS
// ===============================

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

// ===============================
// CHECK LOGIN
// ===============================

onAuthStateChanged(auth, async function (user) {

if (!user) {

    window.location.href = "Login.html";

        return;

        }


        try {

            const userRef =
                    doc(db, "users", user.uid);

                        const userSnap =
                                await getDoc(userRef);


                                    if (userSnap.exists()) {

                                            const userData =
                                                        userSnap.data();

                                                                const fullName =
                                                                            userData.fullName;


                                                                                    if (fullName) {

                                                                                                welcomeMessage.textContent =
                                                                                                                `Welcome Back, ${fullName} 👋`;

                                                                                                                        } else {

                                                                                                                                    welcomeMessage.textContent =
                                                                                                                                                    "Welcome Back 👋";

                                                                                                                                                            }

                                                                                                                                                                } else {

                                                                                                                                                                        welcomeMessage.textContent =
                                                                                                                                                                                    "Welcome Back 👋";

                                                                                                                                                                                        }

                                                                                                                                                                                        } catch (error) {

                                                                                                                                                                                            console.error(
                                                                                                                                                                                                    "Dashboard Firebase Error:",
                                                                                                                                                                                                            error
                                                                                                                                                                                                                );

                                                                                                                                                                                                                    welcomeMessage.textContent =
                                                                                                                                                                                                                            "Welcome Back 👋";

                                                                                                                                                                                                                            }

                                                                                                                                                                                                                            });

                                                                                                                                                                                                                            // ===============================
                                                                                                                                                                                                                            // START JOURNEY
                                                                                                                                                                                                                            // ===============================

                                                                                                                                                                                                                            startJourneyBtn.addEventListener(
                                                                                                                                                                                                                            "click",
                                                                                                                                                                                                                            function () {

                                                                                                                                                                                                                                document.querySelector(
                                                                                                                                                                                                                                        ".categories"
                                                                                                                                                                                                                                            ).scrollIntoView({
                                                                                                                                                                                                                                                    behavior: "smooth"
                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                        );

                                                                                                                                                                                                                                                        // ===============================
                                                                                                                                                                                                                                                        // SOFTWARE DEVELOPMENT
                                                                                                                                                                                                                                                        // ===============================

                                                                                                                                                                                                                                                        softwareCard.addEventListener(
                                                                                                                                                                                                                                                        "click",
                                                                                                                                                                                                                                                        function () {

                                                                                                                                                                                                                                                            window.location.href =
                                                                                                                                                                                                                                                                    "DeveloperMindset.html";

                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                    );

                                                                                                                                                                                                                                                                    // ===============================
                                                                                                                                                                                                                                                                    // UI / UX DESIGN
                                                                                                                                                                                                                                                                    // ===============================

                                                                                                                                                                                                                                                                    uiCard.addEventListener(
                                                                                                                                                                                                                                                                    "click",
                                                                                                                                                                                                                                                                    function () {

                                                                                                                                                                                                                                                                        window.location.href =
                                                                                                                                                                                                                                                                                "Ui1.html";

                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                                // ===============================
                                                                                                                                                                                                                                                                                // ENTREPRENEURSHIP
                                                                                                                                                                                                                                                                                // ===============================

                                                                                                                                                                                                                                                                                entrepreneurCard.addEventListener(
                                                                                                                                                                                                                                                                                "click",
                                                                                                                                                                                                                                                                                function () {

                                                                                                                                                                                                                                                                                    window.location.href =
                                                                                                                                                                                                                                                                                            "Enter1.html";

                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                            );

                                                                                                                                                                                                                                                                                            // ===============================
                                                                                                                                                                                                                                                                                            // LEADERSHIP
                                                                                                                                                                                                                                                                                            // ===============================

                                                                                                                                                                                                                                                                                            leadershipCard.addEventListener(
                                                                                                                                                                                                                                                                                            "click",
                                                                                                                                                                                                                                                                                            function () {

                                                                                                                                                                                                                                                                                                window.location.href =
                                                                                                                                                                                                                                                                                                        "Lead1.html";

                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                        );