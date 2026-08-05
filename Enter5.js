const startBtn=document.getElementById("startAnalysis");

const lab=document.querySelector(".marketLab");

const status=document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Collecting customer data...";

navigator.vibrate?.(120);

setTimeout(showDashboard,2200);

});

/*=========================
MARKET DASHBOARD
=========================*/

function showDashboard(){

lab.innerHTML=`

<h2>

📊 Startup Analytics

</h2>

<br>

<div class="optionCard">

👥 Users : 327

</div>

<div class="optionCard">

⭐ Rating : 4.2

</div>

<div class="optionCard">

📈 Daily Growth : +8%

</div>

<br>

<p>

You only have enough money to improve ONE area.

</p>

<div class="featureGrid">

<div class="optionCard improve">

⚡ Improve Speed

</div>

<div class="optionCard improve">

🎨 Better Design

</div>

<div class="optionCard improve">

🔔 Add Notifications

</div>

</div>

`;

status.innerHTML="Choose your next investment.";

document.querySelectorAll(".improve").forEach(card=>{

card.addEventListener("click",()=>{

analyzeChoice(card.innerText);

});

});

}

/*=========================
AI ANALYSIS
=========================*/

function analyzeChoice(choice){

status.innerHTML="AI predicting market reaction...";

navigator.vibrate?.(80);

setTimeout(()=>{

lab.innerHTML=`

<h2>

🚀 Market Response

</h2>

<br>

<h3>

${choice}

</h3>

<br>

<p>

Customers loved your decision!

</p>

<br>

<h2>

👥 Users : 327 → 824

</h2>

<br>

<h2>

⭐ Rating : 4.8

</h2>

<br>

<h2>

💰 Company Value

₹80,000

</h2>

`;

status.innerHTML="Product-Market Fit Improved";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Enter6.html";

},3500);

},2000);

}