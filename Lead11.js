const buttons = document.querySelectorAll(".energy");
const statusText = document.getElementById("statusText");

const core = document.querySelector(".core");

const correctButton = Math.floor(Math.random()*25);

let attempts = 0;

buttons.forEach((button,index)=>{

button.addEventListener("click",()=>{

attempts++;

button.style.transform="scale(.85)";

setTimeout(()=>{

button.style.transform="scale(1)";

},150);

if(index===correctButton){

core.style.background="radial-gradient(circle,#22C55E,#16A34A,#052E16)";

core.innerHTML="✅";

core.style.boxShadow="0 0 30px lime,0 0 70px lime";

document.body.style.transition=".5s";

document.body.style.background="#052E16";

statusText.innerHTML=

"⚡ MACHINE ACTIVATED!<br><br>"+

"Attempts : "+attempts+

"<br><br>🤖 AI Analysis Complete...<br>"+

"Curiosity ✔<br>"+

"Persistence ✔<br>"+

"Confidence ✔<br>"+

"Leadership Potential Increased";

buttons.forEach(btn=>btn.disabled=true);

setTimeout(()=>{

window.location.href="Lead12.html";

},4500);

}

else{

navigator.vibrate?.(120);

document.body.classList.add("shake");

button.style.background="red";

button.style.boxShadow="0 0 20px red";

core.style.background="radial-gradient(circle,#EF4444,#991B1B,#111827)";

core.innerHTML="⚠";

statusText.innerHTML=

"Wrong Energy Signal...<br>"+

"Machine Stability : "+(100-attempts*4)+"%";

setTimeout(()=>{

button.style.background="linear-gradient(145deg,#1E293B,#334155)";

button.style.boxShadow="0 0 10px rgba(0,255,255,.25)";

core.style.background="radial-gradient(circle,#67E8F9,#06B6D4,#0F172A)";

core.innerHTML="⚡";

document.body.classList.remove("shake");

},500);

}

});

});