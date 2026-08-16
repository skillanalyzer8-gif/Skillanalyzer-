import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
    } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

    import {
        doc,
            getDoc
            } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


            // ===============================
            // DYNAMIC WELCOME NAME
            // ===============================

            const welcomeMessage = document.getElementById("welcomeMessage");

            onAuthStateChanged(auth, async (user) => {

                if (!user) {
                        window.location.href = "Login.html";
                                return;
                                    }

                                        try {

                                                const userRef = doc(db, "users", user.uid);
                                                        const userSnap = await getDoc(userRef);

                                                                if (userSnap.exists()) {

                                                                            const userData = userSnap.data();

                                                                                        if (userData.fullName) {
                                                                                                        welcomeMessage.textContent =
                                                                                                                            `Welcome Back, ${userData.fullName} 👋`;
                                                                                                                                        } else {
                                                                                                                                                        welcomeMessage.textContent =
                                                                                                                                                                            "Welcome Back 👋";
                                                                                                                                                                                        }

                                                                                                                                                                                                } else {

                                                                                                                                                                                                            welcomeMessage.textContent =
                                                                                                                                                                                                                            "Welcome Back 👋";

                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                        } catch (error) {

                                                                                                                                                                                                                                                console.error("Error loading user:", error);

                                                                                                                                                                                                                                                        welcomeMessage.textContent =
                                                                                                                                                                                                                                                                    "Welcome Back 👋";

                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                        });


                                                                                                                                                                                                                                                                        // ===============================
                                                                                                                                                                                                                                                                        // START JOURNEY
                                                                                                                                                                                                                                                                        // ===============================

                                                                                                                                                                                                                                                                        document.getElementById("startJourneyBtn").addEventListener("click", function () {

                                                                                                                                                                                                                                                                            window.location.href = "DeveloperMindset.html";

                                                                                                                                                                                                                                                                            });


                                                                                                                                                                                                                                                                            // ===============================
                                                                                                                                                                                                                                                                            // SOFTWARE DEVELOPMENT
                                                                                                                                                                                                                                                                            // ===============================

                                                                                                                                                                                                                                                                            document.getElementById("softwareCard").addEventListener("click", function () {

                                                                                                                                                                                                                                                                                window.location.href = "DeveloperMindset.html";

                                                                                                                                                                                                                                                                                });


                                                                                                                                                                                                                                                                                // ===============================
                                                                                                                                                                                                                                                                                // UI / UX DESIGN
                                                                                                                                                                                                                                                                                // ===============================

                                                                                                                                                                                                                                                                                document.getElementById("uiCard").addEventListener("click", function () {

                                                                                                                                                                                                                                                                                    window.location.href = "Ui1.html";

                                                                                                                                                                                                                                                                                    });


                                                                                                                                                                                                                                                                                    // ===============================
                                                                                                                                                                                                                                                                                    // ENTREPRENEURSHIP
                                                                                                                                                                                                                                                                                    // ===============================

                                                                                                                                                                                                                                                                                    document.getElementById("entrepreneurCard").addEventListener("click", function () {

                                                                                                                                                                                                                                                                                        window.location.href = "Enter1.html";

                                                                                                                                                                                                                                                                                        });


                                                                                                                                                                                                                                                                                        // ===============================
                                                                                                                                                                                                                                                                                        // LEADERSHIP
                                                                                                                                                                                                                                                                                        // ===============================

                                                                                                                                                                                                                                                                                        document.getElementById("leadershipCard").addEventListener("click", function () {

                                                                                                                                                                                                                                                                                            window.location.href = "Lead1.html";

                                                                                                                                                                                                                                                                                            });