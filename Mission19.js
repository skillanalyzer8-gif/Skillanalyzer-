const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");
const timer = document.getElementById("timer");

let time = 10;
let answered = false;

// Disable Next button
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

// Countdown
const countdown = setInterval(() => {

    if(answered) return;

        time--;
            timer.innerHTML = time;

                if(time <= 0){

                        clearInterval(countdown);

                                answered = true;

                                        text.innerHTML =
                                                "⏰ Time's Up!<br><br>" +
                                                        "AI Observation:<br>" +
                                                                "Developers must respond quickly during production incidents.";

                                                                        nextBtn.disabled = false;
                                                                                nextBtn.style.opacity = "1";

                                                                                    }

                                                                                    },1000);


                                                                                    // Option Click

                                                                                    options.forEach(option=>{

                                                                                        option.addEventListener("click",function(){

                                                                                                if(answered) return;

                                                                                                        answered = true;

                                                                                                                clearInterval(countdown);

                                                                                                                        options.forEach(opt=>opt.classList.remove("active"));

                                                                                                                                this.classList.add("active");

                                                                                                                                        fill.style.width="0%";

                                                                                                                                                text.innerHTML="🤖 AI is analysing your response...";

                                                                                                                                                        nextBtn.disabled=true;
                                                                                                                                                                nextBtn.style.opacity="0.5";

                                                                                                                                                                        setTimeout(()=>{

                                                                                                                                                                                    fill.style.width="100%";

                                                                                                                                                                                            },100);

                                                                                                                                                                                                    setTimeout(()=>{

                                                                                                                                                                                                                const answer=this.innerText;

                                                                                                                                                                                                                            if(answer.includes("Inform Users")){

                                                                                                                                                                                                                                            text.innerHTML=
                                                                                                                                                                                                                                                            "✅ Excellent Decision!<br><br>" +
                                                                                                                                                                                                                                                                            "Incident Management +20<br>" +
                                                                                                                                                                                                                                                                                            "Decision Making +18<br>" +
                                                                                                                                                                                                                                                                                                            "Leadership +15";

                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                    else if(answer.includes("Check Server Logs")){

                                                                                                                                                                                                                                                                                                                                                    text.innerHTML=
                                                                                                                                                                                                                                                                                                                                                                    "🟡 Good Choice!<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                    "Checking logs is useful, but informing users during a major outage should happen immediately.";

                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                            else if(answer.includes("Restart")){

                                                                                                                                                                                                                                                                                                                                                                                                                            text.innerHTML=
                                                                                                                                                                                                                                                                                                                                                                                                                                            "❌ Risky Decision!<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Restarting every server without investigation may worsen the outage.";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    else{

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    text.innerHTML=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    "❌ Incorrect.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    "Ignoring production alerts can cause serious business losses.";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.disabled=false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.style.opacity="1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    });


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // Continue to Mission 20

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    nextBtn.addEventListener("click",function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        window.location.href="Mission20.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });