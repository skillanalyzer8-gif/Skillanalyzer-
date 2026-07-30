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

                                            // Reset analysis
                                                    fill.style.width = "0%";
                                                            text.innerHTML = "🤖 AI is analysing your cloud strategy...";

                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";

                                                                                    // Animate progress
                                                                                            setTimeout(() => {
                                                                                                        fill.style.width = "100%";
                                                                                                                }, 100);

                                                                                                                        // AI Result
                                                                                                                                setTimeout(() => {

                                                                                                                                            let answer = this.querySelector("h4").innerText;
                                                                                                                                                        let message = "";

                                                                                                                                                                    if(answer === "Scale Servers"){

                                                                                                                                                                                    message =
                                                                                                                                                                                                    "✅ Excellent Decision!<br><br>" +
                                                                                                                                                                                                                    "Cloud Computing +20<br>" +
                                                                                                                                                                                                                                    "Scalability +18<br>" +
                                                                                                                                                                                                                                                    "Developer DNA Updated";

                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                            else if(answer === "Optimize Performance"){

                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                            "👍 Good Decision!<br><br>" +
                                                                                                                                                                                                                                                                                                                            "Performance Optimization +15";

                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                    else if(answer === "Block New Users"){

                                                                                                                                                                                                                                                                                                                                                                    message =
                                                                                                                                                                                                                                                                                                                                                                                    "⚠ Temporary Solution!<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                    "Availability may be affected.";

                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                            else{

                                                                                                                                                                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                                                                                                                                                                            "❌ Critical Mistake!<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Server Crash Risk +100%<br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Customer Satisfaction -20";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    text.innerHTML = message;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // Continue to Mission 8

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href = "Mission8.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });