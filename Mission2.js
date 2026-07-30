const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

// Disable Next button initially
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

options.forEach(option => {

    option.addEventListener("click", function () {

            // Remove previous selection
                    options.forEach(opt => opt.classList.remove("active"));

                            // Highlight selected option
                                    this.classList.add("active");

                                            // Reset progress
                                                    fill.style.width = "0%";

                                                            text.innerHTML = "🤖 AI is analysing your decision...";

                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";

                                                                                    // Start progress animation
                                                                                            setTimeout(() => {
                                                                                                        fill.style.width = "100%";
                                                                                                                }, 100);

                                                                                                                        // AI result
                                                                                                                                setTimeout(() => {

                                                                                                                                            let message = "";

                                                                                                                                                        if (this.querySelector("h4").innerText === "Notify Customers") {

                                                                                                                                                                        message = "✅ Excellent! Customer Trust +20";

                                                                                                                                                                                    } else if (this.querySelector("h4").innerText === "Investigate Gateway Logs") {

                                                                                                                                                                                                    message = "✅ Great! Critical Thinking +18";

                                                                                                                                                                                                                } else if (this.querySelector("h4").innerText === "Rollback Deployment") {

                                                                                                                                                                                                                                message = "✅ Good! Decision Making +15";

                                                                                                                                                                                                                                            } else {

                                                                                                                                                                                                                                                            message = "⚠ Risky Choice! AI suggests reviewing customer impact.";

                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                    text.innerHTML = message;

                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                    }, 1800);

                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                        // Go to Mission 3
                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click", function () {

                                                                                                                                                                                                                                                                                                                            window.location.href = "Mission3.html";

                                                                                                                                                                                                                                                                                                                            });