import { auth, db } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

let selectedAnswer = "";
let currentUser = null;
let missionCompleted = false;


// Check logged-in user
onAuthStateChanged(auth, function (user) {

    if (user) {

        currentUser = user;

    } else {

        alert("Please login first.");
        window.location.href = "Login.html";

    }

});


// Disable Continue initially
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";


// Option selection
options.forEach(function (option) {

    option.addEventListener("click", function () {

        // Remove previous selection
        options.forEach(function (item) {
            item.classList.remove("active");
        });

        // Select current option
        this.classList.add("active");

        selectedAnswer =
            this.querySelector("h4").textContent.trim();


        // Start AI analysis UI
        fill.style.width = "0%";

        text.textContent =
            "🤖 AI is analysing your decision...";


        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";


        setTimeout(function () {

            fill.style.width = "100%";

        }, 100);


        setTimeout(async function () {

            text.textContent =
                "✅ Decision Recorded Successfully";


            // Enable button
            nextBtn.disabled = false;
            nextBtn.style.opacity = "1";


            // Save answer to Firebase
            if (currentUser) {

                try {

                    await setDoc(
                        doc(
                            db,
                            "users",
                            currentUser.uid,
                            "missions",
                            "mission2"
                        ),
                        {
                            missionNumber: 2,
                            answer: selectedAnswer,
                            completed: true,
                            completedAt: new Date().toISOString()
                        }
                    );

                    missionCompleted = true;

                    console.log(
                        "Mission 2 saved successfully!"
                    );

                } catch (error) {

                    console.error(
                        "Error saving Mission 2:",
                        error
                    );

                    alert(
                        "Could not save Mission 2. Please try again."
                    );

                    missionCompleted = false;

                }

            }

        }, 1500);

    });

});


// Continue to Mission 3
nextBtn.addEventListener("click", function () {

    if (selectedAnswer === "") {

        alert("Please select an option first.");
        return;

    }


    if (!missionCompleted) {

        alert(
            "Please wait until your decision is saved."
        );

        return;

    }


    // Open Mission 3
    window.location.href = "Mission3.html";

});
                                                                                                                                                        if (this.querySelector("h4").innerText === "Notify Customers") {

                                                                                                                                                                        message = "✅ Excellent! Customer Trust +20";

                                                                                                                                                                                    } else if (this.querySelector("h4").innerText === "Investigate Gateway Logs") {

                                                                                                                                                                                                    message = "✅ Great! Critical Thinking +18";

                                                                                                                                                                                                                } else if (this.querySelector("h4").innerText === "Rollback Deployment") {

                                                                                                                                                                                                                                message = "✅ Good! Decision Making +15";

                                                                                                                                                                                                                                            } else {

                                                                                                                                                                                                                                                            message = "⚠ Risky Choice! AI suggests reviewing customer impact.";

                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                    text.innerHTML = message;

                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                    }, 1800);

                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                        // Go to Mission 3
                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click", function () {

                                                                                                                                                                                                                                                                                                                            window.location.href = "Mission3.html";

                                                                                                                                                                                                                                                                                                                            });
