import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const options = document.querySelectorAll(".option");
const statusText = document.getElementById("statusText");
const fill = document.querySelector(".fill");
const nextBtn = document.getElementById("nextBtn");

const category = "entrepreneurship";
const questionNumber = 7;
const questionId = "entrepreneurship_q7";

const correctAnswer = "technical";

const scores = {
    technical: 5,
    friend: 2,
    famous: 1,
    largeTeam: 3
};

let currentUser = null;
let selectedAnswer = null;
let selectedScore = 0;
let missionCompleted = false;
let answerSaved = false;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        await checkPreviousAnswer();
    } else {
        alert("Please login first.");
        window.location.href = "Login.html";
    }
});

async function checkPreviousAnswer() {
    try {
        const missionRef = doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            questionId
        );

        const missionSnap = await getDoc(missionRef);

        if (missionSnap.exists()) {
            const data = missionSnap.data();

            if (data.completed === true) {
                selectedAnswer = data.answer;
                selectedScore = Number(data.score) || 0;

                missionCompleted = true;
                answerSaved = true;

                lockOptions(
                    selectedAnswer,
                    data.correct
                );

                statusText.textContent =
                    data.correct
                        ? "✅ Excellent! Mission 7 already completed."
                        : "⚠️ Mission 7 already completed. You can continue.";

                fill.style.width = "100%";
                nextBtn.disabled = false;
            }
        }
    } catch (error) {
        console.error(
            "Enter7 Previous Answer Error:",
            error
        );
    }
}

options.forEach((option) => {
    option.addEventListener("click", async () => {

        if (!currentUser) {
            alert("Please login first.");
            return;
        }

        if (missionCompleted) return;
        if (answerSaved) return;

        selectedAnswer =
            option.dataset.answer;

        selectedScore =
            scores[selectedAnswer] || 0;

        const isCorrect =
            selectedAnswer === correctAnswer;

        lockOptions(
            selectedAnswer,
            isCorrect
        );

        if (isCorrect) {
            statusText.textContent =
                "✅ Excellent! A skilled developer fills an important technical skill gap and helps build the product.";
        } else {
            statusText.textContent =
                "❌ Good attempt. Strong startup teams should be built around important skill gaps and relevant expertise.";
        }

        fill.style.width = "100%";

        const saved =
            await saveAnswer(isCorrect);

        if (saved) {
            answerSaved = true;
            missionCompleted = true;
            nextBtn.disabled = false;
        }
    });
});

function lockOptions(selected, isCorrect) {

    options.forEach((option) => {

        option.disabled = true;

        if (
            option.dataset.answer === selected
        ) {
            option.style.border =
                isCorrect
                    ? "2px solid #00ff88"
                    : "2px solid #ff4d4d";
        }

        if (
            option.dataset.answer === correctAnswer
        ) {
            option.style.opacity = "1";
        } else {
            option.style.opacity = "0.55";
        }
    });
}

async function saveAnswer(isCorrect) {

    try {

        await setDoc(
            doc(
                db,
                "users",
                currentUser.uid,
                "missions",
                questionId
            ),
            {
                category: category,
                questionNumber: questionNumber,
                answer: selectedAnswer,
                score: selectedScore,
                correct: isCorrect,
                completed: true,
                completedAt:
                    new Date().toISOString()
            }
        );

        return true;

    } catch (error) {

        console.error(
            "Enter7 Firebase Save Error:",
            error
        );

        statusText.textContent =
            "❌ Could not save your answer. Please try again.";

        options.forEach((option) => {
            option.disabled = false;
            option.style.opacity = "1";
            option.style.border = "";
        });

        return false;
    }
}

nextBtn.addEventListener(
    "click",
    () => {

        if (!answerSaved) return;

        window.location.href =
            "Enter8.html";
    }
);
