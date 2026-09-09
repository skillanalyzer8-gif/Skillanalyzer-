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

        currentUser = null;

        text.textContent = "❌ Please login to continue.";

        nextBtn.disabled = true;
    }

});


// ================= OPTION SELECTION =================

options.forEach(function (option) {

    option.addEventListener("click", function () {

        // Remove active from all options
        options.forEach(function (item) {
            item.classList.remove("active");
        });


        // Highlight selected option
        this.classList.add("active");


        // Get selected answer
        selectedAnswer =
            this.querySelector("h4").textContent.trim();


        // Reset mission status
        missionCompleted = false;


        // Start AI analysis
        fill.style.width = "0%";

        text.textContent =
            "🤖 AI is analysing your final deployment decision...";


        // Disable button while saving
        nextBtn.disabled = true;

        nextBtn.style.opacity = "0.5";


        // Show progress
        setTimeout(function () {

            fill.style.width = "100%";

        }, 100);


        // ================= SAVE TO FIREBASE =================

        setTimeout(async function () {

            if (!currentUser) {

                text.textContent =
                    "❌ Please login again.";

                nextBtn.disabled = true;

                return;
            }


            try {

                await setDoc(
                    doc(
                        db,
                        "users",
                        currentUser.uid,
                        "missions",
                        "mission10"
                    ),
                    {
                        missionNumber: 10,

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
                    "🎉 Mission 10 Completed Successfully!";


                // Enable next button
                nextBtn.disabled = false;

                nextBtn.style.opacity = "1";


                console.log(
                    "Mission 10 saved successfully!"
                );


            } catch (error) {

                console.error(
                    "Error saving Mission 10:",
                    error
                );


                missionCompleted = false;


                text.textContent =
                    "❌ Could not save your final decision.";


                nextBtn.disabled = true;

                nextBtn.style.opacity = "0.5";


                alert(
                    "Could not save Mission 10. Please try again."
                );

            }

        }, 1500);

    });

});


// ================= NEXT BUTTON =================

nextBtn.addEventListener("click", function () {

    // No option selected
    if (selectedAnswer === "") {

        alert("Please select an option first.");

        return;
    }


    // Firebase save not completed
    if (!missionCompleted) {

        alert(
            "Please wait until your final decision is saved."
        );

        return;
    }


    // Go to next page
    window.location.href = "Mission11.html";

});