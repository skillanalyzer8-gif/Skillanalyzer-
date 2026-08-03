const btn = document.getElementById("revealBtn");

const fill = document.getElementById("scoreFill");
const score = document.getElementById("scoreText");

const avatar = document.getElementById("leaderAvatar");
const title = document.getElementById("leaderTitle");
const quote = document.getElementById("leaderQuote");

const traits = document.getElementById("traitList");

btn.onclick = function(){

btn.style.display="none";

quote.innerHTML="Scanning your entire leadership journey...";

let value=0;

const scan = setInterval(()=>{

value++;

fill.style.width=value+"%";

score.innerHTML=value+"%";

if(value>=100){

clearInterval(scan);

showResult();

}

},35);

};

/*=========================
FINAL RESULT
=========================*/

function showResult(){

avatar.innerHTML="👑";

title.innerHTML="VISIONARY LEADER";

quote.innerHTML=
"Your decisions balanced courage, empathy and strategy.<br>"+
"You inspire people while planning for the future.";

traits.innerHTML="";

const strengths=[

"🌟 Strategic Decision Making",

"❤️ High Emotional Intelligence",

"🧠 Excellent Problem Solving",

"⚖️ Balanced Leadership",

"🚀 Future Vision",

"🤝 Team Collaboration",

"🔥 Calm Under Pressure"

];

let i=0;

const reveal=setInterval(()=>{

if(i>=strengths.length){

clearInterval(reveal);

celebrate();

return;

}

const li=document.createElement("li");

li.innerHTML=strengths[i];

li.style.opacity="0";

li.style.transform="translateX(-30px)";

traits.appendChild(li);

setTimeout(()=>{

li.style.transition=".6s";

li.style.opacity="1";

li.style.transform="translateX(0)";

},100);

i++;

},500);

}

/*=========================
CELEBRATION
=========================*/

function celebrate(){

document.body.style.transition="2s";

document.body.style.background="#020617";

createParticles();

setTimeout(()=>{

quote.innerHTML +=

"<br><br><b>🏆 Congratulations!</b><br>"+
"Every great leader starts with a single decision.<br>"+
"<span style='color:#FACC15;'>Today, your legacy begins.</span>";

},2000);

}

/*=========================
GOLDEN PARTICLES
=========================*/

function createParticles(){

for(let i=0;i<80;i++){

let p=document.createElement("div");

p.style.position="fixed";

p.style.width="8px";
p.style.height="8px";

p.style.borderRadius="50%";

p.style.background="gold";

p.style.left=Math.random()*100+"vw";

p.style.top="-20px";

p.style.boxShadow="0 0 15px gold";

p.style.opacity=".9";

document.body.appendChild(p);

let x=(Math.random()*200)-100;
let y=window.innerHeight+100;
let duration=3000+Math.random()*3000;

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

duration:duration,

iterations:1,

easing:"ease-out"

});

setTimeout(()=>{

p.remove();

},duration);

}

navigator.vibrate?.([120,80,120]);

}