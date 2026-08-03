const observeBtn = document.getElementById("observeBtn");
const statusText = document.getElementById("statusText");

const agents = document.querySelectorAll(".agent");

let leader = Math.floor(Math.random()*4);

let gameStarted = false;

observeBtn.addEventListener("click",()=>{

observeBtn.style.display="none";

statusText.innerHTML="🤖 AI Simulation Started... Observe Carefully";

gameStarted=true;

moveAgents();

setTimeout(()=>{

statusText.innerHTML="Select the REAL Leader";

agents.forEach((agent,index)=>{

agent.style.cursor="pointer";

agent.onclick=()=>selectLeader(index);

});

},8000);

});

/* ---------------------------- */

function moveAgents(){

let interval=setInterval(()=>{

if(!gameStarted)return;

agents.forEach((agent,index)=>{

let x=Math.random()*280;

let y=Math.random()*160;

if(index===leader){

agent.style.transition="1.2s";

}

else{

agent.style.transition="1.8s";

}

agent.style.left=x+"px";

agent.style.top=y+"px";

});

},1700);

}

/* ---------------------------- */

function selectLeader(index){

gameStarted=false;

agents.forEach(a=>a.style.pointerEvents="none");

if(index===leader){

statusText.innerHTML=

"✅ Incredible Observation!<br><br>"+

"AI detected:<br>"+

"✔ Observation : Excellent<br>"+

"✔ Pattern Recognition : High<br>"+

"✔ Leadership Insight : Outstanding";

agents[index].style.boxShadow=

"0 0 30px lime,0 0 70px lime";

agents[index].style.background=

"radial-gradient(circle,#22C55E,#15803D,#052E16)";

createParticles(agents[index]);

setTimeout(()=>{

window.location.href="Lead14.html";

},3500);

}

else{

statusText.innerHTML=

"❌ Wrong Choice!<br><br>"+

"The Leader escaped.<br>"+

"Simulation Restarting...";

navigator.vibrate?.(250);

document.body.classList.add("shake");

agents[index].style.background=

"radial-gradient(circle,#EF4444,#991B1B,#111827)";

setTimeout(()=>{

location.reload();

},2500);

}

}

/* ---------------------------- */

function createParticles(agent){

for(let i=0;i<18;i++){

let p=document.createElement("div");

p.className="particle";

document.body.appendChild(p);

const rect=agent.getBoundingClientRect();

p.style.left=rect.left+25+"px";

p.style.top=rect.top+25+"px";

let x=(Math.random()*240)-120;

let y=(Math.random()*240)-120;

p.animate([

{

transform:"translate(0,0) scale(1)",

opacity:1

},

{

transform:`translate(${x}px,${y}px) scale(0)`,

opacity:0

}

],{

duration:1200,

easing:"ease-out"

});

setTimeout(()=>{

p.remove();

},1200);

}

}