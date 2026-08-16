import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
    } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

    import {
        doc,
            getDoc
            } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


            const welcomeMessage = document.getElementById("welcomeMessage");


            onAuthStateChanged(auth, async (user) => {

                if (!user) {

                        // User is not logged in
                                window.location.href = "Login.html";
                                        return;

                                            }


                                                try {

                                                        // Get current user's document
                                                                const userRef = doc(db, "users", user.uid);

                                                                        const userSnap = await getDoc(userRef);


                                                                                if (userSnap.exists()) {

                                                                                            const userData = userSnap.data();

                                                                                                        const fullName = userData.fullName;


                                                                                                                    if (fullName) {

                                                                                                                                    welcomeMessage.textContent =
                                                                                                                                                        `Welcome Back, ${fullName} 👋`;

                                                                                                                                                                    } else {

                                                                                                                                                                                    welcomeMessage.textContent =
                                                                                                                                                                                                        "Welcome Back 👋";

                                                                                                                                                                                                                    }

                                                                                                                                                                                                                            } else {

                                                                                                                                                                                                                                        // Fallback
                                                                                                                                                                                                                                                    welcomeMessage.textContent =
                                                                                                                                                                                                                                                                    "Welcome Back 👋";

                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                } catch (error) {

                                                                                                                                                                                                                                                                                        console.error("Error loading user:", error);

                                                                                                                                                                                                                                                                                                welcomeMessage.textContent =
                                                                                                                                                                                                                                                                                                            "Welcome Back 👋";

                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                });