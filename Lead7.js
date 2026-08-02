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

                                    text.innerHTML =
                                            "🤖 AI Delegation Analyzer is evaluating your leadership strategy...";

                                                    nextBtn.disabled = true;
                                                            nextBtn.style.opacity = "0.5";

                                                                    setTimeout(() => {

                                                                                fill.style.width = "100%";

                                                                                        }, 100);

                                                                                                setTimeout(() => {

                                                                                                            const answer = this.innerText;

                                                                                                                        if (answer.includes("Assign tasks based")) {

                                                                                                                                        text.innerHTML =
                                                                                                                                                        "🌟 Excellent Leadership!<br><br>" +
                                                                                                                                                                        "Strategic Thinking +20<br>" +
                                                                                                                                                                                        "Task Delegation +18<br>" +
                                                                                                                                                                                                        "Resource Management +17<br>" +
                                                                                                                                                                                                                        "Team Efficiency +15";

                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                else if (answer.includes("same task")) {

                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                "🟡 Average Decision.<br><br>" +
                                                                                                                                                                                                                                                                                                "Every team member has different strengths. Smart delegation improves productivity.";

                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                        else if (answer.includes("randomly")) {

                                                                                                                                                                                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                                                                                                                                                                                        "❌ Weak Planning.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                        "Random task assignment often leads to delays and poor quality.";

                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                else {

                                                                                                                                                                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                                                                                                                                                                "❌ Poor Leadership.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                "Trying to do everything yourself creates bottlenecks and reduces team growth.";

                                                                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }, 1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.addEventListener("click", function () {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    window.location.href = "Lead8.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    });