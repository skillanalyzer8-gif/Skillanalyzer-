const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

options.forEach(option => {

    option.addEventListener("click", function(){

            options.forEach(opt=>opt.classList.remove("active"));

                    this.classList.add("active");

                            fill.style.width = "0%";

                                    text.innerHTML = "🤖 AI Crisis Manager is analysing your decision...";

                                            nextBtn.disabled = true;
                                                    nextBtn.style.opacity = "0.5";

                                                            setTimeout(()=>{

                                                                        fill.style.width = "100%";

                                                                                },100);

                                                                                        setTimeout(()=>{

                                                                                                    const answer = this.innerText;

                                                                                                                if(answer.includes("Prioritize critical bugs")){

                                                                                                                                text.innerHTML =
                                                                                                                                                "✅ Outstanding Leadership!<br><br>" +
                                                                                                                                                                "Project Planning +20<br>" +
                                                                                                                                                                                "Time Management +18<br>" +
                                                                                                                                                                                                "Team Leadership +15";

                                                                                                                                                                                                            }

                                                                                                                                                                                                                        else if(answer.includes("Ignore the bugs")){

                                                                                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                                                                                        "❌ Poor Decision.<br><br>" +
                                                                                                                                                                                                                                                                        "Ignoring critical issues can cause project failure and client dissatisfaction.";

                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                else if(answer.includes("Force everyone")){

                                                                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                                                                "🟡 Not the Best Choice.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                "Leaders should avoid exhausting the team. Smart planning is more effective than overworking people.";

                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                        else{

                                                                                                                                                                                                                                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                                                                                                                                                                                                                                        "❌ Incorrect Decision.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                        "Releasing untested software can seriously damage customer trust and company reputation.";

                                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click",function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href = "Lead4.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });