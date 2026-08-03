let resources = 100;

const resourceFill = document.getElementById("resourceFill");
const resourceText = document.getElementById("resourceText");
const status = document.getElementById("statusText");

const costs = {
hospital:40,
flood:35,
fire:30,
traffic:20
};

let solved = [];

/*=========================
START
=========================*/

document.getElementById("startMission").onclick = function(){

status.innerHTML =
"🚨 Multiple emergencies detected.<br>Select where to deploy resources.";

this.style.display = "none";

activateMission();

};

/*=========================
MISSION
=========================*/

function activateMission(){

document.querySelector(".hospital").onclick =
()=>deploy("hospital");

document.querySelector(".flood").onclick =
()=>deploy("flood");

document.querySelector(".fire").onclick =
()=>deploy("fire");

document.querySelector(".traffic").onclick =
()=>deploy("traffic");

}

/*=========================
DEPLOY
=========================*/

function deploy(type){

if(solved.includes(type)) return;

let cost = costs[type];

if(resources < cost){

status.innerHTML =
"❌ Not enough emergency resources.";

return;

}

resources -= cost;

solved.push(type);

resourceFill.style.width = resources + "%";
resourceText.innerHTML = resources + "%";

const card = document.querySelector("." + type);

card.style.opacity = ".45";
card.style.pointerEvents = "none";
card.style.borderColor = "#22C55E";
card.style.boxShadow = "0 0 20px #22C55E";

switch(type){

case "hospital":
status.innerHTML =
"🏥 Backup generators restored.<br>Lives protected.";
break;

case "flood":
status.innerHTML =
"🌊 Rescue teams deployed.<br>Flood contained.";
break;

case "fire":
status.innerHTML =
"🔥 Firefighters controlled the blaze.";
break;

case "traffic":
status.innerHTML =
"🚦 Smart traffic system activated.";
break;

}

if(resources <= 20 || solved.length >= 3){

finishMission();

}

}

/*=========================
RESULT
=========================*/

function finishMission(){

document.querySelectorAll(".crisis").forEach(card=>{

card.style.pointerEvents = "none";

});

let result = "";

if(solved.includes("hospital")){

result =
"👑 HUMANITARIAN COMMANDER<br><br>"+
"You prioritized saving lives first.";

}
else if(solved.includes("flood")){

result =
"🌍 DISASTER STRATEGIST<br><br>"+
"You focused on protecting the largest population.";

}
else if(solved.includes("fire")){

result =
"🔥 RAPID RESPONSE LEADER<br><br>"+
"You acted against immediate danger.";

}
else{

result =
"🚦 SYSTEM OPTIMIZER<br><br>"+
"You restored city movement and coordination.";

}

status.innerHTML =
result +
"<br><br>AI Leadership Analysis Complete.";

navigator.vibrate?.(200);

setTimeout(()=>{

window.location.href="Lead20.html";

},5000);

}