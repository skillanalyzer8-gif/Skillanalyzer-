const startBtn=document.getElementById("startFuture");

const future=document.querySelector(".futureArea");

const status=document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="World Future Summit Started...";

navigator.vibrate?.([120,80,120]);

setTimeout(showProjects,1800);

});

/*=========================
SHOW FUTURE PROJECTS
=========================*/

function showProjects(){

future.innerHTML=`

<h2>

🌍 Choose One Global Project

</h2>

<div class="futureCard">

<h3>🚀 Build The First Mars City</h3>

<p>

Create humanity's first permanent home on Mars.

</p>

</div>

<div class="futureCard">

<h3>🤖 AI Teacher For Every Child</h3>

<p>

Every child receives a free AI teacher.

</p>

</div>

<div class="futureCard">

<h3>🌱 Climate Recovery Project</h3>

<p>

Restore forests, oceans and wildlife worldwide.

</p>

</div>

<div class="futureCard">

<h3>⚡ Unlimited Clean Energy</h3>

<p>

Provide affordable clean energy to every nation.

</p>

</div>

`;

document.querySelectorAll(".futureCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

chooseFuture(index);

});

});

}

/*=========================
RESULT
=========================*/

function chooseFuture(choice){

let title="";
let message="";
let icon="";

switch(choice){

case 0:

icon="🚀";

title="Space Civilization";

message="Humanity became a multi-planet species.";

break;

case 1:

icon="📚";

title="Education Revolution";

message="Every child received equal learning opportunities.";

break;

case 2:

icon="🌱";

title="Planet Restored";

message="Nature recovered and future generations lived in a healthier world.";

break;

case 3:

icon="⚡";

title="Energy Revolution";

message="Clean energy removed pollution and powered the future.";

break;

}

future.innerHTML=`

<h2>

${icon} ${title}

</h2>

<br>

<p>

${message}

</p>

<br>

<h2>

🌍 History Will Remember

Your Vision

</h2>

<br>

<h2>

Future Impact

★★★★★

</h2>

`;

status.innerHTML="The world celebrates your leadership.";

navigator.vibrate?.([120,80,120,80,120]);

setTimeout(()=>{

window.location.href="Enter20.html";

},5000);

}