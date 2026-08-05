const startBtn=document.getElementById("startTrading");

const market=document.querySelector(".marketArea");

const status=document.getElementById("statusText");

const price=document.getElementById("stockPrice");

let stock=100;

const news=[

{
text:"🚀 New Product Launch",
change:+18
},

{
text:"📰 Media Rumour",
change:-10
},

{
text:"💰 Investor Bought Shares",
change:+15
},

{
text:"📉 Competitor Released New Feature",
change:-12
}

];

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Market Opened";

navigator.vibrate?.(100);

setTimeout(startMarket,1500);

});

/*=========================
LIVE MARKET
=========================*/

function startMarket(){

let round=0;

market.innerHTML=`

<h2>

📈 LIVE MARKET

</h2>

<h1 id="livePrice">

₹${stock}

</h1>

<p id="liveNews">

Market is stable...

</p>

<div id="actions"></div>

`;

const livePrice=document.getElementById("livePrice");

const liveNews=document.getElementById("liveNews");

const actionBox=document.getElementById("actions");

const interval=setInterval(()=>{

const event=news[Math.floor(Math.random()*news.length)];

stock+=event.change;

if(stock<40) stock=40;

livePrice.innerHTML="₹"+stock;

liveNews.innerHTML=event.text;

livePrice.style.color=

event.change>0?"#22C55E":"#EF4444";

round++;

if(round===4){

clearInterval(interval);

showActions(actionBox);

}

},2500);

}

/*=========================
CEO ACTION
=========================*/

function showActions(box){

status.innerHTML="Choose your CEO action";

box.innerHTML=`

<div class="actionCard">

📢 Announce New Product

</div>

<div class="actionCard">

🎤 Hold Press Conference

</div>

<div class="actionCard">

💰 Buy Back Company Shares

</div>

`;

document.querySelectorAll(".actionCard")

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

if(choice===1){

stock+=20;

status.innerHTML="Excellent CEO Decision";

}

else if(choice===0){

stock+=12;

status.innerHTML="Good Product Strategy";

}

else{

stock+=8;

status.innerHTML="Investor Confidence Increased";

}

market.innerHTML=`

<h2>

🏆 Market Closed

</h2>

<br>

<h1>

Final Share Price

₹${stock}

</h1>

<br>

<h2>

📈 Company Value Increased

</h2>

`;

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Enter15.html";

},4000);

}