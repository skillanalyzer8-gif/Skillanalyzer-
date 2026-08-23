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

        options.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

        selectedAnswer =
            this.querySelector("h4").textContent.trim();


        // Start analysis
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

            if (currentUser) {

                try {

                    await setDoc(
                        doc(
                            db,
                            "users",
                            currentUser.uid,
                            "missions",
                            "mission3"
                        ),
                        {
                            missionNumber: 3,
                            answer: selectedAnswer,
                            completed: true,
                            completedAt: new Date().toISOString()
                        }
                    );

                    missionCompleted = true;

                    nextBtn.disabled = false;
                    nextBtn.style.opacity = "1";

                    console.log(
                        "Mission 3 saved successfully!"
                    );

                } catch (error) {

                    console.error(
                        "Error saving Mission 3:",
                        error
                    );

                    alert(
                        "Could not save Mission 3. Please try again."
                    );

                }

            }

        }, 1500);

    });

});


// Continue to Mission 4
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

    window.location.href = "Mission4.html";

});                                                                                                                                                        if (this.querySelector("h4").innerText === "Restore Latest Backup") {

                                                                                                                                                                        message = "✅ Excellent! Recovery Planning +20";

                                                                                                                                                                                    } else if (this.querySelector("h4").innerText === "Identify Corrupted Tables") {

                                                                                                                                                                                                    message = "✅ Great! Database Knowledge +18";

                                                                                                                                                                                                                } else if (this.querySelector("h4").innerText === "Shutdown Application") {

                                                                                                                                                                                                                                message = "⚠ Acceptable! System Protection +10";

                                                                                                                                                                                                                                            } else {

                                                                                                                                                                                                                                                            message = "❌ Poor Decision! Customer Trust -20";

                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                    text.innerHTML = message;

                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                    }, 1800);

                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                        // Go to Mission 4
                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click", function () {

                                                                                                                                                                                                                                                                                                                            window.location.href = "Mission4.html";

                                                                                                                                                                                                                                                                                                                            });
