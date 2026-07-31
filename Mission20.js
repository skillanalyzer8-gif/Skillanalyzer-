const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const reportBtn = document.getElementById("reportBtn");
const report = document.getElementById("report");
const finishBtn = document.getElementById("finishBtn");

reportBtn.disabled = true;
reportBtn.style.opacity = "0.5";

options.forEach(option => {

    option.addEventListener("click", function(){

            options.forEach(opt=>opt.classList.remove("active"));

                    this.classList.add("active");

                            fill.style.width="0%";

                                    text.innerHTML="🤖 AI is conducting your final interview...";

                                            reportBtn.disabled=true;
                                                    reportBtn.style.opacity="0.5";

                                                            setTimeout(()=>{

                                                                        fill.style.width="100%";

                                                                                },100);

                                                                                        setTimeout(()=>{

                                                                                                    if(this.innerText.includes("Analyze Error Logs")){

                                                                                                                    text.innerHTML=
                                                                                                                                    "✅ Excellent Decision!<br><br>" +
                                                                                                                                                    "Software developers always investigate the root cause before taking action.";

                                                                                                                                                                }

                                                                                                                                                                            else if(this.innerText.includes("Restart Everything")){

                                                                                                                                                                                            text.innerHTML=
                                                                                                                                                                                                            "🟡 Acceptable, but risky.<br><br>" +
                                                                                                                                                                                                                            "Restarting systems without finding the issue may create bigger problems.";

                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                    else if(this.innerText.includes("Deploy Anyway")){

                                                                                                                                                                                                                                                                    text.innerHTML=
                                                                                                                                                                                                                                                                                    "❌ Poor Decision.<br><br>" +
                                                                                                                                                                                                                                                                                                    "Deploying unstable software can affect thousands of users.";

                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                            else{

                                                                                                                                                                                                                                                                                                                                            text.innerHTML=
                                                                                                                                                                                                                                                                                                                                                            "❌ Incorrect.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                            "Ignoring errors is never recommended in software engineering.";

                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                    reportBtn.disabled=false;
                                                                                                                                                                                                                                                                                                                                                                                                                reportBtn.style.opacity="1";

                                                                                                                                                                                                                                                                                                                                                                                                                        },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                                                                                                                            // Generate Report

                                                                                                                                                                                                                                                                                                                                                                                                                            reportBtn.addEventListener("click",function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                report.style.display="block";

                                                                                                                                                                                                                                                                                                                                                                                                                                    report.scrollIntoView({

                                                                                                                                                                                                                                                                                                                                                                                                                                            behavior:"smooth"

                                                                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                                                                // Finish Assessment

                                                                                                                                                                                                                                                                                                                                                                                                                                                finishBtn.addEventListener("click",function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                    alert(
                                                                                                                                                                                                                                                                                                                                                                                                                                                            "🎉 Congratulations!\n\n" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    "You have successfully completed the Software Development Assessment.\n\n" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "Developer DNA Generated Successfully!"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // Redirect to Home Page
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        window.location.href="index.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });