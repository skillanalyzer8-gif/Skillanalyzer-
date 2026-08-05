const startBtn=document.getElementById("startChallenge");

const designArea=document.querySelector(".designArea");

const status=document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="AI is preparing color palettes...";

navigator.vibrate?.([100,80,100]);

setTimeout(showColors,1800);

});

/*=========================
SHOW COLORS
=========================*/

function showColors(){

designArea.innerHTML=`

<h2>

🏦 Banking App

</h2>

<p>

Which color creates the strongest feeling of trust?

</p>

<div class="colorCard blue">

💙 Blue

</div>

<div class="colorCard green">

💚 Green

</div>

<div class="colorCard red">

❤️ Red

</div>

<div class="colorCard orange">

🧡 Orange

</div>

`;

document.querySelectorAll(".colorCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewColor(index);

});

});

}

/*=========================
COLOR RESULT
=========================*/

function reviewColor(choice){

let title="";
let message="";
let satisfaction="";
let accessibility="";
let emotion="";

switch(choice){

case 0:

title="🏆 Perfect Choice";

message="Blue creates trust, stability and security. That's why many banks and financial apps use it.";

satisfaction="98%";

accessibility="96/100";

emotion="Trust";

break;

case 1:

title="🌿 Good Choice";

message="Green represents growth and success, but users trust blue more for banking.";

satisfaction="88%";

accessibility="94/100";

emotion="Growth";

break;

case 2:

title="⚠ Risky Choice";

message="Red creates urgency and danger. It is not suitable as the main banking color.";

satisfaction="63%";

accessibility="89/100";

emotion="Warning";

break;

default:

title="😊 Creative Choice";

message="Orange feels energetic and friendly, but users expect stronger trust from financial apps.";

satisfaction="76%";

accessibility="91/100";

emotion="Energy";

}

designArea.innerHTML=`

<h2>

${title}

</h2>

<br>

<p>

${message}

</p>

<br>

<h3>

😊 User Satisfaction : ${satisfaction}

</h3>

<h3>

♿ Accessibility : ${accessibility}

</h3>

<h3>

🎨 Main Emotion : ${emotion}

</h3>

`;

status.innerHTML="Color psychology analysis completed.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Ui3.html";

},5000);

}