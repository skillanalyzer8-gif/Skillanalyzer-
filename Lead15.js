const startBtn=document.getElementById("startBtn");
const rewindBtn=document.getElementById("rewindBtn");

const meteor=document.querySelector(".meteor");
const reactor=document.querySelector(".reactor");

const timeline=document.getElementById("timelineFill");
const timer=document.getElementById("timer");

const status=document.getElementById("statusText");

let timeLeft=20;
let progress=0;

let meteorPos=20;

let gameStarted=false;
let rewound=false;

rewindBtn.style.display="none";

/*==========================
START
==========================*/

startBtn.onclick=function(){

startBtn.style.display="none";

rewindBtn.style.display="block";

status.innerHTML="Simulation Started...";

gameStarted=true;

startCountdown();

meteorMovement();

}

/*==========================
COUNTDOWN
==========================*/

function startCountdown(){

const interval=setInterval(()=>{

if(!gameStarted)return;

timeLeft--;

progress+=5;

timer.innerHTML=timeLeft;

timeline.style.width=progress+"%";

if(timeLeft<=6){

status.innerHTML="⚠ Reactor Critical";

reactor.style.filter=

"drop-shadow(0 0 35px red)";

}

if(timeLeft<=0){

clearInterval(interval);

status.innerHTML="💥 Reactor Destroyed";

navigator.vibrate?.(400);

setTimeout(()=>{

location.reload();

},2500);

}

},1000);

}

/*==========================
METEOR
==========================*/

function meteorMovement(){

const move=setInterval(()=>{

if(!gameStarted)return;

meteorPos+=12;

meteor.style.top=meteorPos+"px";

if(meteorPos>180){

clearInterval(move);

}

},1000);

}

/*==========================
REWIND
==========================*/

rewindBtn.onclick=function(){

if(rewound)return;

rewound=true;

status.innerHTML="⏪ Rewinding Time...";

document.body.style.filter="hue-rotate(180deg)";

navigator.vibrate?.(200);

setTimeout(()=>{

meteorPos-=60;

meteor.style.top=meteorPos+"px";

document.body.style.filter="none";

status.innerHTML="Timeline Restored";

checkTiming();

},1500);

}

/*==========================
AI DECISION
==========================*/

function checkTiming(){

if(timeLeft<=0 && !rewound){

status.innerHTML=

"✅ Perfect Decision!<br><br>"+

"AI Analysis<br>"+

"✔ Timing : Excellent<br>"+

"✔ Leadership : Outstanding<br>"+

"✔ Judgment : Exceptional";

reactor.style.filter=

"drop-shadow(0 0 40px lime)";

setTimeout(()=>{

window.location.href="Lead16.html";

},3500);

}

else{

status.innerHTML=

"⚠ Timeline Stabilized...<br>"+

"But the decision wasn't optimal.";

setTimeout(()=>{

window.location.href="Lead16.html";

},3500);

}

}