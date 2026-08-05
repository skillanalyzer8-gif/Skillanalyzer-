const startBtn=document.getElementById("startDefense");

const defense=document.querySelector(".defenseArea");

const status=document.getElementById("statusText");

const attacks=[

{

title:"🎨 Design Copied",

effect:"Competitor copied your app design.",

priority:2

},

{

title:"📰 Fake News",

effect:"False news is damaging customer trust.",

priority:1

},

{

title:"💰 Price War",

effect:"Competitor reduced prices heavily.",

priority:3

}

];

/*=========================
START
=========================*/

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Competitor attack detected...";

navigator.vibrate?.([100,60,100]);

setTimeout(showAttacks,1800);

});

/*=========================
SHOW ATTACKS
=========================*/

function showAttacks(){

defense.innerHTML=`

<h2>

⚠ Choose What To Defend First

</h2>

`;

attacks.forEach(item=>{

const card=document.createElement("div");

card.className="defenseCard";

card.innerHTML=`

<h3>

${item.title}

</h3>

<p>

${item.effect}

</p>

`;

card.addEventListener("click",()=>{

protect(item);

});

defense.appendChild(card);

});

}

/*=========================
RESULT
=========================*/

function protect(item){

if(item.priority===1){

status.innerHTML="Excellent Leadership!";

navigator.vibrate?.(100);

defense.innerHTML=`

<h2>

🛡 Brand Protected

</h2>

<br>

<h2>

⭐ Customer Trust Restored

</h2>

<br>

<p>

People believe your company again.

Competitors failed to damage your reputation.

</p>

<br>

<h2>

📈 Brand Reputation

98%

</h2>

`;

}

else if(item.priority===2){

status.innerHTML="Good Choice";

navigator.vibrate?.(120);

defense.innerHTML=`

<h2>

🎨 Design Protected

</h2>

<br>

<p>

Your product stays unique.

But fake news continues spreading.

</p>

`;

}

else{

status.innerHTML="Risky Decision";

navigator.vibrate?.(180);

defense.innerHTML=`

<h2>

💰 Price Protected

</h2>

<br>

<p>

You matched competitor prices.

Unfortunately,

customers still lost trust.

</p>

`;

}

setTimeout(()=>{

window.location.href="Enter13.html";

},4000);

}