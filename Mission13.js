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

                            // Highlight current selection
                                    this.classList.add("active");

                                            // Reset AI Analysis
                                                    fill.style.width = "0%";
                                                            text.innerHTML = "🤖 AI is analysing your debugging skills...";

                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";

                                                                                    // Animate progress bar
                                                                                            setTimeout(() => {
                                                                                                        fill.style.width = "100%";
                                                                                                                }, 100);

                                                                                                                        // AI Result
                                                                                                                                setTimeout(() => {

                                                                                                                                            const answer = this.innerText;

                                                                                                                                                        if(answer.includes("Variable name is incorrect")){

                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                        "✅ Excellent Debugging!<br><br>" +
                                                                                                                                                                                                        "Debugging +20<br>" +
                                                                                                                                                                                                                        "Programming Logic +18<br>" +
                                                                                                                                                                                                                                        "Attention to Detail +15";

                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                else{

                                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                                "❌ Incorrect.<br><br>" +
                                                                                                                                                                                                                                                                                                                "The variable is declared as <b>total</b> but printed as <b>totl</b>.<br><br>" +
                                                                                                                                                                                                                                                                                                                                "Correct code:<br><b>print(total)</b>";

                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                        nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                    nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                            },1800);

                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                // Continue to Mission 14

                                                                                                                                                                                                                                                                                                                                                                                nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                    window.location.href = "Mission14.html";

                                                                                                                                                                                                                                                                                                                                                                                    });