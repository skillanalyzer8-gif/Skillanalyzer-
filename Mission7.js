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


        // AI analysis
        fill.style.width = "0%";

        text.textContent =
            "🤖 AI is analysing your cloud decision...";

        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";


        setTimeout(function () {
            fill.style.width = "100%";
        }, 100);


        setTimeout(async function () {

            text.textContent =
                "✅ Cloud Decision Recorded Successfully";


            if (currentUser) {

                try {

                    await setDoc(
                        doc(
                            db,
                            "users",
                            currentUser.uid,
                            "missions",
                            "mission7"
                        ),
                        {
                            missionNumber: 7,
                            answer: selectedAnswer,
                            completed: true,
                            completedAt: new Date().toISOString()
                        }
                    );

                    missionCompleted = true;

                    nextBtn.disabled = false;
                    nextBtn.style.opacity = "1";

                    console.log(
                        "Mission 7 saved successfully!"
                    );

                } catch (error) {

                    console.error(
                        "Error saving Mission 7:",
                        error
                    );

                    alert(
                        "Could not save Mission 7. Please try again."
                    );

                }

            }

        }, 1500);

    });

});


// Continue to Mission 8
nextBtn.addEventListener("click", function () {

    if (selectedAnswer === "") {

        alert("Please select an option first.");
        return;

    }

    if (!missionCompleted) {

        alert(
            "Please wait until your cloud decision is saved."
        );

        return;

    }

    window.location.href = "Mission8.html";

});
                                                                                                                                                                    if(answer === "Scale Servers"){

                                                                                                                                                                                    message =
                                                                                                                                                                                                    "✅ Excellent Decision!<br><br>" +
                                                                                                                                                                                                                    "Cloud Computing +20<br>" +
                                                                                                                                                                                                                                    "Scalability +18<br>" +
                                                                                                                                                                                                                                                    "Developer DNA Updated";

                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                            else if(answer === "Optimize Performance"){

                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                            "👍 Good Decision!<br><br>" +
                                                                                                                                                                                                                                                                                                                            "Performance Optimization +15";

                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                    else if(answer === "Block New Users"){

                                                                                                                                                                                                                                                                                                                                                                    message =
                                                                                                                                                                                                                                                                                                                                                                                    "⚠ Temporary Solution!<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                    "Availability may be affected.";

                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                            else{

                                                                                                                                                                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                                                                                                                                                                            "❌ Critical Mistake!<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Server Crash Risk +100%<br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Customer Satisfaction -20";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    text.innerHTML = message;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // Continue to Mission 8

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href = "Mission8.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });
