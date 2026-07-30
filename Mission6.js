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
                                                            text.innerHTML = "🤖 AI is analysing the API failure...";

                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";

                                                                                    // Animate Progress Bar
                                                                                            setTimeout(() => {
                                                                                                        fill.style.width = "100%";
                                                                                                                }, 100);

                                                                                                                        // AI Decision
                                                                                                                                setTimeout(() => {

                                                                                                                                            let answer = this.querySelector("h4").innerText;
                                                                                                                                                        let message = "";

                                                                                                                                                                    if(answer === "Check Server Logs"){

                                                                                                                                                                                    message =
                                                                                                                                                                                                    "✅ Excellent Decision!<br><br>" +
                                                                                                                                                                                                                    "Backend Debugging +20<br>" +
                                                                                                                                                                                                                                    "API Analysis +18<br>" +
                                                                                                                                                                                                                                                    "Developer DNA Updated";

                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                            else if(answer === "Restart API Service"){

                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                            "👍 Good Decision!<br><br>" +
                                                                                                                                                                                                                                                                                                                            "Service Recovery +10";

                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                    else if(answer === "Restart Database"){

                                                                                                                                                                                                                                                                                                                                                                    message =
                                                                                                                                                                                                                                                                                                                                                                                    "⚠ Database is healthy.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                    "Wrong component selected.";

                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                            else{

                                                                                                                                                                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                                                                                                                                                                            "❌ Poor Decision!<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Problem Solving -20<br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Customer Trust -15";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    text.innerHTML = message;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // Continue to Mission 7

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href = "Mission7.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });