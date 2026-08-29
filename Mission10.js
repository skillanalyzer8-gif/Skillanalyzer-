<<<<<<< HEAD
import { auth, db } from "./firebase.js";
=======
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
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
import {
    doc,
        setDoc
        } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
=======
let selectedAnswer = "";
let currentUser = null;
let missionCompleted = false;


// Check logged-in user
onAuthStateChanged(auth, function (user) {

    if (user) {

        currentUser = user;

    } else 
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
        import {
            onAuthStateChanged
            } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
=======
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
=======
// Option selection
options.forEach(function (option) {

    option.addEventListener("click", function () {
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
            const options = document.querySelectorAll(".option");
            const fill = document.querySelector(".fill");
            const text = document.querySelector(".analysis p");
            const nextBtn = document.getElementById("nextBtn");
=======
        // Remove previous selection
        options.forEach(function (item) {
            item.classList.remove("active");
        });
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
            let selectedAnswer = "";
            let currentUser = null;
            let missionCompleted = false;
=======
        // Highlight selected option
        this.classList.add("active");
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
=======
        selectedAnswer =
            this.querySelector("h4").textContent.trim();
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
            // Check logged-in user
            onAuthStateChanged(auth, function (user) {
=======
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
                if (user) {
=======
        // Start AI analysis
        fill.style.width = "0%";
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
                        currentUser = user;
=======
        text.textContent =
            "🤖 AI is analysing your final deployment decision...";
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
                            } else {
=======
        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
                                    alert("Please login first.");
                                            window.location.href = "Login.html";
=======
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
                                                }
=======
        setTimeout(function () {
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
                                                });
=======
            fill.style.width = "100%";
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
=======
        }, 100);
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
                                                // Disable button initially
                                                nextBtn.disabled = true;
                                                nextBtn.style.opacity = "0.5";
=======
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
=======
        // Save Mission 10
        setTimeout(async function () {
>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20

<<<<<<< HEAD
                                                // Option selection
                                                options.forEach(function (option) {

                                                    option.addEventListener("click", function () {

                                                            // Remove previous selection
                                                                    options.forEach(function (item) {
                                                                                item.classList.remove("active");
                                                                                        });

                                                                                                // Highlight selected option
                                                                                                        this.classList.add("active");

                                                                                                                selectedAnswer =
                                                                                                                            this.querySelector("h4").textContent.trim();


                                                                                                                                    // Start AI analysis
                                                                                                                                            fill.style.width = "0%";

                                                                                                                                                    text.textContent =
                                                                                                                                                                "🤖 AI is analysing your final deployment decision...";

                                                                                                                                                                        nextBtn.disabled = true;
                                                                                                                                                                                nextBtn.style.opacity = "0.5";


                                                                                                                                                                                        setTimeout(function () {

                                                                                                                                                                                                    fill.style.width = "100%";

                                                                                                                                                                                                            }, 100);


                                                                                                                                                                                                                    // Save Mission 10
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                "mission10"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                missionNumber: 10,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        answer: selectedAnswer,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                completed: true,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        completedAt: new Date().toISOString()
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            );


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            missionCompleted = true;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            text.textContent =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                "🎉 Mission 10 Completed Successfully!";

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

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            alert(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                "Could not save Mission 10. Please try again."
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }, 1500);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // View Developer DNA Report
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click", function () {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            if (selectedAnswer === "") {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    alert("Please select an option first.");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            return;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    if (!missionCompleted) {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            alert(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        "Please wait until your final decision is saved."
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        return;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                window.location.href = "DeveloperDNA.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });
=======
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
                        "mission10"
                    ),
                    {
                        missionNumber: 10,
                        answer: selectedAnswer,
                        completed: true,
                        completedAt: new Date().toISOString()
                    }
                );


                missionCompleted = true;

                text.textContent =
                    "🎉 Mission 10 Completed Successfully!";

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

                alert(
                    "Could not save Mission 10. Please try again."
                );

            }

        }, 1500);

    });

});


// View Developer DNA Report
nextBtn.addEventListener("click", function () {

    if (selectedAnswer === "") {

        alert("Please select an option first.");
        return;

    }


    if (!missionCompleted) {

        alert(
            "Please wait until your final decision is saved."
        );

        return;

    }


    window.location.href = "Mission11.html";

});

>>>>>>> 314a700a11b99606bf3e39ba696425fe60300b20