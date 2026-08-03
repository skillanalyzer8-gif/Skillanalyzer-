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

                                    text.innerHTML =
                                            "🤖 AI Crisis Commander is analyzing your emergency response...";

                                                    nextBtn.disabled = true;
                                                            nextBtn.style.opacity = "0.5";

                                                                    setTimeout(() => {

                                                                                fill.style.width = "100%";

                                                                                        },100);

                                                                                                setTimeout(() => {

                                                                                                            const answer = this.innerText;

                                                                                                                        if(answer.includes("Assign the infrastructure")){

                                                                                                                                        text.innerHTML =
                                                                                                                                                        "🚀 Outstanding Crisis Leadership!<br><br>" +
                                                                                                                                                                        "Crisis Management +20<br>" +
                                                                                                                                                                                        "Decision Making +19<br>" +
                                                                                                                                                                                                        "Team Coordination +18<br>" +
                                                                                                                                                                                                                        "Client Communication +17";

                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                else if(answer.includes("Wait until")){

                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                "❌ Poor Leadership.<br><br>" +
                                                                                                                                                                                                                                                                                                "Delaying decisions during a crisis increases business losses and customer frustration.";

                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                        else if(answer.includes("Blame the development")){

                                                                                                                                                                                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                                                                                                                                                                                        "🟡 Weak Leadership.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                        "A leader focuses on solving the problem first. Root-cause analysis comes later.";

                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                else{

                                                                                                                                                                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                                                                                                                                                                "❌ Critical Failure.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                "Avoiding responsibility destroys trust and makes the crisis even worse.";

                                                                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    window.location.href = "Lead10.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    });