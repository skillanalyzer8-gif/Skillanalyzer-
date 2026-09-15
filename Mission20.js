import { auth, db } from "./firebase.js";

import {
doc,
getDoc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ===============================
// MISSION CONFIGURATION
// ===============================

const category = "softwareDevelopment";
const questionNumber = 20;
const questionId = "softwareDevelopment_q20";

// ===============================
// SCORE SYSTEM
// ===============================

const scores = {

analyzeLogs: 5,

restartEverything: 3,

deployAnyway: 1,

ignoreError: 1

};

// ===============================
// HTML ELEMENTS
// ===============================

const options = document.querySelectorAll(".option");

const statusText = document.getElementById("statusText");

const progressFill = document.querySelector(".fill");

const reportBtn = document.getElementById("reportBtn");

const report = document.getElementById("report");

const overallScore = document.getElementById("overallScore");

const problemSolving = document.getElementById("problemSolving");

const debugging = document.getElementById("debugging");

const logicalThinking = document.getElementById("logicalThinking");

const decisionMaking = document.getElementById("decisionMaking");

const verdict = document.getElementById("verdict");

const finishBtn = document.getElementById("finishBtn");

// ===============================
// STATE
// ===============================

let currentUser = null;

let selectedAnswer = null;

let selectedScore = 0;

let answerLocked = false;

let answerSaved = false;

// ===============================
// INITIAL STATE
// ===============================

reportBtn.disabled = true;

report.style.display = "none";

// ===============================
// CHECK PREVIOUS ANSWER
// ===============================

async function checkPreviousAnswer() {

if (!currentUser) return;

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

        selectedAnswer = data.answer;

        selectedScore = data.score || 0;

        answerLocked = true;

        answerSaved = true;


        // Highlight saved answer

        options.forEach(option => {

            if (option.dataset.answer === selectedAnswer) {

                option.classList.add("selected");

            } else {

                option.style.opacity = "0.5";

            }

        });


        progressFill.style.width = "100%";


        statusText.textContent =
            "✅ Final answer already saved. You can generate your Developer DNA Report.";


        reportBtn.disabled = false;

    }

} catch (error) {

    console.error(
        "Error checking previous Mission 20 answer:",
        error
    );

}

}

// ===============================
// SAVE MISSION 20 ANSWER
// ===============================

async function saveAnswer() {

if (!currentUser || !selectedAnswer) return false;

try {

    const missionRef = doc(
        db,
        "users",
        currentUser.uid,
        "missions",
        questionId
    );


    await setDoc(
        missionRef,
        {

            category: category,

            questionNumber: questionNumber,

            answer: selectedAnswer,

            score: selectedScore,

            correct: selectedAnswer === "analyzeLogs",

            completed: true,

            completedAt: new Date()

        },
        {
            merge: true
        }
    );


    answerSaved = true;

    reportBtn.disabled = false;


    statusText.textContent =
        "✅ Final answer saved! You can now generate your Developer DNA Report.";


    return true;

} catch (error) {

    console.error(
        "Error saving Mission 20:",
        error
    );


    statusText.textContent =
        "❌ Could not save your answer. Please try again.";


    return false;

}

}

// ===============================
// OPTION CLICK
// ===============================

options.forEach(option => {

option.addEventListener("click", async () => {

    if (answerLocked) return;


    selectedAnswer =
        option.dataset.answer;


    selectedScore =
        scores[selectedAnswer] || 0;


    answerLocked = true;


    // Visual selection

    options.forEach(item => {

        if (item === option) {

            item.classList.add("selected");

        } else {

            item.style.opacity = "0.5";

        }

    });


    // Progress animation

    progressFill.style.width = "100%";


    statusText.textContent =
        "🤖 Analyzing your final developer decision...";


    // Small delay for animation

    await new Promise(resolve =>
        setTimeout(resolve, 1200)
    );


    await saveAnswer();

});

});

// ===============================
// GET MISSION SCORES
// ===============================

async function getMissionScores() {

const missionScores = [];


for (let i = 1; i <= 20; i++) {

    const id =
        `softwareDevelopment_q${i}`;


    try {

        const missionRef = doc(
            db,
            "users",
            currentUser.uid,
            "missions",
            id
        );


        const missionSnap =
            await getDoc(missionRef);


        if (missionSnap.exists()) {

            const data =
                missionSnap.data();


            missionScores.push({

                mission: i,

                score: Number(data.score) || 0

            });

        } else {

            missionScores.push({

                mission: i,

                score: 0

            });

        }

    } catch (error) {

        console.error(
            `Error reading Mission ${i}:`,
            error
        );


        missionScores.push({

            mission: i,

            score: 0

        });

    }

}


return missionScores;

}

// ===============================
// CALCULATE SKILL SCORE
// ===============================

