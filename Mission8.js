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

                                            // Reset Progress
                                                    fill.style.width = "0%";
                                                            text.innerHTML = "🤖 AI is analysing bug priority...";

                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";

                                                                                    // Progress Animation
                                                                                            setTimeout(() => {
                                                                                                        fill.style.width = "100%";
                                                                                                                }, 100);

                                                                                                                        // AI Decision
                                                                                                                                setTimeout(() => {

                                                                                                                                            let answer = this.querySelector("h4").innerText;
                                                                                                                                                        let message = "";

                                                                                                                                                                    if(answer === "Critical Payment Bug"){

                                                                                                                                                                                    message =
                                                                                                                                                                                                    "✅ Excellent Priority!<br><br>" +
                                                                                                                                                                                                                    "Problem Solving +20<br>" +
                                                                                                                                                                                                                                    "Customer Focus +18<br>" +
                                                                                                                                                                                                                                                    "Developer DNA Updated";

                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                            else if(answer === "UI Alignment Issue"){

                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                            "⚠ UI is important, but customer payments come first.<br><br>" +
                                                                                                                                                                                                                                                                                                                            "Decision Making +10";

                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                    else if(answer === "Translation Error"){

                                                                                                                                                                                                                                                                                                                                                                    message =
                                                                                                                                                                                                                                                                                                                                                                                    "⚠ Low Priority Bug.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                    "User Experience +8";

                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                            else{

                                                                                                                                                                                                                                                                                                                                                                                                                                            message =
                                                                                                                                                                                                                                                                                                                                                                                                                                                            "❌ Incorrect Priority!<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Critical bugs should always be fixed first.";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    text.innerHTML = message;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // Continue to Mission 9

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href = "Mission9.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });