```javascript
// ======================================
// MISSION 8 - BUG PRIORITIZATION
// ======================================


// Get all option buttons
const options = document.querySelectorAll(".option");


// Get required elements
const fill = document.querySelector(".fill");
const analysisText = document.getElementById("analysisText");
const nextBtn = document.getElementById("nextBtn");


// Store selected option
let selectedOption = null;


// ======================================
// OPTION CLICK
// ======================================

options.forEach((option) => {

    option.addEventListener("click", function () {

        // Remove active class from every option
        options.forEach((item) => {
            item.classList.remove("active");
        });


        // Add active class to clicked option
        this.classList.add("active");


        // Store selected option
        selectedOption = this;


        // Enable Continue button
        nextBtn.disabled = false;


        // Update progress
        fill.style.width = "50%";


        // Update message
        analysisText.textContent =
            "🤖 Bug selected. Click Continue to analyze.";

    });

});


// ======================================
// CONTINUE BUTTON
// ======================================

nextBtn.addEventListener("click", function () {

    // Check selection
    if (!selectedOption) {

        analysisText.textContent =
            "⚠️ Please select a bug first.";

        return;
    }


    // Get answer
    const answer = selectedOption.dataset.answer;


    // ==================================
    // CORRECT ANSWER
    // ==================================

    if (answer === "correct") {

        fill.style.width = "100%";

        analysisText.textContent =
            "✅ Correct! The Critical Payment Bug must be handled FIRST.";

        nextBtn.textContent =
            "Continue to Mission 9 →";

        // Go to Mission 9
        nextBtn.onclick = function () {

            window.location.href = "Mission9.html";

        };

    }


    // ==================================
    // WRONG ANSWER
    // ==================================

    else {

        fill.style.width = "70%";

        analysisText.textContent =
            "❌ Not quite. Customers cannot complete payments. This is the highest priority bug.";

    }

});
```
