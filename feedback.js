import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    addDoc,
    collection,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const form = document.getElementById("feedbackForm");
const ratingInput = document.getElementById("rating");
const successMessage = document.getElementById("successMessage");


// ===============================
// STAR RATING
// ===============================

const stars = document.querySelectorAll(".star");

stars.forEach(star => {

    star.addEventListener("click", () => {

        const rating = star.dataset.value;

        ratingInput.value = rating;

        stars.forEach(s => {
            s.classList.remove("selected");
        });

        for (let i = 0; i < rating; i++) {
            stars[i].classList.add("selected");
        }

    });

});


// ===============================
// CHECK LOGIN
// ===============================

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "Login.html";
    }

});


// ===============================
// SUBMIT FEEDBACK
// ===============================

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const user = auth.currentUser;

    if (!user) {
        alert("Please login first.");
        window.location.href = "Login.html";
        return;
    }


    const rating = ratingInput.value;
    const skill = document.getElementById("skill").value;
    const liked = document.getElementById("liked").value;
    const improve = document.getElementById("improve").value;

    const difficultyElement =
        document.querySelector('input[name="difficulty"]:checked');

    const recommendElement =
        document.querySelector('input[name="recommend"]:checked');


    if (!rating) {
        alert("Please select a star rating.");
        return;
    }

    if (!skill) {
        alert("Please select a skill.");
        return;
    }


    const difficulty =
        difficultyElement ? difficultyElement.value : "";

    const recommend =
        recommendElement ? recommendElement.value : "";


    try {

        await addDoc(collection(db, "feedback"), {

            userId: user.uid,
            email: user.email,

            rating: Number(rating),

            skill: skill,

            liked: liked,

            improve: improve,

            difficulty: difficulty,

            recommend: recommend,

            timestamp: serverTimestamp()

        });


        form.style.display = "none";

        successMessage.style.display = "block";


    } catch (error) {

        console.error("Error saving feedback:", error);

        alert("Failed to submit feedback. Please try again.");

    }

});