function calculateSkillScore(
missionScores,
missionNumbers
) {

let total = 0;

let count = 0;


missionNumbers.forEach(number => {

    const mission =
        missionScores.find(
            item => item.mission === number
        );


    if (mission) {

        total += mission.score;

        count++;

    }

});


if (count === 0) return 0;


// Maximum = 5 points per mission

return Math.round(
    (total / (count * 5)) * 100
);

}

// ===============================
// GENERATE DEVELOPER DNA REPORT
// ===============================

async function generateReport() {

if (!currentUser) {

    statusText.textContent =
        "❌ Please login first.";

    return;

}


if (!answerSaved) {

    statusText.textContent =
        "⚠️ Please select an answer first.";

    return;

}


reportBtn.disabled = true;


statusText.textContent =
    "🤖 Generating your Developer DNA Report...";


try {

    const missionScores =
        await getMissionScores();


    // ===========================
    // OVERALL SCORE
    // ===========================

    let totalScore = 0;


    missionScores.forEach(mission => {

        totalScore += mission.score;

    });


    const overallPercentage =
        Math.round(
            (totalScore / 100) * 100
        );


    // ===========================
    // SKILL GROUPS
    // ===========================

    const problemSolvingScore =
        calculateSkillScore(
            missionScores,
            [1, 4, 7, 10, 14, 19]
        );


    const debuggingScore =
        calculateSkillScore(
            missionScores,
            [3, 6, 11, 16, 20]
        );


    const logicalThinkingScore =
        calculateSkillScore(
            missionScores,
            [2, 5, 8, 13, 17]
        );


    const decisionMakingScore =
        calculateSkillScore(
            missionScores,
            [9, 12, 15, 18]
        );


    // ===========================
    // DISPLAY SCORES
    // ===========================

    overallScore.textContent =
        `${overallPercentage}%`;


    problemSolving.value =
        problemSolvingScore;


    debugging.value =
        debuggingScore;


    logicalThinking.value =
        logicalThinkingScore;


    decisionMaking.value =
        decisionMakingScore;


    // ===========================
    // DEVELOPER VERDICT
    // ===========================

    let developerLevel = "";

    let message = "";


    if (overallPercentage >= 85) {

        developerLevel =
            "Advanced Developer";

        message =
            "Excellent software development thinking. You demonstrated strong problem solving, debugging and decision-making skills.";

    }

    else if (overallPercentage >= 70) {

        developerLevel =
            "Strong Developer";

        message =
            "You demonstrated good programming logic and software development thinking. Keep improving your problem-solving skills.";

    }

    else if (overallPercentage >= 50) {

        developerLevel =
            "Developing Developer";

        message =
            "You have a good foundation. Continue practicing programming logic, debugging and problem solving.";

    }

    else {

        developerLevel =
            "Beginner Developer";

        message =
            "You are building your foundation. Keep practicing programming concepts and logical problem solving.";

    }


    verdict.innerHTML = `

        Congratulations!

        You completed all 20 missions.

        <br><br>

        ${message}

        <br><br>

        You are classified as

        <b>${developerLevel}.</b>

    `;


    // ===========================
    // SHOW REPORT
    // ===========================

    report.style.display = "block";


    statusText.textContent =
        "🏆 Developer DNA Report generated successfully!";


    // ===========================
    // SAVE REPORT TO FIRESTORE
    // ===========================

    const reportRef = doc(

        db,

        "users",

        currentUser.uid,

        "reports",

        "developerDNA"

    );


    await setDoc(

        reportRef,

        {

            overallScore:
                overallPercentage,

            problemSolving:
                problemSolvingScore,

            debugging:
                debuggingScore,

            logicalThinking:
                logicalThinkingScore,

            decisionMaking:
                decisionMakingScore,

            developerLevel:
                developerLevel,

            completedMissions:
                20,

            generatedAt:
                new Date()

        },

        {
            merge: true
        }

    );


    reportBtn.disabled = false;

} catch (error) {

    console.error(
        "Error generating Developer DNA:",
        error
    );


    statusText.textContent =
        "❌ Unable to generate the report. Please try again.";


    reportBtn.disabled = false;

}

}

// ===============================
// REPORT BUTTON
// ===============================

reportBtn.addEventListener(
"click",
generateReport
);

// ===============================
// FINISH ASSESSMENT
// ===============================

finishBtn.addEventListener(
"click",
() => {

    window.location.href =
        "Dashboard.html";

}

);

// ===============================
// AUTHENTICATION
// ===============================

onAuthStateChanged(
auth,
async user => {

    if (!user) {

        window.location.href =
            "Login.html";

        return;

    }


    currentUser = user;


    console.log(
        "Logged in user:",
        currentUser.uid
    );


    await checkPreviousAnswer();

}

);
