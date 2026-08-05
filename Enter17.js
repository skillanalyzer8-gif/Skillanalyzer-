const startBtn=document.getElementById("startHiring");

const interview=document.querySelector(".interviewArea");

const status=document.getElementById("statusText");

let interviewsLeft=3;

const candidates=[

{
name:"Aarav",
skill:"⭐⭐⭐⭐⭐",
team:"⭐⭐",
honesty:"⭐⭐⭐⭐⭐"
},

{
name:"Sophia",
skill:"⭐⭐⭐",
team:"⭐⭐⭐⭐⭐",
honesty:"⭐⭐⭐⭐"
},

{
name:"Kabir",
skill:"⭐⭐⭐⭐",
team:"⭐⭐⭐⭐",
honesty:"⭐⭐⭐⭐⭐"
},

{
name:"Emma",
skill:"⭐⭐⭐⭐⭐",
team:"⭐⭐⭐",
honesty:"⭐⭐⭐"
}

];

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Applications received.";

navigator.vibrate?.(120);

setTimeout(showCandidates,1800);

});

/*=========================
SHOW CANDIDATES
=========================*/

function showCandidates(){

interview.innerHTML="<h2>👥 Select Candidates To Interview</h2>";

candidates.forEach(candidate=>{

const card=document.createElement("div");

card.className="candidateCard";

card.innerHTML=`

<h3>${candidate.name}</h3>

<p>

Tap to interview.

</p>

`;

card.addEventListener("click",()=>{

interviewCandidate(candidate,card);

});

interview.appendChild(card);

});

}

/*=========================
INTERVIEW
=========================*/

function interviewCandidate(candidate,card){

if(interviewsLeft<=0) return;

interviewsLeft--;

card.innerHTML=`

<h3>${candidate.name}</h3>

<p>

Skill : ${candidate.skill}<br>

Teamwork : ${candidate.team}<br>

Honesty : ${candidate.honesty}

</p>

`;

status.innerHTML=

"Interviews Remaining : "+interviewsLeft;

card.onclick=function(){

hireCandidate(candidate);

};

}

/*=========================
HIRE
=========================*/

function hireCandidate(candidate){

interview.innerHTML=`

<h2>

🎉 ${candidate.name} Hired

</h2>

<br>

<p>

Excellent hiring decision.

Every successful company grows because of great people.

</p>

<br>

<h2>

👔 Team Strength Increased

</h2>

`;

status.innerHTML="Recruitment Complete";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Enter18.html";

},4500);

}