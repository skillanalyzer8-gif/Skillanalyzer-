let nature=50;
let economy=50;
let happiness=50;
let water=50;

let turns=5;

const healthFill=document.getElementById("healthFill");
const healthText=document.getElementById("healthText");

const natureValue=document.getElementById("natureValue");
const economyValue=document.getElementById("economyValue");
const happyValue=document.getElementById("happyValue");
const waterValue=document.getElementById("waterValue");

const turnText=document.getElementById("turns");
const status=document.getElementById("statusText");

/*========================
UPDATE SCREEN
========================*/

function updateUI(){

nature=Math.max(0,Math.min(100,nature));
economy=Math.max(0,Math.min(100,economy));
happiness=Math.max(0,Math.min(100,happiness));
water=Math.max(0,Math.min(100,water));

natureValue.innerHTML=nature;
economyValue.innerHTML=economy;
happyValue.innerHTML=happiness;
waterValue.innerHTML=water;

let health=Math.round(
(nature+economy+happiness+water)/4
);

healthFill.style.width=health+"%";
healthText.innerHTML=health+"%";

turnText.innerHTML=turns;

if(turns<=0){

finishMission();

}

}

/*========================
BUTTONS
========================*/

document.getElementById("forestBtn").onclick=function(){

nature+=20;
water+=10;
economy-=8;

status.innerHTML="🌳 Forest Expanded";

turns--;

updateUI();

}

document.getElementById("riverBtn").onclick=function(){

water+=20;
nature+=10;
economy-=5;

status.innerHTML="🌊 Rivers Restored";

turns--;

updateUI();

}

document.getElementById("pollinatorBtn").onclick=function(){

nature+=12;
happiness+=10;
economy+=4;

status.innerHTML="🐝 Pollinators Protected";

turns--;

updateUI();

}

document.getElementById("wildlifeBtn").onclick=function(){

nature+=15;
happiness+=15;
economy-=6;

status.innerHTML="🦌 Wildlife Protected";

turns--;

updateUI();

}

document.getElementById("industryBtn").onclick=function(){

economy+=20;
happiness+=5;
nature-=15;
water-=10;

status.innerHTML="🏭 Industries Expanded";

turns--;

updateUI();

}

/*========================
MISSION RESULT
========================*/

function finishMission(){

document.querySelectorAll(".actions button")
.forEach(btn=>btn.disabled=true);

const total=
(nature+economy+happiness+water)/4;

if(total>=85){

status.innerHTML=
"🌍 AI Result:<br><br>"+
"🏆 ECO VISIONARY<br>"+
"You balanced growth and sustainability brilliantly.";

}

else if(total>=70){

status.innerHTML=
"🌱 AI Result:<br><br>"+
"👑 BALANCED LEADER<br>"+
"You considered both people and nature.";

}

else if(economy>nature){

status.innerHTML=
"💰 AI Result:<br><br>"+
"🏭 INDUSTRIAL PIONEER<br>"+
"You prioritized rapid development.";

}

else{

status.innerHTML=
"🦋 AI Result:<br><br>"+
"🌳 NATURE GUARDIAN<br>"+
"You protected the ecosystem above all.";

}

setTimeout(()=>{

window.location.href="Lead18.html";

},5000);

}

/*========================
INITIALIZE
========================*/

updateUI();