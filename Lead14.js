const startBtn=document.getElementById("startMission");
const status=document.getElementById("statusText");

const room=document.querySelector(".room");

const scientists=document.querySelectorAll(".scientist");

let timer=20;

let gravity="down";

let score=0;

startBtn.onclick=function(){

startBtn.style.display="none";

status.innerHTML="🚨 Gravity Failure Detected";

setTimeout(startGame,2000);

}

function startGame(){

status.innerHTML="Choose Gravity Direction";

createControls();

startTimer();

}

/* ------------------------- */
/* CONTROLS */
/* ------------------------- */

function createControls(){

const controls=document.createElement("div");

controls.className="controls";

controls.innerHTML=

`

<button onclick="changeGravity('up')">⬆</button>

<button onclick="changeGravity('left')">⬅</button>

<button onclick="changeGravity('down')">⬇</button>

<button onclick="changeGravity('right')">➡</button>

`;

document.querySelector(".container")

.appendChild(controls);

}

/* ------------------------- */

function changeGravity(dir){

gravity=dir;

room.style.transition="1s";

if(dir==="left"){

room.style.transform="rotate(-90deg)";

}

if(dir==="right"){

room.style.transform="rotate(90deg)";

}

if(dir==="up"){

room.style.transform="rotate(180deg)";

}

if(dir==="down"){

room.style.transform="rotate(0deg)";

}

moveScientists();

}

/* ------------------------- */

function moveScientists(){

scientists.forEach(sc=>{

if(gravity==="left"){

sc.style.left="15px";

}

if(gravity==="right"){

sc.style.left="330px";

}

if(gravity==="up"){

sc.style.top="15px";

}

if(gravity==="down"){

sc.style.top="200px";

}

});

checkRescue();

}

/* ------------------------- */

function checkRescue(){

if(gravity==="down"){

score=4;

status.innerHTML=

"✅ Scientists Safe!";

document.querySelectorAll(".scientist")

.forEach(s=>{

s.style.filter=

"drop-shadow(0 0 20px lime)";

});

setTimeout(()=>{

window.location.href="Lead15.html";

},3000);

}

}

/* ------------------------- */

function startTimer(){

const countdown=setInterval(()=>{

timer--;

status.innerHTML=

"⏳ Time Remaining : "+timer+" sec";

if(score===4){

clearInterval(countdown);

}

if(timer<=0){

clearInterval(countdown);

status.innerHTML=

"💥 Station Destroyed";

navigator.vibrate?.(300);

setTimeout(()=>{

location.reload();

},2500);

}

},1000);

}