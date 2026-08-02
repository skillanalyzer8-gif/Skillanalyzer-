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

                                    text.innerHTML = "🤖 AI Public Speaking Analyzer is evaluating your leadership speech...";

                                            nextBtn.disabled = true;
                                                    nextBtn.style.opacity = "0.5";

                                                            setTimeout(() => {

                                                                        fill.style.width = "100%";

                                                                                },100);

                                                                                        setTimeout(() => {

                                                                                                    const answer = this.innerText;

                                                                                                                if(answer.includes("I believe in every one")){

                                                                                                                                text.innerHTML =
                                                                                                                                                "🌟 Outstanding Leadership!<br><br>" +
                                                                                                                                                                "Public Speaking +20<br>" +
                                                                                                                                                                                "Team Motivation +18<br>" +
                                                                                                                                                                                                "Confidence +17<br>" +
                                                                                                                                                                                                                "Leadership Presence +15";

                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                        else if(answer.includes("Anyone who makes mistakes")){

                                                                                                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                                                                                                        "❌ Fear-Based Leadership.<br><br>" +
                                                                                                                                                                                                                                                                                        "Fear may reduce creativity and team confidence. Great leaders inspire rather than threaten.";

                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                else if(answer.includes("Just follow instructions")){

                                                                                                                                                                                                                                                                                                                                text.innerHTML =
                                                                                                                                                                                                                                                                                                                                                "🟡 Average Leadership.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                "Clear instructions are important, but inspiring your team creates stronger commitment.";

                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                        else{

                                                                                                                                                                                                                                                                                                                                                                                                        text.innerHTML =
                                                                                                                                                                                                                                                                                                                                                                                                                        "❌ Weak Leadership.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                                                                        "A leader should energize the team before a major project, not reduce their enthusiasm.";

                                                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            window.location.href = "Lead6.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });