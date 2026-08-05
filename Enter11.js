const startBtn=document.getElementById("startExpansion");

const world=document.querySelector(".worldArea");

const status=document.getElementById("statusText");

const markets=[

{

country:"🇮🇳 India",

info:"Huge user base • High competition",

score:9

},

{

country:"🇺🇸 USA",

info:"High profits • Expensive market",

score:8

},

{

country:"🇯🇵 Japan",

info:"Quality-focused customers",

score:7

},

{

country:"🇧🇷 Brazil",

info:"Fast-growing digital market",

score:8

}

];

/*=========================
START
=========================*/

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Analyzing global markets...";

navigator.vibrate?.(120);

setTimeout(showMarkets,1800);

});

/*=========================
SHOW MARKETS
=========================*/

function showMarkets(){

world.innerHTML=`

<h2>

🌍 Choose Your First Global Market

</h2>

`;

markets.forEach(place=>{

const card=document.createElement("div");

card.className="countryCard";

card.innerHTML=`

<h3>

${place.country}

</h3>

<p>

${place.info}

</p>

`;

card.addEventListener("click",()=>{

expand(place);

});

world.appendChild(card);

});

}

/*=========================
RESULT
=========================*/

function expand(place){

status.innerHTML="Launching internationally...";

navigator.vibrate?.([80,60,80]);

setTimeout(()=>{

world.innerHTML=`

<h2>

🚀 Expansion Successful

</h2>

<br>

<h2>

${place.country}

</h2>

<br>

<p>

Your startup successfully entered a new market.

</p>

<br>

<h2>

📈 New Users

+1,20,000

</h2>

<br>

<h2>

🌍 Global Presence

Unlocked

</h2>

`;

status.innerHTML="International Success";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Enter12.html";

},4000);

},1800);

}