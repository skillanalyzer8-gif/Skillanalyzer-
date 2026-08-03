const bootScreen = document.getElementById("bootScreen");
const gameScreen = document.getElementById("gameScreen");

const bootText = document.getElementById("bootText");
const terminal = document.getElementById("terminalText");

const beginBtn = document.getElementById("beginMission");

/* ---------------- BOOT SEQUENCE ---------------- */

setTimeout(()=>{

bootText.innerHTML="Loading AI Core...";

},1000);

setTimeout(()=>{

bootText.innerHTML="Scanning Leadership Database...";

},2200);

setTimeout(()=>{

bootText.innerHTML="Virus Detected...";

},3400);

setTimeout(()=>{

bootText.innerHTML="Entering Recovery Mode...";

},4700);

setTimeout(()=>{

bootScreen.style.display="none";

gameScreen.style.display="block";

},6200);

/* ---------------- MISSION ---------------- */

beginBtn.addEventListener("click",()=>{

beginBtn.style.display="none";

terminal.innerHTML="Accessing Firewall...";

setTimeout(()=>{

terminal.innerHTML="Searching Security Nodes...";

},1200);

setTimeout(()=>{

terminal.innerHTML="Firewall Located...";

},2200);

setTimeout(()=>{

terminal.innerHTML="Connect every Security Node.";

createPuzzle();

},3200);

});

/* ---------------- SECURITY NODE GAME ---------------- */

function createPuzzle(){

const firewall=document.querySelector(".firewall");

firewall.innerHTML=`

<h2 style="margin-bottom:20px;color:#22D3EE;">
LEVEL 1 : SECURITY NODES
</h2>

<div id="grid"></div>

<p id="gameStatus">
Connect every node.
</p>

`;

const grid=document.getElementById("grid");

grid.style.display="grid";

grid.style.gridTemplateColumns="repeat(4,70px)";

grid.style.gap="18px";

grid.style.justifyContent="center";

let score=0;

for(let i=0;i<16;i++){

let node=document.createElement("div");

node.className="node";

node.onclick=function(){

if(!node.classList.contains("active")){

node.classList.add("active");

score++;

navigator.vibrate?.(40);

if(score===16){

levelComplete();

}

}

}

grid.appendChild(node);

}

}

/* ---------------- LEVEL COMPLETE ---------------- */

function levelComplete(){

terminal.innerHTML=

"Firewall Breached Successfully...";

document.getElementById("gameStatus").innerHTML=

"AI is Unlocking Level 2...";

document.querySelectorAll(".node").forEach(node=>{

node.style.background="#22C55E";

node.style.boxShadow="0 0 20px lime";

});

setTimeout(()=>{

window.location.href="Lead13.html";

},3500);

}