import { auth } from "./firebase.js";
import { saveMissionAnswer } from "./missionFirebase.js";

const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

let selectedAnswer = "";


// Disable Next button initially
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";


// When an option is selected
options.forEach(option => {

    option.addEventListener("click", function () {

        // Remove previous selection
        options.forEach(opt => {
            opt.classList.remove("active");
        });

        // Select current option
        this.classList.add("active");

        // Get selected answer
        selectedAnswer = this.querySelector("h4").textContent.trim();

        // Reset analysis
        fill.style.width = "0%";
        text.innerHTML = "🤖 AI is analysing your decision...";

        // Disable Next during analysis
        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";

        // Start progress animation
        setTimeout(() => {
            fill.style.width = "100%";
        }, 100);

        // Analysis completed
        setTimeout(() => {

            text.innerHTML = "✅ Decision Recorded Successfully";

            nextBtn.disabled = false;
            nextBtn.style.opacity = "1";

        }, 1500);

    });

});


// Next Mission
nextBtn.addEventListener("click", async function () {

    // Make sure an answer was selected
    if (selectedAnswer === "") {

        alert("Please select an option first.");

        return;
    }


    // Check logged-in Firebase user
    const user = auth.currentUser;

    if (!user) {

        alert("Please login first.");

        window.location.href = "Login.html";

        return;
    }


    try {

        // Save Mission 1 answer
        await saveMissionAnswer(
            user.uid,
            "software",
            1,
            selectedAnswer
        );


        // Confirm successful save
        alert("Mission 1 answer saved successfully!");


        // Go to Mission 2
        window.location.href = "Mission2.html";


    } catch (error) {

        console.error("Firebase error:", error);

        alert(
            "Could not save your answer. Please try again."
        );

    }

});                                                                                                                                                                                                                                                                                                                                                                                     });                                                                                                                                                                               });