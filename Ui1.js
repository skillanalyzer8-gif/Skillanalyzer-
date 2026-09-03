// ================================
// UI/UX MISSION 1 - JAVASCRIPT
// ================================

// Create body content
document.body.innerHTML = `
   
    <!-- Animated Background -->
    <div class="background">
        <div class="designGrid"></div>
        <div class="gradientGlow"></div>
        <div class="floatingShapes"></div>
    </div>

    <div class="container">

        <!-- Header -->
        <div class="header">
            <h1>🎨 DESIGN MASTER STUDIO</h1>
            <p>UI/UX Mission 1 / 20</p>
        </div>

        <!-- AI Mentor -->
        <div class="briefing">
            <h2>🤖 AI Design Mentor</h2>

            <p>
                Welcome, Designer.<br><br>

                Today is your first day in our Design Studio.<br><br>

                Millions of users will use the app you create.<br><br>

                Your first task is simple...<br><br>

                Create a login screen that people love.<br><br>

                Remember:<br><br>

                Great design is not beautiful because of colors.<br><br>

                Great design is beautiful because it is easy to use.
            </p>
        </div>

        <!-- Challenge -->
        <div class="designArea">
            <h2>📱 Design Challenge</h2>

            <p id="challengeText">
                The client is waiting for your first design...
            </p>
        </div>

        <!-- Status -->
        <div class="statusBox">
            <h3>Design Review</h3>

            <p id="statusText">
                Ready to begin...
            </p>
        </div>

        <!-- Button -->
        <div class="controls">
            <button id="startDesign">
                ✨ START DESIGN
            </button>
        </div>

    </div>
`;


// ======================================
// GET HTML ELEMENTS USING JAVASCRIPT
// ======================================

const startButton = document.getElementById("startDesign");
const challengeText = document.getElementById("challengeText");
const statusText = document.getElementById("statusText");


// ======================================
// BUTTON FUNCTIONALITY
// ======================================

startButton.addEventListener("click", function () {

    challengeText.textContent =
        "Your mission: Design a clean and user-friendly login screen.";

    statusText.textContent =
        "🚀 Mission started! Time to create your login screen.";

    startButton.textContent =
        "🎨 DESIGNING...";

    startButton.disabled = true;

});
