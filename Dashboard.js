import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
    } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

    import {
        doc,
            getDoc
            } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


            const welcomeMessage = document.getElementById("welcomeMessage");


            // Check who is currently logged in
            onAuthStateChanged(auth, async (user) => {

                if (!user) {

                        // No logged-in user
                                window.location.href = "Login.html";
                                        return;

                                            }

                                                try {

                                                        // Get user's data from Firestore
                                                                const userRef = doc(db, "users", user.uid);
                                                                        const userSnap = await getDoc(userRef);

                                                                                if (userSnap.exists()) {

                                                                                            const userData = userSnap.data();

                                                                                                        const name = userData.fullName || userData.name;

                                                                                                                    if (name) {

                                                                                                                                    welcomeMessage.textContent =
                                                                                                                                                        `Welcome Back, ${name} 👋`;

                                                                                                                                                                    } else {

                                                                                                                                                                                    welcomeMessage.textContent =
                                                                                                                                                                                                        "Welcome Back 👋";

                                                                                                                                                                                                                    }

                                                                                                                                                                                                                            } else {

                                                                                                                                                                                                                                        // Fallback if user document doesn't exist
                                                                                                                                                                                                                                                    welcomeMessage.textContent =
                                                                                                                                                                                                                                                                    `Welcome Back, ${user.email.split("@")[0]} 👋`;

                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                } catch (error) {

                                                                                                                                                                                                                                                                                        console.error("Could not load user data:", error);

                                                                                                                                                                                                                                                                                                welcomeMessage.textContent =
                                                                                                                                                                                                                                                                                                            "Welcome Back 👋";

                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                });


                                                                                                                                                                                                                                                                                                                // Start Journey
                                                                                                                                                                                                                                                                                                                document.getElementById("startJourneyBtn").addEventListener("click", function () {

                                                                                                                                                                                                                                                                                                                    window.location.href = "DeveloperMindset.html";

                                                                                                                                                                                                                                                                                                                    });


                                                                                                                                                                                                                                                                                                                    // Mission Categories

                                                                                                                                                                                                                                                                                                                    document.getElementById("softwareCard").addEventListener("click", function () {

                                                                                                                                                                                                                                                                                                                        window.location.href = "DeveloperMindset.html";

                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                        document.getElementById("uiCard").addEventListener("click", function () {

                                                                                                                                                                                                                                                                                                                            window.location.href = "Ui1.html";

                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                            document.getElementById("entrepreneurCard").addEventListener("click", function () {

                                                                                                                                                                                                                                                                                                                                window.location.href = "Enter1.html";

                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                document.getElementById("leadershipCard").addEventListener("click", function () {

                                                                                                                                                                                                                                                                                                                                    window.location.href = "Lead1.html";

                                                                                                                                                                                                                                                                                                                                    });