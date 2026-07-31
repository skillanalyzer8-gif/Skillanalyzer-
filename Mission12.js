const cards = document.querySelectorAll(".card");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

// Disable Next button initially
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

cards.forEach(card => {

    card.addEventListener("click", function () {

            // Remove previous selection
                    cards.forEach(c => c.classList.remove("active"));

                            // Highlight selected card
                                    this.classList.add("active");

                                            // Reset progress
                                                    fill.style.width = "0%";

                                                            text.innerHTML = "🤖 AI is analysing your pattern recognition...";

                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";

                                                                                    // Animate progress
                                                                                            setTimeout(() => {

                                                                                                        fill.style.width = "100%";

                                                                                                                },100);

                                                                                                                        // AI Analysis
                                                                                                                                setTimeout(() => {

                                                                                                                                            let answer = this.innerText;

                                                                                                                                                        if(answer === "42"){

                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                        "✅ Excellent!<br><br>" +
                                                                                                                                                                                                        "Algorithmic Thinking +20<br>" +
                                                                                                                                                                                                                        "Pattern Recognition +18<br>" +
                                                                                                                                                                                                                                        "Logical Analysis +15";

                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                else{

                                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                                "❌ Incorrect.<br><br>" +
                                                                                                                                                                                                                                                                                                                "Differences are:<br>" +
                                                                                                                                                                                                                                                                                                                                "+4, +6, +8, +10, +12<br><br>" +
                                                                                                                                                                                                                                                                                                                                                "30 + 12 = <b>42</b>";

                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                        nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                    nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                            },1800);

                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                // Continue to Mission 13

                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                    window.location.href = "Mission13.html";

                                                                                                                                                                                                                                                                                                                                                                                                    });