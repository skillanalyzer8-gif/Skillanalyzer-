// ============================================
// LEADERSHIP RESULT
// LeadResult.js
// ============================================

import {
    auth,
    db
} from "./firebase.js";


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

const category =
    "leadership";


const totalMissions =
    20;


const maxScorePerMission =
    5;


const maximumScore =
    totalMissions *
    maxScorePerMission;


// ============================================
// HTML ELEMENTS
// ============================================

const loadingSection =
    document.getElementById(
        "loadingSection"
    );


const loadingText =
    document.getElementById(
        "loadingText"
    );


const errorSection =
    document.getElementById(
        "errorSection"
    );


const errorText =
    document.getElementById(
        "errorText"
    );


const resultSection =
    document.getElementById(
        "resultSection"
    );


const profileTitle =
    document.getElementById(
        "profileTitle"
    );


const profileDescription =
    document.getElementById(
        "profileDescription"
    );


const scoreNumber =
    document.getElementById(
        "scoreNumber"
    );


const totalScoreElement =
    document.getElementById(
        "totalScore"
    );


const missionsCompleted =
    document.getElementById(
        "missionsCompleted"
    );


const averageScore =
    document.getElementById(
        "averageScore"
    );


const strengthList =
    document.getElementById(
        "strengthList"
    );


const improvementList =
    document.getElementById(
        "improvementList"
    );


const missionGrid =
    document.getElementById(
        "missionGrid"
    );


const finalHeading =
    document.getElementById(
        "finalHeading"
    );


const finalDescription =
    document.getElementById(
        "finalDescription"
    );


const dashboardBtn =
    document.getElementById(
        "dashboardBtn"
    );


const continueBtn =
    document.getElementById(
        "continueBtn"
    );


const backDashboardBtn =
    document.getElementById(
        "backDashboardBtn"
    );


// ============================================
// INITIAL STATE
// ============================================

loadingSection.style.display =
    "block";


errorSection.style.display =
    "none";


resultSection.style.display =
    "none";


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

            await generateLeadershipResult(
                user
            );

        } catch (error) {

            console.error(
                "Leadership Result Error:",
                error
            );


            showError(
                "Unable to generate your leadership result."
            );

        }

    }
);


// ============================================
// GENERATE RESULT
// ============================================

