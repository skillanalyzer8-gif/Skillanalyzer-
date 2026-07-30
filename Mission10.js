const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

// Disable Next Button Initially
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

options.forEach(option => {

    option.addEventListener("click", function () {

            // Remove previous selection
                    options.forEach(opt => opt.classList.remove("active"));

                            // Highlight selected option
                                    this.classList.add("active");

                                            // Reset Progress
                                                    fill.style.width = "0%";
                                                            text.innerHTML = "🤖 AI is verifying deployment strategy...";

                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";

                                                                                    // Animate Progress
                                                                                            setTimeout(() => {

                                                                                                        fill.style.width = "100%";

                                                                                                                },100);

                                                                                                                        // AI Decision
                                                                                                                                setTimeout(() => {

                                                                                                                                            let answer = this.querySelector("h4").innerText;

                                                                                                                                                        let message = "";

                                                                                                                                                                    if(answer === "Run Final Automated Tests"){

                                                                                                                                                                                    message =
                                                                                                                                                                                                    "✅ Excellent Decision!<br><br>" +
                                                                                                                                                                                                                    "Release Management +20<br>" +
                                                                                                                                                                                                                                    "Quality Assurance +18<br>" +
                                                                                                                                                                                                                                                    "Developer DNA Completed 🎉";

                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                            else if(answer === "Deploy to Production"){

                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                            "👍 Good Confidence!<br><br>" +
                                                                                                                                                                                                                                                                                                                            "Always verify with final testing first.<br>" +
                                                                                                                                                                                                                                                                                                                                            "Deployment +12";

                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                    else if(answer === "Rollback Release"){

                                                                                                                                                                                                                                                                                                                                                                                    message =
                                                                                                                                                                                                                                                                                                                                                                                                    "⚠ Rollback is only required when deployment fails.<br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                    "Decision Making +8";

                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                            else{

                                                                                                                                                                                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "❌ Delay without reason reduces business value.<br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Time Management -10";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    text.innerHTML = message;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // Open Developer DNA Report

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click",function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href="DeveloperDNA.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });