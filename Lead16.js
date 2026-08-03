const startBtn=document.getElementById("startDream");

const status=document.getElementById("statusText");

const islands=document.querySelectorAll(".island");

let selected=null;

let harmony=0;

/*=========================
START
=========================*/

startBtn.onclick=function(){

startBtn.style.display="none";

status.innerHTML="🌙 Dream Activated...";

setTimeout(()=>{

status.innerHTML=

"Connect emotions to restore harmony.";

activateDream();

},1800);

}

/*=========================
GAME
=========================*/

function activateDream(){

islands.forEach(island=>{

island.onclick=function(){

if(selected==null){

selected=island;

island.style.boxShadow=

"0 0 40px cyan";

}

else{

connectIslands(selected,island);

selected.style.boxShadow=

"0 0 20px rgba(192,132,252,.4)";

selected=null;

}

}

});

}

/*=========================
CONNECTION
=========================*/

function connectIslands(a,b){

if(a===b)return;

const line=document.createElement("div");

line.className="dreamLine";

document.querySelector(".dreamWorld")

.appendChild(line);

const r1=a.getBoundingClientRect();

const r2=b.getBoundingClientRect();

const world=

document.querySelector(".dreamWorld")

.getBoundingClientRect();

let x1=r1.left-world.left+35;

let y1=r1.top-world.top+35;

let x2=r2.left-world.left+35;

let y2=r2.top-world.top+35;

let length=Math.hypot(x2-x1,y2-y1);

let angle=Math.atan2(y2-y1,x2-x1)

*180/Math.PI;

line.style.width=length+"px";

line.style.left=x1+"px";

line.style.top=y1+"px";

line.style.transform=

`rotate(${angle}deg)`;

harmony++;

status.innerHTML=

"Dream Harmony : "+harmony+"/4";

if(harmony>=4){

completeDream();

}

}

/*=========================
COMPLETE
=========================*/

function completeDream(){

status.innerHTML=

"💜 Dream Restored";

document.querySelector(".dreamWorld")

.classList.add("peace");

document.body.classList.add("dreamSuccess");

navigator.vibrate?.(150);

setTimeout(()=>{

window.location.href="Lead17.html";

},3500);

}