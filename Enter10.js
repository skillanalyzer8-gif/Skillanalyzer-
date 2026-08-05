const startBtn=document.getElementById("startPitch");

const arena=document.querySelector(".pitchArena");

const status=document.getElementById("statusText");

let pitch={

problem:false,

solution:false,

business:false,

growth:false,

vision:false

};

/*=========================
START
=========================*/

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Investors are watching...";

navigator.vibrate?.(120);

setTimeout(showPitchBuilder,1800);

});

/*=========================
BUILD YOUR PITCH
=========================*/

function showPitchBuilder(){

arena.innerHTML=`

<h2>

🎤 Build Your Pitch

</h2>

<br>

<div class="pitchCard" data-key="problem">

🎯 Explain the Problem

</div>

<div class="pitchCard" data-key="solution">

💡 Explain the Solution

</div>

<div class="pitchCard" data-key="business">

💰 Business Model

</div>

<div class="pitchCard" data-key="growth">

📈 Growth Plan

</div>

<div class="pitchCard" data-key="vision">

🌍 Future Vision

</div>

`;

document.querySelectorAll(".pitchCard").forEach(card=>{

card.addEventListener("click",()=>{

const key=card.dataset.key;

if(pitch[key]) return;

pitch[key]=true;

card.style.background="#22C55E";

card.innerHTML+=" ✅";

navigator.vibrate?.(60);

checkComplete();

});

});

}

/*=========================
CHECK
=========================*/

function checkComplete(){

if(

pitch.problem&&

pitch.solution&&

pitch.business&&

pitch.growth&&

pitch.vision

){

status.innerHTML="Pitch Complete!";

setTimeout(showResult,1200);

}

}

/*=========================
RESULT
=========================*/

function showResult(){

arena.innerHTML=`

<h2>

🦈 Investors' Decision

</h2>

<br>

<h2>

👏 Standing Ovation!

</h2>

<br>

<p>

Your pitch inspired the investors.

</p>

<br>

<h2>

💰 Investment Secured

₹2 Crore

</h2>

<br>

<h2>

🚀 Startup Valuation

₹20 Crore

</h2>

`;

status.innerHTML="National Recognition Achieved";

navigator.vibrate?.([120,80,120,80,120]);

setTimeout(()=>{

window.location.href="Enter11.html";

},4000);

}