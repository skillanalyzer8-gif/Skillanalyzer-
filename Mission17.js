const steps = document.querySelectorAll(".step");
const result = document.getElementById("result");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

let selectedOrder = [];

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

steps.forEach(step => {

    step.addEventListener("click", function(){

            if(this.classList.contains("selected"))
                        return;

                                this.classList.add("selected");

                                        selectedOrder.push(this.dataset.order);

                                                result.innerHTML = selectedOrder.join(" ➜ ");

                                                        if(selectedOrder.length === 3){

                                                                    fill.style.width = "0%";

                                                                                text.innerHTML = "🤖 AI is analysing your algorithm...";

                                                                                            setTimeout(()=>{

                                                                                                            fill.style.width = "100%";

                                                                                                                        },100);

                                                                                                                                    setTimeout(()=>{

                                                                                                                                                    if(selectedOrder.join("") === "123"){

                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                            "✅ Excellent Algorithm!<br><br>" +
                                                                                                                                                                                                                "Algorithm Design +20<br>" +
                                                                                                                                                                                                                                    "Programming Logic +18<br>" +
                                                                                                                                                                                                                                                        "Computational Thinking +15";

                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                        else{

                                                                                                                                                                                                                                                                                                            text.innerHTML =
                                                                                                                                                                                                                                                                                                                                "❌ Incorrect Order.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                    "Correct Algorithm:<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                        "1️⃣ for i in range(1,6)<br>" +
                                                                                                                                                                                                                                                                                                                                                                                            "2️⃣ Print(i)<br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                "3️⃣ End Loop";

                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click",function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href="Mission18.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });