const startBtn=document.getElementById("startImpact");

const impact=document.querySelector(".impactArea");

const status=document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Analyzing global challenges...";

navigator.vibrate?.([100,60,100]);

setTimeout(showProjects,1800);

});

function showProjects(){

impact.innerHTML=`

<h2>

🌍 Choose One Global Mission

</h2>

<div class="impactCard">

🌱 Plant 100 Million Trees

</div>

<div class="impactCard">

📚 Build Schools For Children

</div>

<div class="impactCard">

💧 Provide Clean Water

</div>

<div class="impactCard">

🏥 Build Free Hospitals

</div>

`;

document.querySelectorAll(".impactCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

finishMission(index);

});

});

}

function finishMission(choice){

let title="";
let message="";
let emoji="";

switch(choice){

case 0:

emoji="🌱";

title="Planet Protected";

message="Forests grow again. Air becomes cleaner and wildlife returns.";

break;

case 1:

emoji="📚";

title="Education Revolution";

message="Millions of children receive quality education and new opportunities.";

break;

case 2:

emoji="💧";

title="Clean Water Mission";

message="Entire villages receive safe drinking water and healthier lives.";

break;

case 3:

emoji="🏥";

title="Healthcare For Everyone";

message="Families receive life-saving treatment regardless of income.";

break;

}

impact.innerHTML=`

<h2>

${emoji} ${title}

</h2>

<br>

<p>

${message}

</p>

<br>

<h2>

❤️ People Remember Your Company

</h2>

<br>

<h2>

Legacy Score

100/100

</h2>

`;

status.innerHTML="Your company changed millions of lives.";

navigator.vibrate?.([120,80,120,80,120]);

setTimeout(()=>{

window.location.href="Enter16.html";

},4500);

}