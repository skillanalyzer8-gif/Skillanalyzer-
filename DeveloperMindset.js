const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

options.forEach(option => {

    option.addEventListener("click", function () {

            // Remove previous selection
                    options.forEach(opt => opt.classList.remove("active"));

                            // Select current option
                                    this.classList.add("active");

                                            // Reset progress
                                                    fill.style.width = "0%";

                                                            text.innerHTML = "🤖 AI is analysing your decision...";

                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";

                                                                                    // Animate progress bar
                                                                                            setTimeout(() => {
                                                                                                        fill.style.width = "100%";
                                                                                                                }, 100);

                                                                                                                        // After analysis
                                                                                                                                setTimeout(() => {

                                                                                                                                            text.innerHTML = "✅ Decision Recorded Successfully";

                                                                                                                                                        nextBtn.disabled = false;
                                                                                                                                                                    nextBtn.style.opacity = "1";

                                                                                                                                                                            }, 1500);

                                                                                                                                                                                });

                                                                                                                                                                                });

                                                                                                                                                                                nextBtn.addEventListener("click", function () {

                                                                                                                                                                                    window.location.href = "Incident2.html";

                                                                                                                                                                                    });