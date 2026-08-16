import { auth, db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

let selectedAnswer = "";
let selectedOption = null;

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

options.forEach((option, index) => {

    option.addEventListener("click", function () {
    
            options.forEach(opt => opt.classList.remove("active"));
            
                    this.classList.add("active");
                    
                            selectedOption = this;
                            
                                    const title = this.querySelector("h4").textContent;
                                            selectedAnswer = title;
                                            
                                                    fill.style.width = "0%";
                                                    
                                                            text.innerHTML = "🤖 AI is analysing your decision...";
                                                            
                                                                    nextBtn.disabled = true;
                                                                            nextBtn.style.opacity = "0.5";
                                                                            
                                                                                    setTimeout(() => {
                                                                                                fill.style.width = "100%";
                                                                                                        }, 100);
                                                                                                        
                                                                                                                setTimeout(() => {
                                                                                                                
                                                                                                                            text.innerHTML = "✅ Decision Recorded Successfully";
                                                                                                                            
                                                                                                                                        nextBtn.disabled = false;
                                                                                                                                                    nextBtn.style.opacity = "1";
                                                                                                                                                    
                                                                                                                                                            }, 1500);
                                                                                                                                                            
                                                                                                                                                                });
                                                                                                                                                                
                                                                                                                                                                });
                                                                                                                                                                
                                                                                                                                                                
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
                                                                                                                                                                                                                                
                                                                                                                                                                                                                                        await setDoc(
                                                                                                                                                                                                                                                    doc(db, "users", user.uid, "assessment", "developerMindset"),
                                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                                                mission1: {
                                                                                                                                                                                                                                                                                                    question: "What will YOU do first?",
                                                                                                                                                                                                                                                                                                                        answer: selectedAnswer,
                                                                                                                                                                                                                                                                                                                                            completedAt: new Date().toISOString()
                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                                                                                                                                                    { merge: true }
                                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                                    window.location.href = "Mission2.html";
                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                        } catch (error) {
                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                console.error(error);
                                                                                                                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                                                                                                                        alert("Could not save your answer. Please try again.");
                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                                                            });                                                                                                                                                                               });