async function generateLeadershipResult(
    user
) {

    const missionResults = [];


    let totalScore = 0;


    let completedCount = 0;


    // ========================================
    // READ MISSION 1 → 20
    // ========================================

    for (
        let missionNumber = 1;
        missionNumber <= totalMissions;
        missionNumber++
    ) {

        loadingText.textContent =
            `Reading Leadership Mission ${missionNumber} of ${totalMissions}...`;


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
            await getDoc(
                questionRef
            );


        if (
            questionSnapshot.exists()
        ) {

            const data =
                questionSnapshot.data();


            if (
                data.completed === true
            ) {

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


                totalScore +=
                    score;


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
    // REQUIRE ALL 20 MISSIONS
    // ========================================

    if (
        completedCount <
        totalMissions
    ) {

        showError(
            `You have completed ${completedCount} of ${totalMissions} leadership missions. Please complete all 20 missions before viewing your result.`
        );

        return;

    }


    // ========================================
    // PERCENTAGE
    // ========================================

    const percentage =
        Math.round(
            (
                totalScore /
                maximumScore
            ) * 100
        );


    // ========================================
    // AVERAGE
    // ========================================

    const average =
        totalScore /
        totalMissions;


    // ========================================
    // PROFILE
    // ========================================

    const profile =
        getLeadershipProfile(
            percentage
        );


    // ========================================
    // BASIC RESULT
    // ========================================

    totalScoreElement.textContent =
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
    // SCORE ANIMATION
    // ========================================

    animateNumber(
        scoreNumber,
        0,
        percentage,
        1400
    );


    // ========================================
    // SKILLS
    // ========================================

    const skills =
        calculateLeadershipSkills(
            missionResults
        );


    updateSkill(
        "teamLeadership",
        skills.teamLeadership
    );


    updateSkill(
        "problemSolving",
        skills.problemSolving
    );


    updateSkill(
        "communication",
        skills.communication
    );


    updateSkill(
        "decisionMaking",
        skills.decisionMaking
    );


    // ========================================
    // STRENGTHS
    // ========================================

    displayStrengths(
        skills
    );


    // ========================================
    // IMPROVEMENTS
    // ========================================

    displayImprovements(
        skills
    );


    // ========================================
    // MISSION GRID
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
// LEADERSHIP PROFILE
// ============================================

function getLeadershipProfile(
    percentage
) {

    if (
        percentage >= 85
    ) {

        return {

            title:
                "Visionary Leader",

            description:
                "Your decisions demonstrate strong leadership, responsibility, communication, problem solving and long-term thinking.",

            finalHeading:
                "You Think Like a Visionary Leader",

            finalDescription:
                "Your assessment shows strong leadership judgment. You consider people, problems, responsibility and long-term outcomes when making decisions."

        };

    }


    if (
        percentage >= 70
    ) {

        return {

            title:
                "Strategic Leader",

            description:
                "You demonstrate strong leadership foundations with practical decision making, communication and problem-solving skills.",

            finalHeading:
                "Your Leadership Foundation Is Strong",

            finalDescription:
                "You have developed solid leadership thinking. Continue practicing communication, team management and responsible decision making."

        };

    }


    if (
        percentage >= 50
    ) {

        return {

            title:
                "Developing Leader",

            description:
                "Your leadership skills are developing. More practice with communication, teamwork and difficult decisions can strengthen your leadership ability.",

            finalHeading:
                "Your Leadership Journey Is Growing",

            finalDescription:
                "Keep practicing leadership through teamwork, problem solving and thoughtful decision making."

        };

    }


    return {

        title:
            "Emerging Leader",

        description:
            "You are beginning to develop your leadership mindset. Focus on communication, responsibility, teamwork and structured problem solving.",

        finalHeading:
            "Every Leader Starts Somewhere",

        finalDescription:
            "Use this result as your starting point and continue developing your leadership skills through real-world experiences."

    };

}


// ============================================
// CALCULATE LEADERSHIP SKILLS
// ============================================

function calculateLeadershipSkills(
    missions
) {

    /*
        Q1–5
        Team Leadership

        Q6–10
        Problem Solving

        Q11–15
        Communication

        Q16–20
        Decision Making

        Each group:
        5 missions × 5 = 25
    */


    let teamLeadershipScore = 0;

    let problemSolvingScore = 0;

    let communicationScore = 0;

    let decisionMakingScore = 0;


    missions.forEach(
        function (mission) {

            if (
                mission.missionNumber >= 1 &&
                mission.missionNumber <= 5
            ) {

                teamLeadershipScore +=
                    mission.score;

            }


            else if (
                mission.missionNumber >= 6 &&
                mission.missionNumber <= 10
            ) {

                problemSolvingScore +=
                    mission.score;

            }


            else if (
                mission.missionNumber >= 11 &&
                mission.missionNumber <= 15
            ) {

                communicationScore +=
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

        teamLeadership:
            Math.round(
                (
                    teamLeadershipScore /
                    25
                ) * 100
            ),


        problemSolving:
            Math.round(
                (
                    problemSolvingScore /
                    25
                ) * 100
            ),


        communication:
            Math.round(
                (
                    communicationScore /
                    25
                ) * 100
            ),


        decisionMaking:
            Math.round(
                (
                    decisionMakingScore /
                    25
                ) * 100
            )

    };

}


// ============================================
// UPDATE SKILL
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


    if (
        !valueElement ||
        !barElement
    ) {

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
// STRENGTHS
// ============================================

function displayStrengths(
    skills
) {

    strengthList.innerHTML =
        "";


    const strengths = [];


    if (
        skills.teamLeadership >= 75
    ) {

        strengths.push(
            "Strong team leadership and people management"
        );

    }


    if (
        skills.problemSolving >= 75
    ) {

        strengths.push(
            "Good leadership problem-solving ability"
        );

    }


    if (
        skills.communication >= 75
    ) {

        strengths.push(
            "Strong communication and interpersonal awareness"
        );

    }


    if (
        skills.decisionMaking >= 75
    ) {

        strengths.push(
            "Thoughtful and responsible decision making"
        );

    }


    if (
        strengths.length === 0
    ) {

        strengths.push(
            "Developing leadership awareness"
        );


        strengths.push(
            "Willingness to learn and improve"
        );

    }


    strengths.forEach(
        function (strength) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "trait";


            item.innerHTML = `
                <i class="fa-solid fa-check"></i>
                ${strength}
            `;


            strengthList.appendChild(
                item
            );

        }
    );

}


// ============================================
// IMPROVEMENTS
// ============================================

function displayImprovements(
    skills
) {

    improvementList.innerHTML =
        "";


    const improvements = [];


    if (
        skills.teamLeadership < 75
    ) {

        improvements.push(
            "Practice supporting and coordinating team members"
        );

    }


    if (
        skills.problemSolving < 75
    ) {

        improvements.push(
            "Practice analyzing problems before reacting"
        );

    }


    if (
        skills.communication < 75
    ) {

        improvements.push(
            "Practice clear, respectful and constructive communication"
        );

    }


    if (
        skills.decisionMaking < 75
    ) {

        improvements.push(
            "Practice evaluating consequences before making important decisions"
        );

    }


    if (
        improvements.length === 0
    ) {

        improvements.push(
            "Continue developing leadership through real-world teamwork"
        );


        improvements.push(
            "Practice leading increasingly complex projects"
        );

    }


    improvements.forEach(
        function (improvement) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "trait";


            item.innerHTML = `
                <i class="fa-solid fa-arrow-up"></i>
                ${improvement}
            `;


            improvementList.appendChild(
                item
            );

        }
    );

}


// ============================================
// MISSION BREAKDOWN
// ============================================

function displayMissionBreakdown(
    missions
) {

    missionGrid.innerHTML =
        "";


    missions.forEach(
        function (mission) {

            const card =
                document.createElement(
                    "div"
                );


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


            missionGrid.appendChild(
                card
            );

        }
    );

}


// ============================================
// SAVE RESULT
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

        // ====================================
        // SAVE REPORT
        // ====================================

        const resultRef =
            doc(
                db,
                "users",
                user.uid,
                "reports",
                "leadership"
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


        // ====================================
        // UPDATE USER DOCUMENT
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

                leadershipCompleted:
                    true,

                leadershipFinalMission:
                    20,

                leadershipFinalScore:
                    totalScore,

                leadershipPercentage:
                    percentage,

                leadershipProfile:
                    profile.title,

                leadershipCompletedAt:
                    new Date().toISOString()

            },
            {
                merge: true
            }
        );


        console.log(
            "Leadership result saved successfully."
        );

    } catch (error) {

        console.error(
            "Leadership result save error:",
            error
        );

    }

}


// ============================================
// SCORE ANIMATION
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
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed /
                duration,
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
                (
                    end -
                    start
                ) * eased
            );


        element.textContent =
            value;


        if (
            progress < 1
        ) {

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
// ERROR
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
// BUTTONS
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


continueBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "FinalResult.html";

    }
);