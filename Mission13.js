import { auth, db } from "./firebase.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ================= ELEMENTS =================

const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");


// ================= VARIABLES =================

let selectedAnswer = "";
let currentUser = null;
let missionCompleted = false;


// ================= CHECK LOGIN =================

onAuthStateChanged(auth, function (user) {

    if (user) {

        currentUser = user;

    } else {

        alert("Please login first.");
        window.location.href = "Login.html";

    }

});


// ================= INITIAL BUTTON =================

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";


// ================= OPTION CLICK =================

options.forEach(function (option) {

    option.addEventListener("click", function () {

        // Remove selection from all options
        options.forEach(function (item) {
            item.classList.remove("active");
        });


        // Select clicked option
        this.classList.add("active");


        // IMPORTANT:
        // Your HTML uses <h4>, not <span>
        const answerElement = this.querySelector("h4");

        if (!answerElement) {
            console.error("h4 not found inside option");
            return;
        }


        selectedAnswer = answerElement.textContent.trim();


        // Reset completion
        missionCompleted = false;


        // Start analysis
        fill.style.width = "0%";

        text.textContent =
            "🤖 AI is analysing your debugging skill...";


        // Disable Continue while saving
        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";


        // Progress animation
        setTimeout(function () {

            fill.style.width = "100%";

        }, 100);


        // ================= SAVE TO FIREBASE =================

        setTimeout(async function () {

            if (!currentUser) {

                text.textContent =
                    "❌ Please login again.";

                return;
            }


            try {

                await setDoc(
                    doc(
                        db,
                        "users",
                        currentUser.uid,
                        "missions",
                        "mission13"
                    ),
                    {
                        missionNumber: 13,

                        answer: selectedAnswer,

                        completed: true,

                        completedAt:
                            new Date().toISOString()
                    }
                );


                // Mission completed
                missionCompleted = true;


                // Success message
                text.textContent =
                    "✅ Debugging Decision Recorded Successfully";


                // Enable button
                nextBtn.disabled = false;
                nextBtn.style.opacity = "1";


                console.log(
                    "Mission 13 saved successfully!"
                );


            } catch (error) {

                console.error(
                    "Error saving Mission 13:",
                    error
                );


                missionCompleted = false;

                nextBtn.disabled = true;
                nextBtn.style.opacity = "0.5";


                text.textContent =
                    "❌ Could not save your decision.";


                alert(
                    "Could not save Mission 13. Please try again."
                );

            }

        }, 1500);

    });

});


// ================= NEXT BUTTON =================

nextBtn.addEventListener("click", function () {

    // Check selection
    if (selectedAnswer === "") {

        alert("Please select an option first.");

        return;
    }


    // Check Firebase save
    if (!missionCompleted) {

        alert(
            "Please wait until your answer is saved."
        );

        return;
    }


    // Go to Mission 14
    window.location.href = "Mission14.html";

});