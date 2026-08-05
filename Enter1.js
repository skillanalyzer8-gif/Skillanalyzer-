const activateBtn=document.getElementById("activateScanner");

const scanner=document.getElementById("scannerCircle");

const scannerLab=document.querySelector(".scannerLab");

const scannerText=document.getElementById("scannerText");

const status=document.getElementById("statusText");

activateBtn.addEventListener("click",()=>{

activateBtn.disabled=true;

activateBtn.innerHTML="SCANNING...";

scanner.classList.add("scanAnimation");

status.innerHTML="Connecting to Opportunity AI...";

navigator.vibrate?.(120);

setTimeout(()=>{

status.innerHTML="Scanning nearby people...";

},1200);

setTimeout(()=>{

status.innerHTML="Hidden opportunities found.";

showCity();

},3000);

});

/*==========================
CITY
==========================*/

function showCity(){

scannerLab.innerHTML=`

<h2 style="margin-bottom:15px;">

🌆 Future City

</h2>

<div class="peopleGrid">

<div class="person">

👨‍🎓

<p>Books are too heavy.</p>

</div>

<div class="person">

👩‍🍳

<p>Food gets wasted.</p>

</div>

<div class="person">

👨‍🌾

<p>Weather changes suddenly.</p>

</div>

<div class="person">

👩‍💼

<p>Parking takes too long.</p>

</div>

<div class="person">

👩‍👧

<p>Finding babysitters is hard.</p>

</div>

<div class="person">

🎮

<p>Internet is slow.</p>

</div>

</div>

`;

status.innerHTML="Tap any person.";

document.querySelectorAll(".person").forEach(person=>{

person.addEventListener("click",()=>{

inspectProblem(person);

});

});

}

/*==========================
INSPECT
==========================*/

function inspectProblem(card){

document.querySelectorAll(".person").forEach(p=>{

p.style.pointerEvents="none";

});

card.style.transform="scale(1.08)";

card.style.boxShadow="0 0 25px cyan";

status.innerHTML="Analyzing opportunity...";

setTimeout(()=>{

scannerLab.innerHTML=`

<h2>

🔍 Opportunity Analysis

</h2>

<div class="missionCard">

<h3>Problem Detected</h3>

<p>

${card.innerText}

</p>

<br>

<p>

People Affected ⭐⭐⭐⭐⭐

</p>

<p>

Difficulty ⭐⭐⭐

</p>

<p>

Business Potential ❓ Hidden

</p>

</div>

<button id="continueBtn">

CONTINUE

</button>

`;

document.getElementById("continueBtn")

.addEventListener("click",reasonScreen);

},1800);

}

/*==========================
WHY?
==========================*/

function reasonScreen(){

scannerLab.innerHTML=`

<h2>

Why did you choose this?

</h2>

<button class="choice">

🌍 Many people need this.

</button>

<button class="choice">

💰 It can become a business.

</button>

<button class="choice">

❤️ I want to help people.

</button>

`;

document.querySelectorAll(".choice").forEach(btn=>{

btn.addEventListener("click",()=>{

status.innerHTML="AI is studying your thinking...";

setTimeout(()=>{

scannerLab.innerHTML=`

<h2>

🏢 Startup Created

</h2>

<h3>

Project Name

</h3>

<p>

??????

</p>

<br>

<p>

Mission Complete

</p>

`;

status.innerHTML="Excellent start.";

navigator.vibrate?.([100,70,100]);

setTimeout(()=>{

window.location.href="Enter2.html";

},3000);

},2000);

});

});

}