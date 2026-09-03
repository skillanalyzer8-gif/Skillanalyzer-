// ========================================
// UI/UX MISSION 2 - COLOR PSYCHOLOGY
// ========================================

// Create the complete page using JavaScript

document.body.innerHTML = `

    <!-- Background -->
    <div class="background">

        <div class="colorGrid"></div>

        <div class="gradientGlow"></div>

        <div class="floatingColors"></div>

    </div>


    <div class="container">

        <!-- Header -->
        <div class="header">

            <h1>
                🌈 COLOR PSYCHOLOGY
            </h1>

            <p>
                UI/UX Mission 2 / 20
            </p>

        </div>


        <!-- AI Mentor -->
        <div class="briefing">

            <h2>
                🤖 AI Design Mentor
            </h2>

            <p>
                Amazing work on your first design!<br><br>

                Now every designer faces a bigger challenge...<br><br>

                Choosing the right colors.<br><br>

                Colors create emotions before users even read a single word.<br><br>

                Today's client is launching a new banking application.<br><br>

                Which color creates the strongest feeling of trust?
            </p>

        </div>


        <!-- Challenge -->
        <div class="designArea">

            <h2>
                🏦 Client Project
            </h2>

            <p id="challengeText">
                The client is waiting for your color selection...
            </p>

        </div>


        <!-- Status -->
        <div class="statusBox">

            <h3>
                Color Review
            </h3>

            <p id="statusText">
                Ready to analyze colors...
            </p>

        </div>


        <!-- Controls -->
        <div class="controls">

            <button id="startChallenge">
                🎨 CHOOSE COLORS
            </button>

        </div>

    </div>
`;


// ========================================
// SELECT ELEMENTS
// ========================================

const startButton =
    document.getElementById("startChallenge");

const challengeText =
    document.getElementById("challengeText");

const statusText =
    document.getElementById("statusText");


// ========================================
// BUTTON EVENT
// ========================================

startButton.addEventListener("click", function () {

    challengeText.textContent =
        "Choose a color that communicates trust for the banking application.";

    statusText.textContent =
        "🔍 Color analysis started! Think about what emotions each color creates.";

    startButton.textContent =
        "🎨 COLORS SELECTED";

    startButton.disabled = true;

});
