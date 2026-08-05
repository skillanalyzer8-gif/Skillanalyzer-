const startBtn=document.getElementById("startCrisis");

const crisis=document.querySelector(".crisisArea");

const status=document.getElementById("statusText");

const problems=[

{
title:"🔥 Server Down",
impact:"10,000 users cannot log in.",
priority:1
},

{
title:"⭐ Bad Reviews",
impact:"Rating dropped to 3.8 stars.",
priority:2
},

{
title:"💸 Investor Calling",
impact:"Investor wants today's report.",
priority:3
}

];

let solved=[];

/*=========================
START
=========================*/

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Emergency detected...";

navigator.vibrate?.([100,80,100]);

setTimeout(showProblems,1800);

});

/*=========================
SHOW PROBLEMS
=========================*/

function showProblems(){

crisis.innerHTML="<h2>Choose what to solve FIRST</h2>";

problems.forEach(problem=>{

const card=document.createElement("div");

card.className="crisisCard";

card.innerHTML=`

<h3>

${problem.title}

</h3>

<p>

${problem.impact}

</p>

`;

card.addEventListener("click",()=>{

checkDecision(problem);

});

crisis.appendChild(card);

});

}

/*=========================
CHECK
=========================*/

function checkDecision(problem){

if(problem.priority===1){

status.innerHTML="Excellent! You protected your users.";

navigator.vibrate?.(80);

finishMission(true);

}else{

status.innerHTML="That matters... but users come first.";

navigator.vibrate?.(200);

finishMission(false);

}

}

/*=========================
MISSION COMPLETE
=========================*/

function finishMission(correct){

if(correct){

crisis.innerHTML=`

<h2>

🎉 Crisis Solved

</h2>

<br>

<h1>

👥 10,000 Users Saved

</h1>

<br>

<h2>

⭐ Rating Restored

4.9

</h2>

<br>

<h2>

💰 Startup Value

₹40 Lakhs

</h2>

`;

}else{

crisis.innerHTML=`

<h2>

⚠ Crisis Managed

</h2>

<br>

<p>

Your company survived.

Next time, protect your users first.

</p>

`;

}

status.innerHTML="Mission Complete";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Enter9.html";

},3500);

}