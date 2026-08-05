const startBtn=document.getElementById("startRadar");

const missionArea=document.querySelector(".missionArea");

const status=document.getElementById("statusText");

const missionText=document.getElementById("missionText");

let correct=0;
let totalNeeded=4;

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Scanning city...";

missionText.innerHTML="Finding possible customers...";

navigator.vibrate?.(120);

setTimeout(startMission,2000);

});

function startMission(){

status.innerHTML="Catch your first customers!";

missionArea.innerHTML="";

const people=[

{emoji:"👨‍🎓",good:true},

{emoji:"👩‍🍳",good:true},

{emoji:"👩‍💼",good:false},

{emoji:"👨‍🌾",good:true},

{emoji:"🎮",good:false},

{emoji:"👩‍👧",good:true},

{emoji:"🏃",good:false},

{emoji:"🧑‍💻",good:false}

];

people.forEach(createCustomer);

}

function createCustomer(data){

const person=document.createElement("div");

person.className="customer";

person.innerHTML=data.emoji;

person.style.left=Math.random()*300+"px";

person.style.top=Math.random()*140+"px";

missionArea.appendChild(person);

movePerson(person);

person.addEventListener("click",()=>{

if(data.good){

correct++;

person.style.background="#22C55E";

person.innerHTML="😊";

status.innerHTML=

"Customer Joined! ("+

correct+

"/"+

totalNeeded+

")";

navigator.vibrate?.(80);

}

else{

person.style.background="#DC2626";

person.innerHTML="❌";

status.innerHTML=

"Wrong customer.";

navigator.vibrate?.(200);

}

person.style.pointerEvents="none";

if(correct>=totalNeeded){

finishMission();

}

});

}

function movePerson(person){

let x=Math.random()*300;

let y=Math.random()*140;

setInterval(()=>{

x=Math.random()*300;

y=Math.random()*140;

person.style.left=x+"px";

person.style.top=y+"px";

},1800);

}

function finishMission(){

status.innerHTML="Excellent Market Research!";

missionArea.innerHTML=`

<h2>

🎉 Mission Complete

</h2>

<br>

<p>

You found your first

real customers.

</p>

<br>

<h3>

Startup Growing...

📈

</h3>

`;

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Enter3.html";

},3000);

}