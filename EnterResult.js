// ============================================
// ENTREPRENEURSHIP RESULT
// EnterResult.js
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
    "entrepreneurship";


const totalMissions =
    20;


const maxScorePerMission =
    5;


const maximumScore =
    totalMissions * maxScorePerMission;


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


const backDashboardBtn =
    document.getElementById(
        "backDashboardBtn"
    );


const continueBtn =
    document.getElementById(
        "continueBtn"
    );


// ============================================
// INITIAL DISPLAY
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

            await generateEntrepreneurshipResult(
                user
            );

        } catch (error) {

            console.error(
                "Entrepreneurship Result Error:",
                error
            );


            showError(
                "Unable to generate your entrepreneurship result."
            );

        }

    }
);


// ============================================
// GENERATE RESULT
// ============================================

async function generateEntrepreneurshipResult(
    user
) {

    const missionResults = [];


    let totalScore = 0;


    let completedCount = 0;


    // ========================================
    // READ Q1 → Q20
    // ========================================

    for (
        let missionNumber = 1;
        missionNumber <= totalMissions;
        missionNumber++
    ) {

        loadingText.textContent =
            `Reading Entrepreneurship Mission ${missionNumber} of ${totalMissions}...`;


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
    // CHECK ALL MISSIONS
    // ========================================

    if (
        completedCount < totalMissions
    ) {

        showError(
            `You have completed ${completedCount} of ${totalMissions} entrepreneurship missions. Please complete all 20 missions before viewing your result.`
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
        getEntrepreneurProfile(
            percentage
        );


    // ========================================
    // BASIC RESULT DISPLAY
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
    // SKILL CALCULATION
    // ========================================

    const skills =
        calculateEntrepreneurSkills(
            missionResults
        );


    // ========================================
    // UPDATE SKILLS
    // ========================================

    updateSkill(
        "opportunity",
        skills.opportunity
    );


    updateSkill(
        "businessProblem",
        skills.businessProblem
    );


    updateSkill(
        "innovation",
        skills.innovation
    );


    updateSkill(
        "entrepreneurDecision",
        skills.entrepreneurDecision
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
// ENTREPRENEUR PROFILE
// ============================================

function getEntrepreneurProfile(
    percentage
) {

    if (
        percentage >= 85
    ) {

        return {

            title:
                "Visionary Entrepreneur",

            description:
                "Your decisions demonstrate strong opportunity recognition, problem solving, innovation, long-term thinking and entrepreneurial judgment.",

            finalHeading:
                "You Think Like an Entrepreneur",

            finalDescription:
                "Your choices show that you look beyond short-term results and consider customers, opportunities, innovation and sustainable business value."

        };

    }


    if (
        percentage >= 70
    ) {

        return {

            title:
                "Strategic Entrepreneur",

            description:
                "You demonstrate a solid entrepreneurial mindset with good business judgment, customer awareness and practical decision making.",

            finalHeading:
                "Your Entrepreneurial Thinking Is Strong",

            finalDescription:
                "You have developed a strong foundation in entrepreneurial decision making. Continue working on real-world business problems and opportunities."

        };

    }


    if (
        percentage >= 50
    ) {

        return {

            title:
                "Developing Entrepreneur",

            description:
                "Your entrepreneurial thinking is developing. More practice with customers, opportunities, innovation and business decisions can strengthen your skills.",

            finalHeading:
                "Your Entrepreneurial Journey Is Growing",

            finalDescription:
                "Keep studying business problems and practice making decisions based on customer needs, long-term value and sustainable opportunities."

        };

    }


    return {

        title:
            "Emerging Entrepreneur",

        description:
            "You are beginning to develop an entrepreneurial mindset. Focus on understanding customers, identifying opportunities and solving meaningful problems.",

        finalHeading:
            "Every Entrepreneur Starts Somewhere",

        finalDescription:
            "Use this result as your starting point. Continue learning entrepreneurship and practice solving real-world problems."

    };

}


// ============================================
// CALCULATE ENTREPRENEUR SKILLS
// ============================================

function calculateEntrepreneurSkills(
    missions
) {

    /*
        Q1–5
        Opportunity Recognition

        Q6–10
        Business Problem Solving

        Q11–15
        Innovation

        Q16–20
        Entrepreneurial Decision Making

        Each group maximum = 25.
    */


    let opportunityScore = 0;

    let businessProblemScore = 0;

    let innovationScore = 0;

    let entrepreneurDecisionScore = 0;


    missions.forEach(
        function (mission) {

            if (
                mission.missionNumber >= 1 &&
                mission.missionNumber <= 5
            ) {

                opportunityScore +=
                    mission.score;

            }


            else if (
                mission.missionNumber >= 6 &&
                mission.missionNumber <= 10
            ) {

                businessProblemScore +=
                    mission.score;

            }


            else if (
                mission.missionNumber >= 11 &&
                mission.missionNumber <= 15
            ) {

                innovationScore +=
                    mission.score;

            }


            else if (
                mission.missionNumber >= 16 &&
                mission.missionNumber <= 20
            ) {

                entrepreneurDecisionScore +=
                    mission.score;

            }

        }
    );


    return {

        opportunity:
            Math.round(
                (
                    opportunityScore /
                    25
                ) * 100
            ),


        businessProblem:
            Math.round(
                (
                    businessProblemScore /
                    25
                ) * 100
            ),


        innovation:
            Math.round(
                (
                    innovationScore /
                    25
                ) * 100
            ),


        entrepreneurDecision:
            Math.round(
                (
                    entrepreneurDecisionScore /
                    25
                ) * 100
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
// DISPLAY STRENGTHS
// ============================================

function displayStrengths(
    skills
) {

    strengthList.innerHTML =
        "";


    const strengths = [];


    if (
        skills.opportunity >= 75
    ) {

        strengths.push(
            "Strong opportunity recognition"
        );

    }


    if (
        skills.businessProblem >= 75
    ) {

        strengths.push(
            "Good business problem-solving ability"
        );

    }


    if (
        skills.innovation >= 75
    ) {

        strengths.push(
            "Strong innovation mindset"
        );

    }


    if (
        skills.entrepreneurDecision >= 75
    ) {

        strengths.push(
            "Thoughtful entrepreneurial decision making"
        );

    }


    if (
        strengths.length === 0
    ) {

        strengths.push(
            "Developing entrepreneurial awareness"
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
// DISPLAY IMPROVEMENTS
// ============================================

function displayImprovements(
    skills
) {

    improvementList.innerHTML =
        "";


    const improvements = [];


    if (
        skills.opportunity < 75
    ) {

        improvements.push(
            "Practice identifying real business opportunities"
        );

    }


    if (
        skills.businessProblem < 75
    ) {

        improvements.push(
            "Practice solving customer and business problems"
        );

    }


    if (
        skills.innovation < 75
    ) {

        improvements.push(
            "Practice developing innovative solutions instead of simply copying existing ideas"
        );

    }


    if (
        skills.entrepreneurDecision < 75
    ) {

        improvements.push(
            "Practice making decisions using long-term value and customer impact"
        );

    }


    if (
        improvements.length === 0
    ) {

        improvements.push(
            "Continue practicing real-world entrepreneurial projects"
        );


        improvements.push(
            "Experiment with new business ideas and validate them with customers"
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
        // REPORT DOCUMENT
        // ====================================

        const resultRef =
            doc(
                db,
                "users",
                user.uid,
                "reports",
                "entrepreneurship"
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

                entrepreneurshipCompleted:
                    true,

                entrepreneurshipFinalMission:
                    20,

                entrepreneurshipFinalScore:
                    totalScore,

                entrepreneurshipPercentage:
                    percentage,

                entrepreneurshipProfile:
                    profile.title,

                entrepreneurshipCompletedAt:
                    new Date().toISOString()

            },
            {
                merge: true
            }
        );


        console.log(
            "Entrepreneurship result saved successfully."
        );

    } catch (error) {

        console.error(
            "Entrepreneurship result save error:",
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
            currentTime - startTime;


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
// ERROR DISPLAY
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
// DASHBOARD BUTTON
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

        window.location.href =
            "FinalResult.html";

    }
);