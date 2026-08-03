const startBtn = document.getElementById("startMission");
const terminal = document.getElementById("typingText");

const machineStatus =
document.querySelector(".machineStatus");

const outerRing =
document.querySelector(".outerRing");

const middleRing =
document.querySelector(".middleRing");

const core =
document.querySelector(".innerCore");

const missionBox =
document.querySelector(".missionBox");

startBtn.addEventListener("click",()=>{

startBtn.disabled=true;

startBtn.innerHTML="INITIALIZING...";

terminal.innerHTML="Connecting to AI Core...";

setTimeout(()=>{

terminal.innerHTML="Power Restored...";

machineStatus.innerHTML="POWER RESTORING";

machineStatus.style.background="#2563EB";

},1000);

setTimeout(()=>{

terminal.innerHTML="Starting Quantum Reactor...";

outerRing.style.animationDuration="2s";

middleRing.style.animationDuration="1s";

core.style.transform="scale(1.3)";

core.style.boxShadow=

"0 0 30px cyan,0 0 80px cyan";

},2200);

setTimeout(()=>{

terminal.innerHTML="Scanning Leadership DNA...";

},3500);

setTimeout(()=>{

terminal.innerHTML="ACCESS GRANTED";

machineStatus.innerHTML="SYSTEM ONLINE";

machineStatus.style.background="#22C55E";

core.innerHTML="🧠";

core.style.background=

"radial-gradient(circle,#22C55E,#15803D,#052E16)";

},4700);

setTimeout(()=>{

missionBox.innerHTML=`

<h2>

⚙ LEVEL 1

</h2>

<p>

Rotate the three gears until every tooth aligns.

Once all gears are synchronized,

the Machine Brain will unlock.

</p>

<div class="gearPuzzle">

<div class="gear" id="gear1">

⚙

</div>

<div class="gear" id="gear2">

⚙

</div>

<div class="gear" id="gear3">

⚙

</div>

</div>

<button id="unlock">

Unlock Machine

</button>

`;

const gears=document.querySelectorAll(".gear");

let rotation=[0,0,0];

gears.forEach((gear,index)=>{

gear.addEventListener("click",()=>{

rotation[index]+=90;

gear.style.transform=

`rotate(${rotation[index]}deg)`;

});

});

document

.getElementById("unlock")

.addEventListener("click",()=>{

if(

rotation[0]%360===180 &&

rotation[1]%360===90 &&

rotation[2]%360===270

){

terminal.innerHTML=

"⚡ Gear Alignment Successful";

machineStatus.innerHTML=

"LEVEL COMPLETE";

machineStatus.style.background="#22C55E";

setTimeout(()=>{

window.location.href="Lead12.html";

},3000);

}

else{

terminal.innerHTML=

"❌ Gear Alignment Failed";

navigator.vibrate?.(200);

document.body.classList.add("shake");

setTimeout(()=>{

document.body.classList.remove("shake");

},400);

}

});

},6500);

});