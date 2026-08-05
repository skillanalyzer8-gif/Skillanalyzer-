const startBtn=document.getElementById("startPitch");

const arena=document.querySelector(".arena");

const status=document.getElementById("statusText");

const investors=[

{

emoji:"💰",

title:"Profit Investor",

question:"What makes your startup profitable?",

answers:[

"Fast revenue growth",

"Nice logo",

"Good colours"

],

correct:0

},

{

emoji:"❤️",

title:"Impact Investor",

question:"How does your startup help people?",

answers:[

"It solves a real problem",

"It has animations",

"It has many buttons"

],

correct:0

},

{

emoji:"📈",

title:"Growth Investor",

question:"Why will users keep coming back?",

answers:[

"Continuous improvements",

"Random updates",

"Changing colours"

],

correct:0

}

];

let current=0;
let score=0;

/*=========================
START
=========================*/

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Calling first investor...";

navigator.vibrate?.(120);

setTimeout(showInvestor,1800);

});

/*=========================
SHOW INVESTOR
=========================*/

function showInvestor(){

const data=investors[current];

arena.innerHTML=`

<div class="investor">

${data.emoji}

</div>

<h2>

${data.title}

</h2>

<p>

${data.question}

</p>

<br>

<div class="pitchCard">${data.answers[0]}</div>

<div class="pitchCard">${data.answers[1]}</div>

<div class="pitchCard">${data.answers[2]}</div>

`;

document.querySelectorAll(".pitchCard").forEach((card,index)=>{

card.addEventListener("click",()=>{

if(index===data.correct){

score++;

status.innerHTML="Investor impressed!";

navigator.vibrate?.(80);

}else{

status.innerHTML="Investor wasn't convinced.";

navigator.vibrate?.(200);

}

current++;

setTimeout(()=>{

if(current<investors.length){

showInvestor();

}else{

finishMission();

}

},1200);

});

});

}

/*=========================
MISSION COMPLETE
=========================*/

function finishMission(){

arena.innerHTML=`

<h2>

🎉 FUNDING RECEIVED

</h2>

<br>

<h1>

₹25,00,000

</h1>

<br>

<p>

Investors Convinced

</p>

<h2>

${score}/3

</h2>

<br>

<h3>

Your Startup is Ready to Scale 🚀

</h3>

`;

status.innerHTML="Investment Secured";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Enter7.html";

},3500);

}