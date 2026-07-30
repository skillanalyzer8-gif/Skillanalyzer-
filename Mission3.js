const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

// Disable button initially
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

                                                                                    // Animate progress bar
                                                                                            setTimeout(() => {
                                                                                                        fill.style.width = "100%";
                                                                                                                }, 100);

                                                                                                                        // AI Analysis
                                                                                                                                setTimeout(() => {

                                                                                                                                            let message = "";

                                                                                                                                                        if (this.querySelector("h4").innerText === "Restore Latest Backup") {

                                                                                                                                                                        message = "✅ Excellent! Recovery Planning +20";

                                                                                                                                                                                    } else if (this.querySelector("h4").innerText === "Identify Corrupted Tables") {

                                                                                                                                                                                                    message = "✅ Great! Database Knowledge +18";

                                                                                                                                                                                                                } else if (this.querySelector("h4").innerText === "Shutdown Application") {

                                                                                                                                                                                                                                message = "⚠ Acceptable! System Protection +10";

                                                                                                                                                                                                                                            } else {

                                                                                                                                                                                                                                                            message = "❌ Poor Decision! Customer Trust -20";

                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                    text.innerHTML = message;

                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                    }, 1800);

                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                        // Go to Mission 4
                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click", function () {

                                                                                                                                                                                                                                                                                                                            window.location.href = "Mission4.html";

                                                                                                                                                                                                                                                                                                                            });