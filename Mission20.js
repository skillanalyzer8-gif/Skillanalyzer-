import { auth, db } from "./firebase.js";

import {
    doc,
    setDoc,
    getDocs,
    collection
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ======================================
// ELEMENTS
// ======================================

const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");

const reportBtn = document.getElementById("reportBtn");
const report = document.getElementById("report");
const finishBtn = document.getElementById("finishBtn");


// ======================================
// VARIABLES
// ======================================

let selectedAnswer = "";
let currentUser = null;
let missionCompleted = false;


// ======================================
// INITIAL STATE
// ======================================

reportBtn.disabled = true;
reportBtn.style.opacity = "0.5";


// Hide report initially
report.style.display = "none";


// ======================================
// CHECK LOGIN
// ======================================

onAuthStateChanged(auth, function (user) {

    if (user) {

        currentUser = user;

        console.log("Logged in:", user.uid);

    } else {

        alert("Please login first.");

        window.location.href = "Login.html";

    }

});


// ======================================
// OPTION SELECTION
// ======================================

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
            this.textContent.trim();


        console.log(
            "Mission 20 answer:",
            selectedAnswer
        );


        // Reset progress
        fill.style.width = "0%";


        text.textContent =
            "🤖 AI is analysing your final answer...";


        reportBtn.disabled = true;
        reportBtn.style.opacity = "0.5";

        missionCompleted = false;


        // ==================================
        // PROGRESS ANIMATION
        // ==================================

        setTimeout(function () {

            fill.style.width = "100%";

        }, 100);


        // ==================================
        // AI ANALYSIS
        // ==================================

        setTimeout(async function () {

            let message = "";


            if (
                selectedAnswer ===
                "📊 Analyze Error Logs"
            ) {

                message =
                    "✅ Excellent! Strong debugging and problem-solving mindset.";

            }

            else if (
                selectedAnswer ===
                "🔄 Restart Everything"
            ) {

                message =
                    "⚠ Reasonable recovery action, but the root cause should be investigated first.";

            }

            else if (
                selectedAnswer ===
                "🚀 Deploy Anyway"
            ) {

                message =
                    "⚠ Risky Choice! Deployment should not continue while the application is unstable.";

            }

            else {

                message =
                    "❌ Poor Decision! Production errors should never be ignored.";

            }


            text.textContent = message;


            // ==================================
            // SAVE MISSION 20
            // ==================================

            if (!currentUser) {

                alert("User not logged in.");

                return;

            }


            try {

                await setDoc(

                    doc(
                        db,
                        "users",
                        currentUser.uid,
                        "missions",
                        "mission20"
                    ),

                    {
                        missionNumber: 20,

                        answer: selectedAnswer,

                        completed: true,

                        completedAt:
                            new Date().toISOString()
                    }

                );


                missionCompleted = true;


                reportBtn.disabled = false;
                reportBtn.style.opacity = "1";


                console.log(
                    "Mission 20 saved successfully!"
                );


            }

            catch (error) {

                console.error(
                    "Mission 20 Firebase error:",
                    error
                );


                alert(
                    "Could not save Mission 20. Please try again."
                );

            }


        }, 1500);

    });

});


// ======================================
// GENERATE DEVELOPER DNA REPORT
// ======================================

reportBtn.addEventListener("click", async function () {

    if (!missionCompleted) {

        alert(
            "Please complete Mission 20 first."
        );

        return;

    }


    // Show report
    report.style.display = "block";


    // Scroll to report
    report.scrollIntoView({
        behavior: "smooth"
    });


    // ==================================
    // CALCULATE SCORE FROM MISSIONS
    // ==================================

    let completedMissions = 0;


    if (currentUser) {

        try {

            const missionsRef =
                collection(
                    db,
                    "users",
                    currentUser.uid,
                    "missions"
                );


            const snapshot =
                await getDocs(missionsRef);


            snapshot.forEach(function (doc) {

                const data = doc.data();


                if (data.completed === true) {

                    completedMissions++;

                }

            });


            console.log(
                "Completed missions:",
                completedMissions
            );

        }

        catch (error) {

            console.error(
                "Could not calculate missions:",
                error
            );

        }

    }


    // ==================================
    // REPORT SCORE
    // ==================================

    let score = 92;


    if (completedMissions >= 20) {

        score = 92;

    }

    else if (completedMissions >= 15) {

        score = 85;

    }

    else if (completedMissions >= 10) {

        score = 78;

    }


    // Update score
    const scoreElement =
        report.querySelector(".scoreCard h1");


    if (scoreElement) {

        scoreElement.textContent =
            score + "%";

    }


    // ==================================
    // SAVE FINAL REPORT
    // ==================================

    if (currentUser) {

        try {

            await setDoc(

                doc(
                    db,
                    "users",
                    currentUser.uid,
                    "developerReport",
                    "final"
                ),

                {
                    overallScore: score,

                    completedMissions:
                        completedMissions,

                    problemSolving: 95,

                    debugging: 90,

                    logicalThinking: 93,

                    decisionMaking: 88,

                    verdict:
                        "Advanced Developer",

                    generatedAt:
                        new Date().toISOString()
                }

            );


            console.log(
                "Developer DNA Report saved!"
            );

        }

        catch (error) {

            console.error(
                "Report save error:",
                error
            );

        }

    }

});


// ======================================
// FINISH ASSESSMENT
// ======================================

finishBtn.addEventListener("click", async function () {

    if (!currentUser) {

        alert("Please login first.");

        return;

    }


    try {

        // Save assessment completion
        await setDoc(

            doc(
                db,
                "users",
                currentUser.uid
            ),

            {
                assessmentCompleted: true,

                assessmentCompletedAt:
                    new Date().toISOString()
            },

            {
                merge: true
            }

        );


        console.log(
            "Assessment completed!"
        );


        // Go to final report page
        window.location.href =
            "DeveloperDNA.html";

    }

    catch (error) {

        console.error(
            "Finish assessment error:",
            error
        );


        alert(
            "Could not finish assessment. Please try again."
        );

    }

});