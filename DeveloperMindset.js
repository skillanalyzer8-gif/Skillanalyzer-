import { auth } from "./firebase.js";
import { saveMissionAnswer } from "./missionFirebase.js";

const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

let selectedAnswer = "";


// Disable Next button initially
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";


// Option selection
options.forEach(option => {

    option.addEventListener("click", function () {
    
            options.forEach(opt => {
                        opt.classList.remove("active");
                                });
                                
                                        this.classList.add("active");
                                        
                                                selectedAnswer =
                                                            this.querySelector("h4").textContent.trim();
                                                            
                                                                    fill.style.width = "0%";
                                                                    
                                                                            text.innerHTML =
                                                                                        "🤖 AI is analysing your decision...";
                                                                                        
                                                                                                nextBtn.disabled = true;
                                                                                                        nextBtn.style.opacity = "0.5";
                                                                                                        
                                                                                                        
                                                                                                                setTimeout(() => {
                                                                                                                
                                                                                                                            fill.style.width = "100%";
                                                                                                                            
                                                                                                                                    }, 100);
                                                                                                                                    
                                                                                                                                    
                                                                                                                                            setTimeout(() => {
                                                                                                                                            
                                                                                                                                                        text.innerHTML =
                                                                                                                                                                        "✅ Decision Recorded Successfully";
                                                                                                                                                                        
                                                                                                                                                                                    nextBtn.disabled = false;
                                                                                                                                                                                                nextBtn.style.opacity = "1";
                                                                                                                                                                                                
                                                                                                                                                                                                        }, 1500);
                                                                                                                                                                                                        
                                                                                                                                                                                                            });
                                                                                                                                                                                                            
                                                                                                                                                                                                            });
                                                                                                                                                                                                            
                                                                                                                                                                                                            
                                                                                                                                                                                                            // Next Mission
                                                                                                                                                                                                            nextBtn.addEventListener("click", async function () {
                                                                                                                                                                                                            
                                                                                                                                                                                                                if (selectedAnswer === "") {
                                                                                                                                                                                                                
                                                                                                                                                                                                                        alert("Please select an option first.");
                                                                                                                                                                                                                        
                                                                                                                                                                                                                                return;
                                                                                                                                                                                                                                
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                        const user = auth.currentUser;
                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                            if (!user) {
                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                    alert("Please login first.");
                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                            window.location.href = "Login.html";
                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                    await saveMissionAnswer(
                                                                                                                                                                                                                                                                                                user.uid,
                                                                                                                                                                                                                                                                                                            "software",
                                                                                                                                                                                                                                                                                                                        1,
                                                                                                                                                                                                                                                                                                                                    selectedAnswer
                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                    alert("Mission 1 answer saved successfully!");
                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                            window.location.href = "Mission2.html";
                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                } catch (error) {
                                                                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                                                                        console.error("Firebase error:", error);
                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                alert(
                                                                                                                                                                                                                                                                                                                                                                                            "Could not save your answer: " + error.message
                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                        });                                                                                                                                                                                                                                                                                                                                                                 });                                                                                                                                                                               