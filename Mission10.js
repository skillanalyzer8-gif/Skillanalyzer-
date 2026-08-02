const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

options.forEach(option => {

    option.addEventListener("click", function () {

            options.forEach(opt => opt.classList.remove("active"));

                    this.classList.add("active");

                            fill.style.width = "0%";
                                    text.innerHTML = "🤖 AI is analysing your final mission...";

                                            nextBtn.disabled = true;
                                                    nextBtn.style.opacity = "0.5";

                                                            setTimeout(() => {
                                                                        fill.style.width = "100%";
                                                                                }, 100);

                                                                                        setTimeout(() => {

                                                                                                    text.innerHTML =
                                                                                                                "🎉 Software Development Level 1 Completed!<br><br>" +
                                                                                                                            "Advanced Challenges Unlocked.";

                                                                                                                                        nextBtn.disabled = false;
                                                                                                                                                    nextBtn.style.opacity = "1";

                                                                                                                                                            }, 1800);

                                                                                                                                                                });

                                                                                                                                                                });

                                                                                                                                                                nextBtn.addEventListener("click", function () {

                                                                                                                                                                    window.location.href = "Mission11.html";

                                                                                                                                                                    })