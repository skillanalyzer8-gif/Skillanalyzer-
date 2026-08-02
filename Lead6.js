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

                                    text.innerHTML = "🤖 AI Communication Analyzer is evaluating your response...";

                                            nextBtn.disabled = true;
                                                    nextBtn.style.opacity = "0.5";

                                                            setTimeout(() => {

                                                                        fill.style.width = "100%";

                                                                                },100);

                                                                                        setTimeout(() => {

                                                                                                    const answer = this.innerText;

                                                                                                                if(answer.includes("Apologize sincerely")){

                                                                                                                                text.innerHTML =
                                                                                                                                                "🌟 Excellent Client Management!<br><br>" +
                                                                                                                                                                "Professional Communication +20<br>" +
                                                                                                                                                                                "Problem Solving +18<br>" +
                                                                                                                                                                                                "Accountability +17<br>" +
                                                                                                                                                                                                                "Client Trust +15";

                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                        else if(answer.includes("isn't your team's fault")){

                                                                                                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                                                                                                        "🟡 Defensive Response.<br><br>" +
                                                                                                                                                                                                                                                                                        "Clients expect responsibility and solutions, not blame.";

                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                else if(answer.includes("End the meeting")){

                                                                                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                                                                                "❌ Poor Leadership.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                "Ending the discussion damages client confidence and professional relationships.";

                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                        else{

                                                                                                                                                                                                                                                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                                                                                                                                                                                                                                                        "❌ Weak Communication.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                        "Silence during a crisis increases frustration. A leader should communicate calmly and confidently.";

                                                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href = "Lead7.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });