import { auth, db } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ===============================
// GET HTML ELEMENTS
// ===============================

const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");


// ===============================
// VARIABLES
// ===============================

let selectedAnswer = "";
let currentUser = null;
let missionCompleted = false;


// ===============================
// CHECK LOGIN
// ===============================

onAuthStateChanged(auth, function (user) {

    if (user) {

        currentUser = user;

    } else {

        alert("Please login first.");

        window.location.href = "Login.html";

    }

});


// ===============================
// DISABLE NEXT BUTTON
// ===============================

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";


// ===============================
// OPTION SELECTION
// ===============================

options.forEach(function (option) {

    option.addEventListener("click", function () {

        // Remove previous selection
        options.forEach(function (item) {

            item.classList.remove("active");

        });


        // Select current option
        this.classList.add("active");


        // Get selected answer
        selectedAnswer =
            this.querySelector("h4").textContent.trim();


        // ===============================
        // START AI ANALYSIS
        // ===============================

        fill.style.width = "0%";

        text.textContent =
            "🤖 AI is analysing your diagnosis...";


        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";


        // Start progress animation
        setTimeout(function () {

            fill.style.width = "100%";

        }, 100);


        // ===============================
        // COMPLETE ANALYSIS
        // ===============================

        setTimeout(async function () {

            // Show result
            text.textContent =
                "✅ Diagnosis Recorded Successfully";


            // Save Mission 4
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

                            completedAt:
                                new Date().toISOString()
                        }

                    );


                    // Mark completed
                    missionCompleted = true;


                    // Enable Continue
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


                    missionCompleted = false;

                }

            } else {

                alert("Please login first.");

            }

        }, 1500);

    });

});


// ===============================
// CONTINUE TO MISSION 5
// ===============================

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

});
