const startBtn=document.getElementById("startCrisis");

const newsArea=document.querySelector(".newsArea");

const status=document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Emergency meeting started...";

navigator.vibrate?.([120,80,120]);

setTimeout(showChoices,1800);

});

/*=========================
SHOW CRISIS OPTIONS
=========================*/

function showChoices(){

newsArea.innerHTML=`

<h2>

🚨 Your First Action

</h2>

<div class="crisisCard">

📢 Tell Customers The Truth

</div>

<div class="crisisCard">

👨‍💼 Protect Employees First

</div>

<div class="crisisCard">

💰 Calm Investors First

</div>

<div class="crisisCard">

🤫 Stay Silent

</div>

`;

document.querySelectorAll(".crisisCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

finishMission(index);

});

});

}

/*=========================
RESULT
=========================*/

function finishMission(choice){

let title="";
let message="";

switch(choice){

case 0:

title="🏆 Outstanding Leadership";

message=

"You immediately informed customers honestly. People trusted your company even during the crisis.";

break;

case 1:

title="❤️ Great Team Leader";

message=

"Your employees stayed loyal because you protected them first.";

break;

case 2:

title="📈 Investors Stayed";

message=

"Investors remained confident, but customers wanted faster communication.";

break;

default:

title="⚠ Communication Failed";

message=

"Silence created rumours. Public trust decreased.";

}

newsArea.innerHTML=`

<h2>

${title}

</h2>

<br>

<p>

${message}

</p>

<br>

<h2>

🌍 Global Reputation Updated

</h2>

<br>

<h2>

Leadership Experience +500

</h2>

`;

status.innerHTML="Crisis handled successfully.";

navigator.vibrate?.([120,80,120,80,120]);

setTimeout(()=>{

window.location.href="Enter17.html";

},4500);

}