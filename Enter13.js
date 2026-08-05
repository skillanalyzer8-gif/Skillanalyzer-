const startBtn=document.getElementById("startDay");

const dashboard=document.querySelector(".dashboardArea");

const status=document.getElementById("statusText");

const emergencies=[

{
title:"😡 Angry Customer",
info:"A premium customer is threatening to leave.",
priority:1
},

{
title:"💻 Server Slow",
info:"Website response time is increasing.",
priority:2
},

{
title:"🧑‍💻 Employee Resignation",
info:"Your senior developer wants to quit.",
priority:3
},

{
title:"📞 Investor Calling",
info:"Investor wants today's growth update.",
priority:4
}

];

/*=========================
START
=========================*/

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Business day started...";

navigator.vibrate?.([100,60,100]);

setTimeout(showDashboard,1800);

});

/*=========================
SHOW DASHBOARD
=========================*/

function showDashboard(){

dashboard.innerHTML=`

<h2>

🚨 Four Emergencies!

</h2>

<p>

Choose which one to solve FIRST.

</p>

`;

emergencies.forEach(item=>{

const card=document.createElement("div");

card.className="notificationCard";

card.innerHTML=`

<h3>

${item.title}

</h3>

<p>

${item.info}

</p>

`;

card.addEventListener("click",()=>{

handleEmergency(item);

});

dashboard.appendChild(card);

});

}

/*=========================
HANDLE
=========================*/

function handleEmergency(item){

if(item.priority===1){

status.innerHTML="Excellent Leadership!";

navigator.vibrate?.(100);

dashboard.innerHTML=`

<h2>

👏 Customer Saved

</h2>

<br>

<p>

The customer appreciated your quick response.

</p>

<p>

Positive reviews increased.

</p>

<br>

<h2>

⭐ Customer Trust

99%

</h2>

`;

}

else if(item.priority===2){

status.innerHTML="Good Decision";

dashboard.innerHTML=`

<h2>

💻 Server Fixed

</h2>

<br>

<p>

Performance improved,

but customer complaints continued.

</p>

`;

}

else if(item.priority===3){

status.innerHTML="Fair Decision";

dashboard.innerHTML=`

<h2>

👨‍💻 Employee Retained

</h2>

<br>

<p>

Your team stayed together,

but customers waited longer.

</p>

`;

}

else{

status.innerHTML="Weak Priority";

dashboard.innerHTML=`

<h2>

📞 Investor Happy

</h2>

<br>

<p>

The investor liked your report,

but customers became frustrated.

</p>

`;

}

setTimeout(()=>{

window.location.href="Enter14.html";

},4000);

}