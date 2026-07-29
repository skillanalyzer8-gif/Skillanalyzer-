const options = document.querySelectorAll(".option");

options.forEach(option => {

    option.addEventListener("click", function () {

            // Remove previous selection
                    options.forEach(opt => opt.classList.remove("active"));

                            // Highlight selected option
                                    this.classList.add("active");

                                            // Wait before showing AI analysis
                                                    setTimeout(showAIAnalysis, 1200);

                                                        });

                                                        });

                                                        function showAIAnalysis(){

                                                        document.querySelector(".questionBox").innerHTML = `

                                                        <h2>🤖 AI Decision Analysis</h2>

                                                        <p class="question">

                                                        Why did you choose this action?

                                                        </p>

                                                        <div class="option reason">🛡 It is the safest approach.</div>

                                                        <div class="option reason">🔍 It helps identify the root cause.</div>

                                                        <div class="option reason">⚡ It saves the most time.</div>

                                                        <div class="option reason">😊 It minimizes user impact.</div>

                                                        <div class="analysisBox">

                                                        <div class="loading">

                                                        <div class="loadingFill"></div>

                                                        </div>

                                                        <p id="status">
                                                        Waiting for your response...
                                                        </p>

                                                        </div>

                                                        `;

                                                        const reasons=document.querySelectorAll(".reason");

                                                        reasons.forEach(reason=>{

                                                        reason.addEventListener("click",function(){

                                                        reasons.forEach(r=>r.classList.remove("active"));

                                                        this.classList.add("active");

                                                        document.querySelector(".loadingFill").style.width="100%";

                                                        document.getElementById("status").innerHTML="🤖 AI is analysing your thinking...";

                                                        setTimeout(()=>{

                                                        document.getElementById("status").innerHTML="✅ Thinking Pattern Recorded";

                                                        setTimeout(()=>{

                                                        window.location.href="Mission2.html";

                                                        },1200);

                                                        },1800);

                                                        });

                                                        });

                                                        }js cofe of mission1