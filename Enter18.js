const startBtn=document.getElementById("startInnovation");

const innovation=document.querySelector(".innovationArea");

const status=document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Reviewing inventions...";

navigator.vibrate?.([120,80,120]);

setTimeout(showIdeas,1800);

});

/*=========================
SHOW INVENTIONS
=========================*/

function showIdeas(){

innovation.innerHTML=`

<h2>

🧪 Innovation Lab

</h2>

<div class="ideaCard">

<h3>🤖 AI Farming Robot</h3>

<p>

Helps farmers grow more food using AI.

</p>

</div>

<div class="ideaCard">

<h3>🔋 Infinite Battery</h3>

<p>

A battery that lasts for several years.

</p>

</div>

<div class="ideaCard">

<h3>🌊 Ocean Cleaning Drone</h3>

<p>

Automatically removes plastic from oceans.

</p>

</div>

<div class="ideaCard">

<h3>🩺 AI Health Scanner</h3>

<p>

Detects diseases within seconds.

</p>

</div>

`;

document.querySelectorAll(".ideaCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

fundIdea(index);

});

});

}

/*=========================
RESULT
=========================*/

function fundIdea(choice){

let title="";
let message="";
let emoji="";

switch(choice){

case 0:

emoji="🤖";

title="Future Farming";

message="Food production increased and farmers' lives improved.";

break;

case 1:

emoji="🔋";

title="Energy Revolution";

message="Clean energy became cheaper for millions of people.";

break;

case 2:

emoji="🌊";

title="Ocean Saved";

message="Plastic pollution dropped and marine life recovered.";

break;

case 3:

emoji="🩺";

title="Healthcare Revolution";

message="Millions of diseases were detected early, saving lives.";

break;

}

innovation.innerHTML=`

<h2>

${emoji} ${title}

</h2>

<br>

<p>

${message}

</p>

<br>

<h2>

🏆 Investors Called It

"The Best Innovation Of The Year"

</h2>

<br>

<h2>

Innovation Score

100/100

</h2>

`;

status.innerHTML="Your investment changed the future.";

navigator.vibrate?.([120,80,120,80,120]);

setTimeout(()=>{

window.location.href="Enter19.html";

},4500);

}