const doors = document.querySelectorAll(".door");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

// Disable button initially
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

doors.forEach(door => {

    door.addEventListener("click", function () {

            // Remove previous selection
                    doors.forEach(d => d.classList.remove("active"));

                            // Highlight selected door
                                    this.classList.add("active");

                                            // Reset progress
                                                    fill.style.width = "0%";
                                                            text.innerHTML = "🤖 AI is analysing your decision...";

                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";

                                                                                    // Animate progress
                                                                                            setTimeout(() => {

                                                                                                        fill.style.width = "100%";

                                                                                                                },100);

                                                                                                                        // AI Result
                                                                                                                                setTimeout(() => {

                                                                                                                                            if(this.classList.contains("red")){

                                                                                                                                                            text.innerHTML =
                                                                                                                                                                            "✅ Escape Successful!<br><br>" +
                                                                                                                                                                                            "Decision Making +20<br>" +
                                                                                                                                                                                                            "Logical Elimination +18<br>" +
                                                                                                                                                                                                                            "Critical Thinking +15";

                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                    else if(this.classList.contains("blue")){

                                                                                                                                                                                                                                                                    text.innerHTML =
                                                                                                                                                                                                                                                                                    "❌ Incorrect.<br><br>" +
                                                                                                                                                                                                                                                                                                    "Clue 1 clearly states that the backup server is NOT in the Blue Room.";

                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                            else{

                                                                                                                                                                                                                                                                                                                                            text.innerHTML =
                                                                                                                                                                                                                                                                                                                                                            "❌ Incorrect.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                            "The Green Room contains only networking equipment.<br><br>" +
                                                                                                                                                                                                                                                                                                                                                                                            "The correct answer is the <b>Red Room</b>.";

                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                    nextBtn.disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                nextBtn.style.opacity = "1";

                                                                                                                                                                                                                                                                                                                                                                                                                                        },1800);

                                                                                                                                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                                                                                                                                            // Continue to Mission 15

                                                                                                                                                                                                                                                                                                                                                                                                                                            nextBtn.addEventListener("click", function(){

                                                                                                                                                                                                                                                                                                                                                                                                                                                window.location.href = "Mission15.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                });