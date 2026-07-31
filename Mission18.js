const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

const memoryBox = document.getElementById("memoryBox");
const countdown = document.getElementById("countdown");

let time = 5;

// Disable Next button initially
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

// Countdown Timer
const timer = setInterval(() => {

    time--;
        countdown.innerHTML = time;

            if(time <= 0){

                    clearInterval(timer);

                            // Hide memory words
                                    memoryBox.style.visibility = "hidden";

                                        }

                                        },1000);

                                        // Option Click
                                        options.forEach(option => {

                                            option.addEventListener("click",function(){

                                                    options.forEach(opt=>opt.classList.remove("active"));

                                                            this.classList.add("active");

                                                                    fill.style.width="0%";

                                                                            text.innerHTML="🤖 AI is analysing your memory...";

                                                                                    nextBtn.disabled=true;
                                                                                            nextBtn.style.opacity="0.5";

                                                                                                    setTimeout(()=>{

                                                                                                                fill.style.width="100%";

                                                                                                                        },100);

                                                                                                                                setTimeout(()=>{

                                                                                                                                            if(this.innerText.trim()=="return"){

                                                                                                                                                            text.innerHTML=
                                                                                                                                                                            "✅ Excellent Memory!<br><br>" +
                                                                                                                                                                                            "Memory +20<br>" +
                                                                                                                                                                                                            "Focus +18<br>" +
                                                                                                                                                                                                                            "Observation +15";

                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                    else{

                                                                                                                                                                                                                                                                    text.innerHTML=
                                                                                                                                                                                                                                                                                    "❌ Incorrect.<br><br>" +
                                                                                                                                                                                                                                                                                                    "The correct answer was:<br><br>" +
                                                                                                                                                                                                                                                                                                                    "<b>return</b>";

                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                            nextBtn.disabled=false;
                                                                                                                                                                                                                                                                                                                                                        nextBtn.style.opacity="1";

                                                                                                                                                                                                                                                                                                                                                                },1800);

                                                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                                                    // Next Mission
                                                                                                                                                                                                                                                                                                                                                                    nextBtn.addEventListener("click",function(){

                                                                                                                                                                                                                                                                                                                                                                        window.location.href="Mission19.html";

                                                                                                                                                                                                                                                                                                                                                                        });