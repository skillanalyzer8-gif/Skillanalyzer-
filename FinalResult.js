// ============================================
// SKILL ANALYZER FINAL RESULT
// FinalResult.js
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
// CATEGORY CONFIGURATION
// ============================================

const categories = {

    softwareDevelopment: {
        reportName: "softwareDevelopment",
        displayName: "Software Development"
    },

    uiux: {
        reportName: "uiux",
        displayName: "UI / UX Design"
    },

    entrepreneurship: {
        reportName: "entrepreneurship",
        displayName: "Entrepreneurship"
    },

    leadership: {
        reportName: "leadership",
        displayName: "Leadership"
    }

};


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

const overallScore =
    document.getElementById("overallScore");

const averageScore =
    document.getElementById("averageScore");

const softwareProfile =
    document.getElementById("softwareProfile");

const softwareScore =
    document.getElementById("softwareScore");

const softwareBar =
    document.getElementById("softwareBar");

const uiuxProfile =
    document.getElementById("uiuxProfile");

const uiuxScore =
    document.getElementById("uiuxScore");

const uiuxBar =
    document.getElementById("uiuxBar");

const entrepreneurProfile =
    document.getElementById("entrepreneurProfile");

const entrepreneurScore =
    document.getElementById("entrepreneurScore");

const entrepreneurBar =
    document.getElementById("entrepreneurBar");

const leadershipProfile =
    document.getElementById("leadershipProfile");

const leadershipScore =
    document.getElementById("leadershipScore");

const leadershipBar =
    document.getElementById("leadershipBar");

const careerHeading =
    document.getElementById("careerHeading");

const careerDescription =
    document.getElementById("careerDescription");

const strengthList =
    document.getElementById("strengthList");

const improvementList =
    document.getElementById("improvementList");

const finalHeading =
    document.getElementById("finalHeading");

const finalDescription =
    document.getElementById("finalDescription");

const backDashboardBtn =
    document.getElementById("backDashboardBtn");

const chatbotBtn =
    document.getElementById("chatbotBtn");


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

            await generateFinalResult(user);

        } catch (error) {

            console.error(
                "Final Result Error:",
                error
            );

            showError(
                "Unable to generate your final career profile."
            );

        }

    }
);


// ============================================
// GENERATE FINAL RESULT
// ============================================

async function generateFinalResult(user) {

    const results = {};

    const categoryNames =
        Object.keys(categories);


    // ========================================
    // READ ALL FOUR REPORTS
    // ========================================

    for (
        let i = 0;
        i < categoryNames.length;
        i++
    ) {

        const categoryKey =
            categoryNames[i];

        const categoryData =
            categories[categoryKey];


        loadingText.textContent =
            `Reading ${categoryData.displayName} result...`;


        const reportRef =
            doc(
                db,
                "users",
                user.uid,
                "reports",
                categoryData.reportName
            );


        const reportSnapshot =
            await getDoc(reportRef);


        if (
            !reportSnapshot.exists()
        ) {

            showError(
                `${categoryData.displayName} result was not found. Please complete that category first.`
            );

            return;

        }


        const report =
            reportSnapshot.data();


        if (
            report.completed !== true
        ) {

            showError(
                `${categoryData.displayName} assessment is not completed yet.`
            );

            return;

        }


        results[categoryKey] =
            report;

    }


    // ========================================
    // GET CATEGORY PERCENTAGES
    // ========================================

    const softwarePercentage =
        getPercentage(
            results.softwareDevelopment
        );


    const uiuxPercentage =
        getPercentage(
            results.uiux
        );


    const entrepreneurshipPercentage =
        getPercentage(
            results.entrepreneurship
        );


    const leadershipPercentage =
        getPercentage(
            results.leadership
        );


    // ========================================
    // OVERALL SCORE
    // ========================================

    const totalPercentage =
        softwarePercentage +
        uiuxPercentage +
        entrepreneurshipPercentage +
        leadershipPercentage;


    const finalPercentage =
        Math.round(
            totalPercentage / 4
        );


    // ========================================
    // PROFILE
    // ========================================

    const finalProfile =
        getFinalProfile(
            finalPercentage
        );


    // ========================================
    // DISPLAY OVERALL RESULT
    // ========================================

    profileTitle.textContent =
        finalProfile.title;


    profileDescription.textContent =
        finalProfile.description;


    overallScore.textContent =
        `${finalPercentage} / 100`;


    averageScore.textContent =
        `${finalPercentage}%`;


    finalHeading.textContent =
        finalProfile.finalHeading;


    finalDescription.textContent =
        finalProfile.finalDescription;


    // ========================================
    // SCORE ANIMATION
    // ========================================

    animateNumber(
        scoreNumber,
        0,
        finalPercentage,
        1500
    );


    // ========================================
    // CATEGORY DISPLAY
    // ========================================

    updateCategory(
        softwareProfile,
        softwareScore,
        softwareBar,
        results.softwareDevelopment,
        softwarePercentage
    );


    updateCategory(
        uiuxProfile,
        uiuxScore,
        uiuxBar,
        results.uiux,
        uiuxPercentage
    );


    updateCategory(
        entrepreneurProfile,
        entrepreneurScore,
        entrepreneurBar,
        results.entrepreneurship,
        entrepreneurshipPercentage
    );


    updateCategory(
        leadershipProfile,
        leadershipScore,
        leadershipBar,
        results.leadership,
        leadershipPercentage
    );


    // ========================================
    // FIND STRONGEST CATEGORY
    // ========================================

    const categoryScores = [

        {
            key: "softwareDevelopment",
            name: "Software Development",
            score: softwarePercentage
        },

        {
            key: "uiux",
            name: "UI / UX Design",
            score: uiuxPercentage
        },

        {
            key: "entrepreneurship",
            name: "Entrepreneurship",
            score: entrepreneurshipPercentage
        },

        {
            key: "leadership",
            name: "Leadership",
            score: leadershipPercentage
        }

    ];


    categoryScores.sort(
        function (a, b) {

            return b.score - a.score;

        }
    );


    const strongestCategory =
        categoryScores[0];


    // ========================================
    // CAREER INSIGHT
    // ========================================

    displayCareerInsight(
        strongestCategory
    );


    // ========================================
    // OVERALL STRENGTHS
    // ========================================

    displayOverallStrengths(
        categoryScores
    );


    // ========================================
    // GROWTH AREAS
    // ========================================

    displayGrowthAreas(
        categoryScores
    );


    // ========================================
    // SAVE FINAL REPORT
    // ========================================

    await saveFinalResult(
        user,
        results,
        finalPercentage,
        categoryScores,
        finalProfile
    );


    // ========================================
    // SHOW RESULT
    // ========================================

    loadingSection.style.display =
        "none";

    errorSection.style.display =
        "none";

    resultSection.style.display =
        "block";

}


// ============================================
// GET PERCENTAGE
// ============================================

function getPercentage(report) {

    const percentage =
        Number(report.percentage);


    if (
        Number.isFinite(percentage)
    ) {

        return Math.max(
            0,
            Math.min(
                100,
                Math.round(percentage)
            )
        );

    }


    const totalScore =
        Number(report.totalScore) || 0;


    const maximumScore =
        Number(report.maximumScore) || 100;


    if (
        maximumScore <= 0
    ) {

        return 0;

    }


    return Math.round(
        (
            totalScore /
            maximumScore
        ) * 100
    );

}


// ============================================
// FINAL PROFILE
// ============================================

