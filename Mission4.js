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


        // Start AI analysis
        fill.style.width = "0%";

        text.textContent =
            "🤖 AI is analysing your diagnosis...";

        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";


        setTimeout(function () {
            fill.style.width = "100%";
        }, 100);


        setTimeout(async function () {

            text.textContent =
                "✅ Diagnosis Recorded Successfully";


            if (currentUser) {

                try {

                    await setDoc(
                        doc(
                            db,
                            "users",
                            currentUser.uid,
                            "missions",
                            "mission4"
                        ),
                        {
                            missionNumber: 4,
                            answer: selectedAnswer,
                            completed: true,
                            completedAt: new Date().toISOString()
                        }
                    );

                    missionCompleted = true;

                    nextBtn.disabled = false;
                    nextBtn.style.opacity = "1";

                    console.log(
                        "Mission 4 saved successfully!"
                    );

                } catch (error) {

                    console.error(
                        "Error saving Mission 4:",
                        error
                    );

                    alert(
                        "Could not save Mission 4. Please try again."
                    );

                }

            }

        }, 1500);

    });

});


// Continue to Mission 5
nextBtn.addEventListener("click", function () {

    if (selectedAnswer === "") {

        alert("Please select an option first.");
        return;

    }


    if (!missionCompleted) {

        alert(
            "Please wait until your diagnosis is saved."
        );

        return;

    }


    window.location.href = "Mission5.html";

});                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                            else{

                                                                                                                                                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                                                                                                                                                            "❌ Incorrect Diagnosis!<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Disk usage is normal.<br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Try analysing RAM utilization.";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    text.innerHTML = message;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // Next Mission

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click",function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href="Mission5.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });
