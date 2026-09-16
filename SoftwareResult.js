// ============================================
// SOFTWARE DEVELOPMENT RESULT
// SoftwareResult.js
// ============================================

import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ============================================
// CONSTANTS
// ============================================

const category = "softwareDevelopment";

const totalMissions = 20;

const maxScorePerMission = 5;

const maximumScore =
    totalMissions * maxScorePerMission;


// ============================================
// HTML ELEMENTS
// ============================================

const loadingSection =
    document.getElementById("loadingSection");

const loadingText =
    document.getElementById("loadingText");

const errorSection =
    document.getElementById("errorSection");

const errorText =
    document.getElementById("errorText");

const resultSection =
    document.getElementById("resultSection");

const profileTitle =
    document.getElementById("profileTitle");

const profileDescription =
    document.getElementById("profileDescription");

const scoreNumber =
    document.getElementById("scoreNumber");

const totalScore =
    document.getElementById("totalScore");

const missionsCompleted =
    document.getElementById("missionsCompleted");

const averageScore =
    document.getElementById("averageScore");

const strengthList =
    document.getElementById("strengthList");

const improvementList =
    document.getElementById("improvementList");

const missionGrid =
    document.getElementById("missionGrid");

const finalHeading =
    document.getElementById("finalHeading");

const finalDescription =
    document.getElementById("finalDescription");

const dashboardBtn =
    document.getElementById("dashboardBtn");

const backDashboardBtn =
    document.getElementById("backDashboardBtn");

const continueBtn =
    document.getElementById("continueBtn");


// ============================================
// HIDE RESULT INITIALLY
// ============================================

loadingSection.style.display = "block";

errorSection.style.display = "none";

resultSection.style.display = "none";


// ============================================
// AUTHENTICATION
// ============================================

onAuthStateChanged(
    auth,
    async function (user) {

        if (!user) {

            showError(
                "Your login session was not found. Please login again."
            );

            return;
        }


        try {

            await generateSoftwareResult(user);

        } catch (error) {

            console.error(
                "Software Result Error:",
                error
            );

            showError(
                "Unable to generate your Software Development result."
            );

        }

    }
);


// ============================================
// GENERATE RESULT
// ============================================

async function generateSoftwareResult(user) {

    loadingText.textContent =
        "Checking your 20 completed missions...";


    const missionResults = [];

    let totalScore = 0;

    let completedCount = 0;


    // ========================================
    // READ ALL 20 MISSIONS
    // ========================================

    for (
        let missionNumber = 1;
        missionNumber <= totalMissions;
        missionNumber++
    ) {

        loadingText.textContent =
            `Reading Mission ${missionNumber} of ${totalMissions}...`;


        const questionId =
            `${category}_q${missionNumber}`;


        const questionRef =
            doc(
                db,
                "users",
                user.uid,
                "missions",
                questionId
            );


        const questionSnapshot =
            await getDoc(questionRef);


        // ====================================
        // MISSION EXISTS
        // ====================================

        if (questionSnapshot.exists()) {

            const data =
                questionSnapshot.data();


            if (data.completed === true) {

                const score =
                    Number(data.score) || 0;


                missionResults.push({

                    missionNumber:
                        missionNumber,

                    answer:
                        data.answer || "",

                    score:
                        score,

                    completed:
                        true

                });


                totalScore += score;

                completedCount++;

            } else {

                missionResults.push({

                    missionNumber:
                        missionNumber,

                    answer:
                        "",

                    score:
                        0,

                    completed:
                        false

                });

            }

        } else {

            missionResults.push({

                missionNumber:
                    missionNumber,

                answer:
                    "",

                score:
                    0,

                completed:
                    false

            });

        }

    }


    // ========================================
    // CHECK ALL 20 COMPLETED
    // ========================================

    if (completedCount < totalMissions) {

        showError(
            `You have completed ${completedCount} of ${totalMissions} missions. Please complete all Software Development missions before viewing your result.`
        );

        return;

    }


    // ========================================
    // CALCULATE PERCENTAGE
    // ========================================

    const percentage =
        Math.round(
            (totalScore / maximumScore) * 100
        );


    // ========================================
    // AVERAGE
    // ========================================

    const average =
        totalScore / totalMissions;


    // ========================================
    // PROFILE
    // ========================================

    const profile =
        getDeveloperProfile(percentage);


    // ========================================
    // DISPLAY BASIC RESULT
    // ========================================

    totalScore.textContent =
        `${totalScore} / ${maximumScore}`;


    missionsCompleted.textContent =
        `${completedCount} / ${totalMissions}`;


    averageScore.textContent =
        `${average.toFixed(2)} / 5`;


    profileTitle.textContent =
        profile.title;


    profileDescription.textContent =
        profile.description;


    finalHeading.textContent =
        profile.finalHeading;


    finalDescription.textContent =
        profile.finalDescription;


    // ========================================
    // ANIMATE SCORE
    // ========================================

    animateNumber(
        scoreNumber,
        0,
        percentage,
        1400
    );


    // ========================================
    // CALCULATE SKILLS
    // ========================================

    const skills =
        calculateSkills(
            missionResults
        );


    updateSkill(
        "problemSolving",
        skills.problemSolving
    );


    updateSkill(
        "debugging",
        skills.debugging
    );


    updateSkill(
        "logicalThinking",
        skills.logicalThinking
    );


    updateSkill(
        "decisionMaking",
        skills.decisionMaking
    );


    // ========================================
    // STRENGTHS
    // ========================================

    displayStrengths(
        percentage,
        skills
    );


    // ========================================
    // IMPROVEMENTS
    // ========================================

    displayImprovements(
        percentage,
        skills
    );


    // ========================================
    // MISSION BREAKDOWN
    // ========================================

    displayMissionBreakdown(
        missionResults
    );


    // ========================================
    // SAVE RESULT
    // ========================================

    await saveResult(
        user,
        totalScore,
        percentage,
        profile,
        skills,
        missionResults
    );


    // ========================================
    // SHOW RESULT
    // ========================================

    loadingSection.style.display =
        "none";

    resultSection.style.display =
        "block";

}


// ============================================
// DEVELOPER PROFILE
// ============================================

function getDeveloperProfile(percentage) {


    if (percentage >= 85) {

        return {

            title:
                "Advanced Developer Thinker",

            description:
                "Your decisions show a strong engineering mindset with structured problem solving, debugging awareness, logical reasoning and technical decision making.",

            finalHeading:
                "You Think Like an Engineer",

            finalDescription:
                "Your mission decisions demonstrate an approach based on investigation, logic and solving the underlying problem instead of simply reacting to symptoms."

        };

    }


    if (percentage >= 70) {

        return {

            title:
                "Strong Developer Thinker",

            description:
                "You demonstrate a solid software development mindset with good technical reasoning and problem-solving habits.",

            finalHeading:
                "Your Engineering Mindset Is Developing Strongly",

            finalDescription:
                "You have built a strong foundation in technical decision making. Continue practicing debugging and system-level reasoning."

        };

    }


    if (percentage >= 50) {

        return {

            title:
                "Developing Developer",

            description:
                "Your results show a developing software engineering mindset. More practice with debugging, logic and structured problem solving can strengthen your skills.",

            finalHeading:
                "Your Developer Journey Is Growing",

            finalDescription:
                "Keep practicing real programming problems and technical decision making. Each problem you solve will strengthen your engineering thinking."

        };

    }


    return {

        title:
            "Emerging Developer",

        description:
            "You are beginning to develop your software engineering mindset. Focus on understanding problems carefully before taking action.",

        finalHeading:
            "Every Developer Starts Somewhere",

        finalDescription:
            "Use these results as a starting point. Build your programming fundamentals, practice debugging and gradually improve your problem-solving approach."

    };

}


// ============================================
// CALCULATE SKILLS
// ============================================

function calculateSkills(missions) {


    /*
       We divide the 20 missions into
       four groups of five.

       1–5   = Problem Solving
       6–10  = Debugging
       11–15 = Logical Thinking
       16–20 = Decision Making

       Each group has maximum:
       5 missions × 5 points = 25
    */


    let problemSolvingScore = 0;

    let debuggingScore = 0;

    let logicalThinkingScore = 0;

    let decisionMakingScore = 0;


    missions.forEach(
        function (mission) {

            if (
                mission.missionNumber >= 1 &&
                mission.missionNumber <= 5
            ) {

                problemSolvingScore +=
                    mission.score;

            }


            else if (
                mission.missionNumber >= 6 &&
                mission.missionNumber <= 10
            ) {

                debuggingScore +=
                    mission.score;

            }


            else if (
                mission.missionNumber >= 11 &&
                mission.missionNumber <= 15
            ) {

                logicalThinkingScore +=
                    mission.score;

            }


            else if (
                mission.missionNumber >= 16 &&
                mission.missionNumber <= 20
            ) {

                decisionMakingScore +=
                    mission.score;

            }

        }
    );


    return {

        problemSolving:
            Math.round(
                (problemSolvingScore / 25) * 100
            ),

        debugging:
            Math.round(
                (debuggingScore / 25) * 100
            ),

        logicalThinking:
            Math.round(
                (logicalThinkingScore / 25) * 100
            ),

        decisionMaking:
            Math.round(
                (decisionMakingScore / 25) * 100
            )

    };

}


// ============================================
// UPDATE SKILL BAR
// ============================================

function updateSkill(
    skillName,
    value
) {


    const valueElement =
        document.getElementById(
            `${skillName}Value`
        );


    const barElement =
        document.getElementById(
            `${skillName}Bar`
        );


    if (!valueElement || !barElement) {

        return;

    }


    valueElement.textContent =
        `${value}%`;


    setTimeout(
        function () {

            barElement.style.width =
                `${value}%`;

        },
        150
    );

}


// ============================================
// DISPLAY STRENGTHS
// ============================================

function displayStrengths(
    percentage,
    skills
) {


    strengthList.innerHTML = "";


    const strengths = [];


    if (
        skills.problemSolving >= 75
    ) {

        strengths.push(
            "Strong problem investigation"
        );

    }


    if (
        skills.debugging >= 75
    ) {

        strengths.push(
            "Good debugging mindset"
        );

    }


    if (
        skills.logicalThinking >= 75
    ) {

        strengths.push(
            "Strong logical reasoning"
        );

    }


    if (
        skills.decisionMaking >= 75
    ) {

        strengths.push(
            "Confident technical decisions"
        );

    }


    if (strengths.length === 0) {

        strengths.push(
            "Willingness to solve technical problems"
        );

        strengths.push(
            "Developing engineering awareness"
        );

    }


    strengths.forEach(
        function (strength) {

            const item =
                document.createElement("div");


            item.className =
                "trait";


            item.innerHTML = `
                <i class="fa-solid fa-check"></i>
                ${strength}
            `;


            strengthList.appendChild(item);

        }
    );

}


// ============================================
// DISPLAY IMPROVEMENTS
// ============================================

function displayImprovements(
    percentage,
    skills
) {


    improvementList.innerHTML = "";


    const improvements = [];


    if (
        skills.problemSolving < 75
    ) {

        improvements.push(
            "Practice breaking large problems into smaller steps"
        );

    }


    if (
        skills.debugging < 75
    ) {

        improvements.push(
            "Practice reading errors and tracing bugs systematically"
        );

    }


    if (
        skills.logicalThinking < 75
    ) {

        improvements.push(
            "Practice algorithms, patterns and logical reasoning"
        );

    }


    if (
        skills.decisionMaking < 75
    ) {

        improvements.push(
            "Practice evaluating technical trade-offs before acting"
        );

    }


    if (improvements.length === 0) {

        improvements.push(
            "Continue solving increasingly difficult engineering problems"
        );

        improvements.push(
            "Build real-world software projects"
        );

    }


    improvements.forEach(
        function (improvement) {

            const item =
                document.createElement("div");


            item.className =
                "trait";


            item.innerHTML = `
                <i class="fa-solid fa-arrow-up"></i>
                ${improvement}
            `;


            improvementList.appendChild(item);

        }
    );

}