function getFinalProfile(
    percentage
) {

    if (
        percentage >= 85
    ) {

        return {

            title:
                "Advanced Multi-Skill Professional",

            description:
                "Your assessment shows strong performance across technical, creative, entrepreneurial and leadership thinking. You demonstrate the ability to approach problems from multiple professional perspectives.",

            finalHeading:
                "Your Complete Skill Profile Is Strong",

            finalDescription:
                "You demonstrated strong capability across all four Skill Analyzer domains. Continue building real-world experience and combining these skills through meaningful projects."

        };

    }


    if (
        percentage >= 70
    ) {

        return {

            title:
                "Strong Multi-Skill Professional",

            description:
                "Your results show a strong combination of technical, creative, entrepreneurial and leadership abilities with a solid foundation for continued professional development.",

            finalHeading:
                "Your Professional Foundation Is Strong",

            finalDescription:
                "Your assessment shows balanced development across multiple skill areas. Continue practicing through real-world projects and collaborative experiences."

        };

    }


    if (
        percentage >= 50
    ) {

        return {

            title:
                "Developing Multi-Skill Professional",

            description:
                "Your results show developing ability across the four skill domains. Continued practice and real-world experience can strengthen your professional profile.",

            finalHeading:
                "Your Skill Journey Is Developing",

            finalDescription:
                "You have built a foundation across multiple professional areas. Focus on strengthening your weaker areas while continuing to develop your strongest skills."

        };

    }


    return {

        title:
            "Emerging Multi-Skill Professional",

        description:
            "Your assessment shows that you are beginning to develop skills across technical, creative, entrepreneurial and leadership areas.",

        finalHeading:
            "This Is Your Starting Point",

        finalDescription:
            "Use your assessment as a guide for continued learning. Practice consistently, build projects and gradually strengthen each skill area."

    };

}


// ============================================
// UPDATE CATEGORY
// ============================================

function updateCategory(
    profileElement,
    scoreElement,
    barElement,
    report,
    percentage
) {

    if (
        profileElement
    ) {

        profileElement.textContent =
            report.profileTitle ||
            "Developing Skill Profile";

    }


    if (
        scoreElement
    ) {

        scoreElement.textContent =
            `${percentage}%`;

    }


    if (
        barElement
    ) {

        barElement.style.width =
            "0%";


        setTimeout(
            function () {

                barElement.style.width =
                    `${percentage}%`;

            },
            200
        );

    }

}


// ============================================
// CAREER INSIGHT
// ============================================

function displayCareerInsight(
    strongestCategory
) {

    if (
        !strongestCategory
    ) {

        return;

    }


    careerHeading.textContent =
        `${strongestCategory.name} Is One of Your Strongest Areas`;


    if (
        strongestCategory.key ===
        "softwareDevelopment"
    ) {

        careerDescription.textContent =
            `Your highest category score is ${strongestCategory.score}%. Your assessment shows strong technical and problem-solving potential. Consider continuing to develop programming, software projects and technical problem-solving skills.`;

    }


    else if (
        strongestCategory.key ===
        "uiux"
    ) {

        careerDescription.textContent =
            `Your highest category score is ${strongestCategory.score}%. Your assessment shows strong design and user-experience thinking. Consider developing interface design, usability, accessibility and creative problem-solving skills.`;

    }


    else if (
        strongestCategory.key ===
        "entrepreneurship"
    ) {

        careerDescription.textContent =
            `Your highest category score is ${strongestCategory.score}%. Your assessment shows strong entrepreneurial thinking. Consider exploring business ideas, customer problems, innovation and product development.`;

    }


    else if (
        strongestCategory.key ===
        "leadership"
    ) {

        careerDescription.textContent =
            `Your highest category score is ${strongestCategory.score}%. Your assessment shows strong leadership and decision-making potential. Consider developing communication, teamwork, responsibility and project leadership skills.`;

    }

}


// ============================================
// OVERALL STRENGTHS
// ============================================

function displayOverallStrengths(
    categoryScores
) {

    strengthList.innerHTML =
        "";


    const strongCategories =
        categoryScores.filter(
            function (category) {

                return category.score >= 75;

            }
        );


    if (
        strongCategories.length === 0
    ) {

        addTrait(
            strengthList,
            "Developing ability across multiple professional skill areas",
            "fa-check"
        );


        addTrait(
            strengthList,
            "Willingness to learn and improve",
            "fa-check"
        );


        return;

    }


    strongCategories.forEach(
        function (category) {

            addTrait(
                strengthList,
                `${category.name}: ${category.score}%`,
                "fa-check"
            );

        }
    );


    if (
        categoryScores[0].score >= 75
    ) {

        addTrait(
            strengthList,
            `Strongest area: ${categoryScores[0].name}`,
            "fa-star"
        );

    }

}


// ============================================
// GROWTH AREAS
// ============================================

function displayGrowthAreas(
    categoryScores
) {

    improvementList.innerHTML =
        "";


    const weakCategories =
        categoryScores.filter(
            function (category) {

                return category.score < 75;

            }
        );


    if (
        weakCategories.length === 0
    ) {

        addTrait(
            improvementList,
            "Continue practicing real-world projects",
            "fa-arrow-up"
        );


        addTrait(
            improvementList,
            "Continue combining your skills across different professional situations",
            "fa-arrow-up"
        );


        return;

    }


    weakCategories
        .sort(
            function (a, b) {

                return a.score - b.score;

            }
        )
        .forEach(
            function (category) {

                addTrait(
                    improvementList,
                    `${category.name}: Continue developing this area (${category.score}%)`,
                    "fa-arrow-up"
                );

            }
        );

}


// ============================================
// ADD TRAIT
// ============================================

function addTrait(
    container,
    text,
    iconClass
) {

    const item =
        document.createElement("div");


    item.className =
        "trait";


    const icon =
        document.createElement("i");


    icon.className =
        `fa-solid ${iconClass}`;


    item.appendChild(icon);


    item.appendChild(
        document.createTextNode(
            ` ${text}`
        )
    );


    container.appendChild(
        item
    );

}


// ============================================
// SAVE FINAL RESULT
// ============================================

async function saveFinalResult(
    user,
    results,
    finalPercentage,
    categoryScores,
    finalProfile
) {

    try {

        const finalReportRef =
            doc(
                db,
                "users",
                user.uid,
                "reports",
                "finalResult"
            );


        const categoryData = {};


        categoryScores.forEach(
            function (category) {

                const report =
                    results[
                        category.key
                    ];


                categoryData[
                    category.key
                ] = {

                    percentage:
                        category.score,

                    profileTitle:
                        report.profileTitle ||
                        "",

                    profileDescription:
                        report.profileDescription ||
                        ""

                };

            }
        );


        await setDoc(
            finalReportRef,
            {

                overallPercentage:
                    finalPercentage,

                profileTitle:
                    finalProfile.title,

                profileDescription:
                    finalProfile.description,

                finalHeading:
                    finalProfile.finalHeading,

                finalDescription:
                    finalProfile.finalDescription,

                categories:
                    categoryData,

                categoryRanking:
                    categoryScores.map(
                        function (category) {

                            return {

                                category:
                                    category.key,

                                displayName:
                                    category.name,

                                percentage:
                                    category.score

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

                finalResultCompleted:
                    true,

                finalResultPercentage:
                    finalPercentage,

                finalResultProfile:
                    finalProfile.title,

                finalResultCompletedAt:
                    new Date().toISOString()

            },
            {
                merge: true
            }
        );


        console.log(
            "Final Result saved successfully."
        );

    } catch (error) {

        console.error(
            "Final Result Save Error:",
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
                ) *
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

if (
    backDashboardBtn
) {

    backDashboardBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "Dashboard.html";

        }
    );

}


// ============================================
// AI CAREER MENTOR BUTTON
// ============================================

if (
    chatbotBtn
) {

    chatbotBtn.addEventListener(
        "click",
        function () {

            alert(
                "🤖 AI Career Mentor will be connected in the next step."
            );

        }
    );

}