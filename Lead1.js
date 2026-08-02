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

                                    text.innerHTML="🤖 AI Leadership Engine is analysing your leadership style...";

                                            nextBtn.disabled=true;
                                                    nextBtn.style.opacity="0.5";

                                                            setTimeout(()=>{

                                                                        fill.style.width="100%";

                                                                                },100);

                                                                                        setTimeout(()=>{

                                                                                                    const answer=this.innerText;

                                                                                                                if(answer.includes("Introduce yourself")){

                                                                                                                                text.innerHTML=
                                                                                                                                                "✅ Excellent Leadership!<br><br>" +
                                                                                                                                                                "Communication +20<br>" +
                                                                                                                                                                                "Empathy +18<br>" +
                                                                                                                                                                                                "Leadership Presence +15";

                                                                                                                                                                                                            }

                                                                                                                                                                                                                        else if(answer.includes("Immediately assign")){

                                                                                                                                                                                                                                        text.innerHTML=
                                                                                                                                                                                                                                                        "🟡 Good Initiative.<br><br>" +
                                                                                                                                                                                                                                                                        "Leaders should first build trust before assigning responsibilities.";

                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                else if(answer.includes("Go to your cabin")){

                                                                                                                                                                                                                                                                                                                text.innerHTML=
                                                                                                                                                                                                                                                                                                                                "❌ Weak Leadership Start.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                "A leader should interact with the team before focusing on individual work.";

                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                        else{

                                                                                                                                                                                                                                                                                                                                                                                        text.innerHTML=
                                                                                                                                                                                                                                                                                                                                                                                                        "❌ Poor Leadership Choice.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                        "Professional leaders never begin by blaming previous management.";

                                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled=false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity="1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click",function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href="Lead2.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });