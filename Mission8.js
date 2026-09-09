const options = document.querySelectorAll(".option");
const progressFill = document.getElementById("progressFill");
const analysisText = document.getElementById("analysisText");
const nextBtn = document.getElementById("nextBtn");

let selectedOption = null;


/* OPTION SELECTION */

options.forEach(option => {

    option.addEventListener("click", function () {

        // Remove previous selection
        options.forEach(item => {
            item.classList.remove("active");
        });

        // Select current option
        this.classList.add("active");

        selectedOption = this;

        // Enable continue button
        nextBtn.disabled = false;

        // Show progress
        progressFill.style.width = "50%";

        analysisText.textContent =
            "Good choice. Click Continue to check whether this is the best priority.";
    });

});


/* CONTINUE BUTTON */

nextBtn.addEventListener("click", function () {

    if (!selectedOption) {
        return;
    }

    const answer = selectedOption.dataset.answer;

    if (answer === "correct") {

        progressFill.style.width = "100%";

        analysisText.textContent =
            "Correct! A critical payment bug directly affects users and business transactions, so it should be handled first.";

        nextBtn.textContent =
            "Continue to Mission 9 →";

        nextBtn.onclick = function () {
            window.location.href = "Mission9.html";
        };

    } else {

        progressFill.style.width = "70%";

        analysisText.textContent =
            "Not the best priority. Bugs that directly affect critical user functionality should be handled before minor UI or text issues.";

    }

});