const startBtn=document.getElementById("startHiring");

const office=document.querySelector(".officeArea");

const status=document.getElementById("statusText");

const candidates=[

{
name:"👨‍💻 Arjun",
skill:"Coding ★★★★★",
team:"★★☆☆☆",
salary:"₹70K"
},

{
name:"👩‍🎨 Meera",
skill:"Design ★★★★☆",
team:"★★★★★",
salary:"₹45K"
},

{
name:"👨‍💼 Rahul",
skill:"Marketing ★★★★★",
team:"★★★☆☆",
salary:"₹60K"
},

{
name:"👩‍🔬 Priya",
skill:"Problem Solving ★★★★★",
team:"★★★★★",
salary:"₹80K"
},

{
name:"👨‍🔧 Kiran",
skill:"Coding ★★★☆☆",
team:"★★★★★",
salary:"₹40K"
},

{
name:"👩‍💻 Sana",
skill:"UI/UX ★★★★☆",
team:"★★★★☆",
salary:"₹50K"
}

];

let hired=[];

/*=========================
START
=========================*/

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Interviewing candidates...";

navigator.vibrate?.(100);

setTimeout(showCandidates,1800);

});

/*=========================
SHOW CANDIDATES
=========================*/

function showCandidates(){

office.innerHTML="<h2>Choose Your First Team (3 Members)</h2>";

candidates.forEach(candidate=>{

const card=document.createElement("div");

card.className="candidateCard";

card.innerHTML=`

<h3>${candidate.name}</h3>

<p>${candidate.skill}</p>

<p>Teamwork : ${candidate.team}</p>

<p>Salary : ${candidate.salary}</p>

`;

card.addEventListener("click",()=>{

if(card.classList.contains("selected")) return;

if(hired.length>=3) return;

card.classList.add("selected");

card.style.background="#22C55E";

hired.push(candidate.name);

status.innerHTML=

"Team Members : "+hired.length+"/3";

navigator.vibrate?.(70);

if(hired.length===3){

setTimeout(finishMission,1200);

}

});

office.appendChild(card);

});

}

/*=========================
MISSION COMPLETE
=========================*/

function finishMission(){

office.innerHTML=`

<h2>

🎉 Team Ready!

</h2>

<br>

<h3>

${hired.join("<br>")}

</h3>

<br>

<h2>

🚀 Your Startup Has Its First Team

</h2>

<br>

<p>

The journey is becoming bigger.

Leadership is no longer about you.

It is about your team.

</p>

`;

status.innerHTML="Hiring Successful";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Enter8.html";

},3500);

}