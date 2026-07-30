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

                                            // Reset AI Analysis
                                                    fill.style.width = "0%";
                                                            text.innerHTML = "🤖 AI is analysing the cyber attack...";

                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";

                                                                                    // Animate progress
                                                                                            setTimeout(() => {
                                                                                                        fill.style.width = "100%";
                                                                                                                }, 100);

                                                                                                                        // AI Decision
                                                                                                                                setTimeout(() => {

                                                                                                                                            let answer = this.querySelector("h4").innerText;
                                                                                                                                                        let message = "";

                                                                                                                                                                    if(answer === "Block Suspicious IPs"){

                                                                                                                                                                                    message =
                                                                                                                                                                                                    "✅ Excellent Decision!<br><br>" +
                                                                                                                                                                                                                    "Cyber Security +20<br>" +
                                                                                                                                                                                                                                    "Threat Detection +18<br>" +
                                                                                                                                                                                                                                                    "Developer DNA Updated";

                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                            else if(answer === "Analyze Security Logs"){

                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                            "✅ Great Decision!<br><br>" +
                                                                                                                                                                                                                                                                                                                            "Security Analysis +15<br>" +
                                                                                                                                                                                                                                                                                                                                            "Critical Thinking +12";

                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                    else if(answer === "Force Password Reset"){

                                                                                                                                                                                                                                                                                                                                                                                    message =
                                                                                                                                                                                                                                                                                                                                                                                                    "👍 Acceptable!<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                    "User Protection +10";

                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                            else{

                                                                                                                                                                                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "❌ Critical Mistake!<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Security Awareness -20<br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Customer Trust -15";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    text.innerHTML = message;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // Continue to Mission 6
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href = "Mission6.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });