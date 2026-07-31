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

                                            // Reset AI Analysis
                                                    fill.style.width = "0%";
                                                            text.innerHTML = "🤖 AI is decoding the binary...";

                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";

                                                                                    // Animate Progress
                                                                                            setTimeout(() => {

                                                                                                        fill.style.width = "100%";

                                                                                                                },100);

                                                                                                                        // AI Result
                                                                                                                                setTimeout(() => {

                                                                                                                                            const answer = this.innerText.trim();

                                                                                                                                                        if(answer === "42"){

                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                        "✅ Binary Decoded Successfully!<br><br>" +
                                                                                                                                                                                                        "Computer Fundamentals +20<br>" +
                                                                                                                                                                                                                        "Binary Logic +18<br>" +
                                                                                                                                                                                                                                        "Problem Solving +15";

                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                else{

                                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                                "❌ Incorrect.<br><br>" +
                                                                                                                                                                                                                                                                                                                "101010₂ = 42₁₀<br><br>" +
                                                                                                                                                                                                                                                                                                                                "Remember:<br>" +
                                                                                                                                                                                                                                                                                                                                                "32 + 8 + 2 = 42";

                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                        nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                    nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                            },1800);

                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                // Continue to Mission 17
                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                    window.location.href = "Mission17.html";

                                                                                                                                                                                                                                                                                                                                                                                                    });