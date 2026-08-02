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

                            fill.style.width="0%";

                                    text.innerHTML="🤖 AI Conflict Analyzer is evaluating your leadership...";

                                            nextBtn.disabled=true;
                                                    nextBtn.style.opacity="0.5";

                                                            setTimeout(()=>{

                                                                        fill.style.width="100%";

                                                                                },100);

                                                                                        setTimeout(()=>{

                                                                                                    const answer=this.innerText;

                                                                                                                if(answer.includes("Listen to both")){

                                                                                                                                text.innerHTML=
                                                                                                                                                "✅ Outstanding Leadership!<br><br>" +
                                                                                                                                                                "Conflict Resolution +20<br>" +
                                                                                                                                                                                "Active Listening +18<br>" +
                                                                                                                                                                                                "Fair Decision Making +15";

                                                                                                                                                                                                            }

                                                                                                                                                                                                                        else if(answer.includes("Support Rahul")){

                                                                                                                                                                                                                                        text.innerHTML=
                                                                                                                                                                                                                                                        "🟡 Incomplete Decision.<br><br>" +
                                                                                                                                                                                                                                                                        "A leader should hear both sides before making a judgment.";

                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                else if(answer.includes("Support Priya")){

                                                                                                                                                                                                                                                                                                                text.innerHTML=
                                                                                                                                                                                                                                                                                                                                "🟡 Incomplete Decision.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                "Fair leaders avoid taking sides without understanding the full situation.";

                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                        else{

                                                                                                                                                                                                                                                                                                                                                                                        text.innerHTML=
                                                                                                                                                                                                                                                                                                                                                                                                        "❌ Poor Leadership Choice.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                        "Removing both employees without resolving the issue may reduce team trust and morale.";

                                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled=false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity="1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click",function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href="Lead3.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });