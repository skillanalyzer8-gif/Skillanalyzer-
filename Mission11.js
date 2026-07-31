const options = document.querySelectorAll(".option");
const radios = document.querySelectorAll("input[type='radio']");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

// Disable button initially
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

options.forEach(option => {

    option.addEventListener("click", function () {

            // Highlight selected option
                    options.forEach(opt => opt.style.border = "2px solid #CBD5E1");

                            this.style.border = "2px solid #2563EB";

                                    // Reset progress
                                            fill.style.width = "0%";

                                                    text.innerHTML = "🤖 AI is analysing your logical reasoning...";

                                                            nextBtn.disabled = true;
                                                                    nextBtn.style.opacity = "0.5";

                                                                            // Animate progress
                                                                                    setTimeout(() => {

                                                                                                fill.style.width = "100%";

                                                                                                        },100);

                                                                                                                // AI Result
                                                                                                                        setTimeout(() => {

                                                                                                                                    const answer = this.innerText;

                                                                                                                                                if(answer.includes("Kiran")){

                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                "✅ Excellent Deduction!<br><br>" +
                                                                                                                                                                                                "Logical Thinking +20<br>" +
                                                                                                                                                                                                                "Critical Thinking +18<br>" +
                                                                                                                                                                                                                                "Problem Solving +15";

                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                        else{

                                                                                                                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                                                                                                                        "❌ Incorrect.<br><br>" +
                                                                                                                                                                                                                                                                                                        "Use elimination carefully.<br>" +
                                                                                                                                                                                                                                                                                                                        "Arjun didn't fix Payment.<br>" +
                                                                                                                                                                                                                                                                                                                                        "Priya fixed Database.<br>" +
                                                                                                                                                                                                                                                                                                                                                        "So Kiran fixed Payment.";

                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                        // Continue to Mission 12

                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click",function(){

                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href="Mission12.html";

                                                                                                                                                                                                                                                                                                                                                                                                            });