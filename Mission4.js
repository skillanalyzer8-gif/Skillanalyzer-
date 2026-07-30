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
                                                            text.innerHTML = "🤖 AI is analysing system performance...";

                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";

                                                                                    // Animate Progress Bar
                                                                                            setTimeout(() => {
                                                                                                        fill.style.width = "100%";
                                                                                                                }, 100);

                                                                                                                        // AI Result
                                                                                                                                setTimeout(() => {

                                                                                                                                            let message = "";

                                                                                                                                                        const answer = this.querySelector("h4").innerText;

                                                                                                                                                                    if(answer === "Memory Leak"){

                                                                                                                                                                                    message =
                                                                                                                                                                                                    "✅ Excellent Diagnosis!<br><br>" +
                                                                                                                                                                                                                    "Performance Optimization +20<br>" +
                                                                                                                                                                                                                                    "Debugging Skills +18<br>" +
                                                                                                                                                                                                                                                    "Developer DNA Updated";

                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                            else if(answer === "CPU Overload"){

                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                            "👍 Good Observation!<br><br>" +
                                                                                                                                                                                                                                                                                                                            "System Monitoring +10";

                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                    else if(answer === "Network Congestion"){

                                                                                                                                                                                                                                                                                                                                                                    message =
                                                                                                                                                                                                                                                                                                                                                                                    "⚠ Possible... but not the primary bottleneck.";

                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                            else{

                                                                                                                                                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                                                                                                                                                            "❌ Incorrect Diagnosis!<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Disk usage is normal.<br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Try analysing RAM utilization.";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    text.innerHTML = message;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // Next Mission

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click",function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href="Mission5.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });