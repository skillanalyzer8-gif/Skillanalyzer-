import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const optionsContainer = document.getElementById("options");
const options = document.querySelectorAll(".option");

const progressFill =
    document.getElementById("progressFill");

const analysisText =
    document.getElementById("analysisText");

const nextBtn =
    document.getElementById("nextBtn");


const category = "softwareDevelopment";
const questionNumber = 8;
const questionId = "softwareDevelopment_q8";


/*
    Mission 8 Scoring

    Critical Payment Bug = 5
    UI Color Bug          = 4
    Text Alignment Bug    = 3
    Minor Typo Bug        = 1
*/

const scores = {

    criticalPayment: 5,
    uiColor: 4,
    textAlignment: 3,
    minorTypo: 1

};


let currentUser = null;

let selectedAnswer = "";
let selectedScore = 0;

let answerLocked = false;
let answerSaved = false;


// Disable Continue initially
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";


// Fisher-Yates shuffle
function shuffleOptions() {

    const optionElements =
        Array.from(optionsContainer.children);

    for (
        let i = optionElements.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        optionsContainer.appendChild(
            optionElements[randomIndex]
        );

    }

}


// Check logged-in user
onAuthStateChanged(auth, async function (user) {

    if (!user) {

        alert("Please login first.");

        window.location.href = "Login.html";

        return;

    }


    currentUser = user;


    console.log(
        "Mission 8 user:",
        currentUser.uid
    );


    await checkPreviousAnswer();

});


// Check whether Mission 8 was already answered
async function checkPreviousAnswer() {

    try {

        const questionRef = doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            questionId
        );


        const questionSnap =
            await getDoc(questionRef);


        if (questionSnap.exists()) {

            const data =
                questionSnap.data();


            if (data.completed === true) {

                selectedAnswer =
                    data.answer || "";

                selectedScore =
                    data.score || 0;


                answerLocked = true;
                answerSaved = true;


                showPreviouslyAnswered();


                return;

            }

        }


        // New question
        shuffleOptions();

        enableOptions();

    } catch (error) {

        console.error(
            "Error checking Mission 8 answer:",
            error
        );


        analysisText.textContent =
            "❌ Could not load your previous answer.";

    }

}


// Enable options
function enableOptions() {

    options.forEach(function (option) {

        option.addEventListener(
            "click",
            handleAnswer
        );

    });

}


// Handle answer
async function handleAnswer() {

    // 🔒 Prevent second selection
    if (answerLocked) {

        return;

    }


    if (!currentUser) {

        alert("Please login first.");

        return;

    }


    // Get stable answer ID
    selectedAnswer =
        this.dataset.answer;


    // Get score
    selectedScore =
        scores[selectedAnswer] || 0;


    // 🔒 LOCK IMMEDIATELY
    answerLocked = true;


    // Disable all options
    options.forEach(function (option) {

        option.style.pointerEvents = "none";
        option.style.opacity = "0.65";

    });


    // Highlight selected option
    this.classList.add("active");
    this.style.opacity = "1";


    // Start analysis
    progressFill.style.width = "0%";


    analysisText.textContent =
        "🧠 AI is analysing your bug prioritization decision...";


    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";


    // Show score progress
    setTimeout(function () {

        progressFill.style.width =
            `${selectedScore * 20}%`;

    }, 100);


    // Save answer
    setTimeout(async function () {

        await saveAnswer();

    }, 1500);

}


// Save Mission 8
async function saveAnswer() {

    if (!currentUser) {

        analysisText.textContent =
            "❌ Please login again.";

        return;

    }


    try {

        const questionRef = doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            questionId
        );


        await setDoc(
            questionRef,
            {

                category: category,

                questionNumber: questionNumber,

                answer: selectedAnswer,

                score: selectedScore,

                completed: true,

                completedAt:
                    new Date().toISOString()

            },
            {
                merge: true
            }
        );


        answerSaved = true;


        if (selectedAnswer === "criticalPayment") {

            analysisText.textContent =
                "✅ Excellent prioritization. A payment failure directly affects critical functionality and users' transactions.";

        } else {

            analysisText.textContent =
                "✅ Decision recorded. Critical functionality should generally receive priority over visual or minor text issues.";

        }


        nextBtn.disabled = false;
        nextBtn.style.opacity = "1";


        console.log(
            "Mission 8 saved successfully!"
        );

    } catch (error) {

        console.error(
            "Mission 8 Firebase Error:",
            error
        );


        answerSaved = false;


        analysisText.textContent =
            "❌ Mission 8 could not be saved.";


        alert(
            "Mission 8 could not be saved. Check Firebase."
        );

    }

}


// Restore previously answered Mission 8
function showPreviouslyAnswered() {

    options.forEach(function (option) {

        option.style.pointerEvents = "none";
        option.style.opacity = "0.65";


        if (
            option.dataset.answer ===
            selectedAnswer
        ) {

            option.classList.add("active");

            option.style.opacity = "1";

        }

    });


    progressFill.style.width =
        `${selectedScore * 20}%`;


    analysisText.textContent =
        `✅ Already answered — Score: ${selectedScore}/5`;


    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";

}


// Continue to Mission 9
nextBtn.addEventListener(
    "click",
    function () {

        if (!selectedAnswer) {

            alert(
                "Please select an option first."
            );

            return;

        }


        if (!answerSaved) {

            alert(
                "Please wait until Mission 8 is saved."
            );

            return;

        }


        console.log(
            "Opening Mission 9..."
        );


        window.location.href =
            "Mission9.html";

    }
);