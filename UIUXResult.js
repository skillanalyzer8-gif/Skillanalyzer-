// ============================================
// UI/UX RESULT
// UIUXResult.js
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

const category = "uiux";

const totalMissions = 20;

const maxScorePerMission = 5;

const maximumScore =
    totalMissions * maxScorePerMission;


// ============================================
// ELEMENTS
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

const totalScoreElement =
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
// INITIAL STATE
// ============================================

loadingSection.style.display = "block";

errorSection.style.display = "none";

resultSection.style.display = "none";


// ============================================
// AUTH
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

            await generateUIUXResult(user);

        } catch (error) {

            console.error(
                "UI/UX Result Error:",
                error
            );

            showError(
                "Unable to generate your UI/UX result."
            );

        }

    }
);


// ============================================
// GENERATE RESULT
// ============================================

async function generateUIUXResult(user) {

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
            `Reading UI/UX Mission ${missionNumber} of ${totalMissions}...`;


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
    // REQUIRE ALL 20
    // ========================================

    if (
        completedCount < totalMissions
    ) {

        showError(
            `You have completed ${completedCount} of ${totalMissions} UI/UX missions. Please complete all 20 missions before viewing your result.`
        );

        return;

    }


    // ========================================
    // PERCENTAGE
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
        getDesignerProfile(
            percentage
        );


    // ========================================
    // BASIC DISPLAY
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
        calculateSkills(
            missionResults
        );


    updateSkill(
        "userCentered",
        skills.userCentered
    );


    updateSkill(
        "visualDesign",
        skills.visualDesign
    );


    updateSkill(
        "accessibility",
        skills.accessibility
    );


    updateSkill(
        "uxDecision",
        skills.uxDecision
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
// DESIGNER PROFILE
// ============================================

function getDesignerProfile(
    percentage
) {


    if (percentage >= 85) {

        return {

            title:
                "Advanced UX Thinker",

            description:
                "Your decisions demonstrate strong user-centered thinking, accessibility awareness, visual hierarchy and thoughtful design decision making.",

            finalHeading:
                "You Think Like a UX Designer",

            finalDescription:
                "Your choices show that you consider the user's needs, clarity, accessibility and overall experience when making design decisions."

        };

    }


    if (percentage >= 70) {

        return {

            title:
                "Strong UI/UX Designer",

            description:
                "You demonstrate a solid understanding of user experience, visual design and practical interface decisions.",

            finalHeading:
                "Your Design Thinking Is Strong",

            finalDescription:
                "You have developed a strong foundation in user-centered design. Continue practicing real interface design and usability testing."

        };

    }


    if (percentage >= 50) {

        return {

            title:
                "Developing Designer",

            description:
                "Your UI/UX thinking is developing. More practice with users, accessibility, hierarchy and interface decisions can strengthen your design skills.",

            finalHeading:
                "Your Design Journey Is Growing",

            finalDescription:
                "Keep studying design principles and build real interfaces. Practice making decisions based on user needs rather than personal preference."

        };

    }


    return {

        title:
            "Emerging Designer",

        description:
            "You are beginning to develop your UI/UX mindset. Focus on understanding users and creating simple, accessible and clear experiences.",

        finalHeading:
            "Every Designer Starts Somewhere",

        finalDescription:
            "Use this result as your starting point. Continue learning UI/UX principles and practice designing real user experiences."

    };

}


// ============================================
// CALCULATE SKILLS
// ============================================

function calculateSkills(
    missions
) {


    /*
       20 missions are divided into
       four groups of five.

       Q1–5   → User-Centered Thinking
       Q6–10  → Visual Design
       Q11–15 → Accessibility
       Q16–20 → UX Decision Making

       Each group maximum = 25.
    */


    let userCenteredScore = 0;

    let visualDesignScore = 0;

    let accessibilityScore = 0;

    let uxDecisionScore = 0;


    missions.forEach(
        function (mission) {


            if (
                mission.missionNumber >= 1 &&
                mission.missionNumber <= 5
            ) {

                userCenteredScore +=
                    mission.score;

            }


            else if (
                mission.missionNumber >= 6 &&
                mission.missionNumber <= 10
            ) {

                visualDesignScore +=
                    mission.score;

            }


            else if (
                mission.missionNumber >= 11 &&
                mission.missionNumber <= 15
            ) {

                accessibilityScore +=
                    mission.score;

            }


            else if (
                mission.missionNumber >= 16 &&
                mission.missionNumber <= 20
            ) {

                uxDecisionScore +=
                    mission.score;

            }

        }
    );


    return {

        userCentered:
            Math.round(
                (userCenteredScore / 25) * 100
            ),

        visualDesign:
            Math.round(
                (visualDesignScore / 25) * 100
            ),

        accessibility:
            Math.round(
                (accessibilityScore / 25) * 100
            ),

        uxDecision:
            Math.round(
                (uxDecisionScore / 25) * 100
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

    strengthList.innerHTML = "";


    const strengths = [];


    if (
        skills.userCentered >= 75
    ) {

        strengths.push(
            "Strong user-centered thinking"
        );

    }


    if (
        skills.visualDesign >= 75
    ) {

        strengths.push(
            "Good visual design awareness"
        );

    }


    if (
        skills.accessibility >= 75
    ) {

        strengths.push(
            "Strong accessibility awareness"
        );

    }


    if (
        skills.uxDecision >= 75
    ) {

        strengths.push(
            "Thoughtful UX decisions"
        );

    }


    if (
        strengths.length === 0
    ) {

        strengths.push(
            "Developing design awareness"
        );

        strengths.push(
            "Willingness to improve user experiences"
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

    improvementList.innerHTML = "";


    const improvements = [];


    if (
        skills.userCentered < 75
    ) {

        improvements.push(
            "Practice identifying real user needs before designing"
        );

    }


    if (
        skills.visualDesign < 75
    ) {

        improvements.push(
            "Practice hierarchy, spacing, typography and visual consistency"
        );

    }


    if (
        skills.accessibility < 75
    ) {

        improvements.push(
            "Practice designing accessible experiences for different users"
        );

    }


    if (
        skills.uxDecision < 75
    ) {

        improvements.push(
            "Practice evaluating design decisions from the user's perspective"
        );

    }


    if (
        improvements.length === 0
    ) {

        improvements.push(
            "Continue practicing real-world UI/UX projects"
        );

        improvements.push(
            "Test designs with real users whenever possible"
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

        const resultRef =
            doc(
                db,
                "users",
                user.uid,
                "reports",
                "uiux"
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

                uiuxCompleted:
                    true,

                uiuxFinalMission:
                    20,

                uiuxFinalScore:
                    totalScore,

                uiuxPercentage:
                    percentage,

                uiuxProfile:
                    profile.title,

                uiuxCompletedAt:
                    new Date().toISOString()

            },

            {
                merge: true
            }
        );


        console.log(
            "UI/UX result saved successfully."
        );

    } catch (error) {

        console.error(
            "UI/UX result save error:",
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
// DASHBOARD
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
// CONTINUE
// ============================================

continueBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "FinalResult.html";

    }
);