// ============================================
// MISSION BREAKDOWN
// ============================================

function displayMissionBreakdown(
    missions
) {


    missionGrid.innerHTML = "";


    missions.forEach(
        function (mission) {

            const card =
                document.createElement("div");


            card.className =
                "missionCard";


            card.innerHTML = `

                <div class="missionNumber">
                    MISSION ${mission.missionNumber}
                </div>

                <div class="missionScore">
                    ${mission.score}/5
                </div>

                <div class="missionLabel">
                    Completed
                </div>

            `;


            missionGrid.appendChild(card);

        }
    );

}


// ============================================
// SAVE RESULT TO FIRESTORE
// ============================================

async function saveResult(
    user,
    totalScore,
    percentage,
    profile,
    skills,
    missions
) {


    try {

        const resultRef =
            doc(
                db,
                "users",
                user.uid,
                "reports",
                "softwareDevelopment"
            );


        await setDoc(
            resultRef,
            {

                category:
                    category,

                totalScore:
                    totalScore,

                maximumScore:
                    maximumScore,

                percentage:
                    percentage,

                missionsCompleted:
                    totalMissions,

                profileTitle:
                    profile.title,

                profileDescription:
                    profile.description,

                skills:
                    skills,

                missionScores:
                    missions.map(
                        function (mission) {

                            return {

                                missionNumber:
                                    mission.missionNumber,

                                answer:
                                    mission.answer,

                                score:
                                    mission.score

                            };

                        }
                    ),

                completed:
                    true,

                completedAt:
                    new Date().toISOString()

            }
        );


        console.log(
            "Software Development result saved."
        );


        // ====================================
        // ALSO UPDATE USER DOCUMENT
        // ====================================

        const userRef =
            doc(
                db,
                "users",
                user.uid
            );


        await setDoc(
            userRef,
            {

                softwareDevelopmentCompleted:
                    true,

                softwareDevelopmentFinalScore:
                    totalScore,

                softwareDevelopmentPercentage:
                    percentage,

                softwareDevelopmentProfile:
                    profile.title,

                softwareDevelopmentCompletedAt:
                    new Date().toISOString()

            },

            {
                merge: true
            }
        );


    } catch (error) {

        console.error(
            "Error saving software result:",
            error
        );

        /*
           The result can still be displayed
           even if report saving fails.
        */

    }

}


// ============================================
// ANIMATE NUMBER
// ============================================

function animateNumber(
    element,
    start,
    end,
    duration
) {


    const startTime =
        performance.now();


    function update(
        currentTime
    ) {


        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.round(
                start +
                (end - start) *
                eased
            );


        element.textContent =
            value;


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        }

    }


    requestAnimationFrame(
        update
    );

}


// ============================================
// SHOW ERROR
// ============================================

function showError(
    message
) {


    loadingSection.style.display =
        "none";


    resultSection.style.display =
        "none";


    errorSection.style.display =
        "block";


    errorText.textContent =
        message;

}


// ============================================
// DASHBOARD BUTTONS
// ============================================

dashboardBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "Dashboard.html";

    }
);


backDashboardBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "Dashboard.html";

    }
);


// ============================================
// CONTINUE BUTTON
// ============================================

continueBtn.addEventListener(
    "click",
    function () {

        /*
           This will later be connected
           to the combined final result page.
        */

        window.location.href =
            "FinalResult.html";

    }
);