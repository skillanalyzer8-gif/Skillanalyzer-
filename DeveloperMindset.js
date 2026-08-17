const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

let selectedAnswer = "";

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

options.forEach(function (option) {

    option.addEventListener("click", function () {

            options.forEach(function (item) {
                        item.classList.remove("active");
                                });

                                        this.classList.add("active");

                                                selectedAnswer = this.querySelector("h4").textContent;

                                                        fill.style.width = "0%";
                                                                text.textContent = "🤖 AI is analysing your decision...";

                                                                        nextBtn.disabled = true;
                                                                                nextBtn.style.opacity = "0.5";

                                                                                        setTimeout(function () {
                                                                                                    fill.style.width = "100%";
                                                                                                            }, 100);

                                                                                                                    setTimeout(function () {

                                                                                                                                text.textContent = "✅ Decision Recorded Successfully";

                                                                                                                                            nextBtn.disabled = false;
                                                                                                                                                        nextBtn.style.opacity = "1";

                                                                                                                                                                }, 1500);

                                                                                                                                                                    });

                                                                                                                                                                    });

                                                                                                                                                                    nextBtn.addEventListener("click", function () {

                                                                                                                                                                        if (selectedAnswer === "") {
                                                                                                                                                                                alert("Please select an option first.");
                                                                                                                                                                                        return;
                                                                                                                                                                                            }

                                                                                                                                                                                                alert("Mission 1 UI is working! Selected: " + selectedAnswer);

                                                                                                                                                                                                });