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
                                                            text.innerHTML = "🤖 AI is reviewing your code inspection...";

                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";

                                                                                    // Animate progress
                                                                                            setTimeout(() => {

                                                                                                        fill.style.width = "100%";

                                                                                                                },100);

                                                                                                                        // AI Analysis
                                                                                                                                setTimeout(() => {

                                                                                                                                            const answer = this.innerText;

                                                                                                                                                        if(answer.includes("Line 4")){

                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                        "✅ Excellent Code Review!<br><br>" +
                                                                                                                                                                                                        "Code Review +20<br>" +
                                                                                                                                                                                                                        "Observation +18<br>" +
                                                                                                                                                                                                                                        "Debugging +15";

                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                else{

                                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                                "❌ Incorrect.<br><br>" +
                                                                                                                                                                                                                                                                                                                "The bug is in <b>Line 4</b>.<br><br>" +
                                                                                                                                                                                                                                                                                                                                "<code>print(totall)</code><br>" +
                                                                                                                                                                                                                                                                                                                                                "should be<br>" +
                                                                                                                                                                                                                                                                                                                                                                "<code>print(total)</code>";

                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                    nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                            },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                                // Continue to Mission 16

                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                                    window.location.href = "Mission16.html";

                                                                                                                                                                                                                                                                                                                                                                                                                    });