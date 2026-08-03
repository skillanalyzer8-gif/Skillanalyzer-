const startBtn=document.getElementById("startAI");

const status=document.getElementById("statusText");

const growthFill=document.getElementById("growthFill");
const growthText=document.getElementById("growthText");

const ai=document.getElementById("aiCore");

let stage=0;

let growth=0;

let compassion=0;
let logic=0;
let ethics=0;
let innovation=0;
let leadership=0;

const scenarios=[

{
question:"A robot finds a lost child.",
a:"Help immediately ❤️",
b:"Collect more data 🧠"
},

{
question:"Resources are limited.",
a:"Share equally ⚖️",
b:"Reward the hardest worker 🚀"
},

{
question:"A risky invention appears.",
a:"Test carefully 🔬",
b:"Launch immediately ⚡"
},

{
question:"Two teams disagree.",
a:"Listen to both 👂",
b:"Choose the fastest solution ⏱️"
},

{
question:"A village needs power.",
a:"Protect nature 🌳",
b:"Build factories 🏭"
}

];

startBtn.onclick=function(){

startBtn.style.display="none";

nextScenario();

};

/*==========================
SHOW SCENARIO
==========================*/

function nextScenario(){

if(stage>=scenarios.length){

finishAI();

return;

}

const s=scenarios[stage];

status.innerHTML=

"<b>"+s.question+"</b><br><br>"+

"<button onclick='choose(1)'>"+s.a+"</button><br><br>"+

"<button onclick='choose(2)'>"+s.b+"</button>";

}

/*==========================
CHOICE
==========================*/

function choose(option){

switch(stage){

case 0:

if(option==1){

compassion+=2;

}

else{

logic+=2;

}

break;

case 1:

if(option==1){

ethics+=2;

}

else{

leadership+=2;

}

break;

case 2:

if(option==1){

logic+=2;

}

else{

innovation+=2;

}

break;

case 3:

if(option==1){

compassion++;

leadership++;

}

else{

logic++;

}

break;

case 4:

if(option==1){

ethics++;

compassion++;

}

else{

innovation++;

leadership++;

}

break;

}

stage++;

growth+=20;

growthFill.style.width=growth+"%";

growthText.innerHTML=growth+"%";

/* AI evolves visually */

ai.style.transform=

"translate(-50%,-50%) scale("+(1+growth/120)+")";

ai.style.filter=

"drop-shadow(0 0 "+(20+growth)+"px cyan)";

nextScenario();

}

/*==========================
FINAL RESULT
==========================*/

function finishAI(){

let title="Balanced Intelligence 🤖";

let max=Math.max(

compassion,

logic,

ethics,

innovation,

leadership

);

if(max===compassion){

title="Guardian AI ❤️";

}

else if(max===logic){

title="Analytical AI 🧠";

}

else if(max===ethics){

title="Ethical AI ⚖️";

}

else if(max===innovation){

title="Visionary AI 🚀";

}

else if(max===leadership){

title="Commander AI 👑";

}

status.innerHTML=

"<h2>"+title+"</h2><br>"+

"The AI has evolved based on your decisions.<br><br>"+

"Leadership analysis completed.";

navigator.vibrate?.(200);

setTimeout(()=>{

window.location.href="Lead19.html";

},5000);

}