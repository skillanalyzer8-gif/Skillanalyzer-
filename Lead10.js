const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

options.forEach(option => {

option.addEventListener("click",function(){

options.forEach(opt=>opt.classList.remove("active"));

this.classList.add("active");

fill.style.width="0%";

text.innerHTML="🤖 AI Leadership Engine is evaluating your strategy...";

nextBtn.disabled=true;
nextBtn.style.opacity="0.5";

setTimeout(()=>{

fill.style.width="100%";

},100);

setTimeout(()=>{

const answer=this.innerText;

if(answer.includes("Calm the team")){

text.innerHTML=

"🏆 Excellent Leadership!<br><br>"+

"Strategic Thinking +20<br>"+

"Crisis Management +19<br>"+

"Communication +18<br>"+

"Decision Making +20<br>"+

"Leadership Presence +18";

}

else if(answer.includes("Blame")){

text.innerHTML=

"🟡 Average Leadership.<br><br>"+

"Blaming people during emergencies lowers team confidence and productivity.";

}

else if(answer.includes("Ignore")){

text.innerHTML=

"❌ Weak Leadership.<br><br>"+

"Transparent communication is one of the most important responsibilities of a leader.";

}

else{

text.innerHTML=

"❌ Poor Decision.<br><br>"+

"A leader should face challenges, not abandon the mission.";

}

nextBtn.disabled=false;
nextBtn.style.opacity="1";

},1800);

});

});

nextBtn.addEventListener("click",function(){

window.location.href="Lead11.html";

});