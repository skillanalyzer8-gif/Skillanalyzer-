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
                                            "🤖 AI Emotional Intelligence Analyzer is analyzing your leadership...";

                                                    nextBtn.disabled = true;
                                                            nextBtn.style.opacity = "0.5";

                                                                    setTimeout(() => {

                                                                                fill.style.width = "100%";

                                                                                        },100);

                                                                                                setTimeout(() => {

                                                                                                            const answer = this.innerText;

                                                                                                                        if(answer.includes("Talk to the team")){

                                                                                                                                        text.innerHTML =
                                                                                                                                                        "❤️ Outstanding Leadership!<br><br>" +
                                                                                                                                                                        "Emotional Intelligence +20<br>" +
                                                                                                                                                                                        "Empathy +19<br>" +
                                                                                                                                                                                                        "Trust Building +18<br>" +
                                                                                                                                                                                                                        "People Management +16";

                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                else if(answer.includes("Ignore everyone's mood")){

                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                "🟡 Average Leadership.<br><br>" +
                                                                                                                                                                                                                                                                                                "Ignoring emotions may reduce motivation and productivity over time.";

                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                        else if(answer.includes("Scold everyone")){

                                                                                                                                                                                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                                                                                                                                                                                        "❌ Poor Leadership.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                        "Fear rarely improves performance. Great leaders understand problems before reacting.";

                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                else{

                                                                                                                                                                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                                                                                                                                                                "❌ Weak Decision.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                "Leaving the situation unresolved can damage team morale and confidence.";

                                                                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    window.location.href = "Lead9.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    });