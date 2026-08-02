const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

options.forEach(option => {

    option.addEventListener("click", function(){

            options.forEach(opt => opt.classList.remove("active"));

                    this.classList.add("active");

                            fill.style.width = "0%";

                                    text.innerHTML = "🤖 AI Emotional Intelligence Analyzer is evaluating your response...";

                                            nextBtn.disabled = true;
                                                    nextBtn.style.opacity = "0.5";

                                                            setTimeout(() => {

                                                                        fill.style.width = "100%";

                                                                                },100);

                                                                                        setTimeout(() => {

                                                                                                    const answer = this.innerText;

                                                                                                                if(answer.includes("Listen carefully")){

                                                                                                                                text.innerHTML =
                                                                                                                                                "✅ Exceptional Leadership!<br><br>" +
                                                                                                                                                                "Empathy +20<br>" +
                                                                                                                                                                                "Emotional Intelligence +18<br>" +
                                                                                                                                                                                                "Team Motivation +15";

                                                                                                                                                                                                            }

                                                                                                                                                                                                                        else if(answer.includes("finish his work")){

                                                                                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                                                                                        "🟡 Partially Effective.<br><br>" +
                                                                                                                                                                                                                                                                        "Performance matters, but understanding the person's situation comes first.";

                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                else if(answer.includes("lose his job")){

                                                                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                                                                "❌ Poor Leadership.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                "Fear may reduce confidence and trust instead of improving performance.";

                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                        else{

                                                                                                                                                                                                                                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                                                                                                                                                                                                                                        "❌ Incorrect Choice.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                        "Ignoring an employee's emotions can damage morale and team relationships.";

                                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href = "Lead5.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });