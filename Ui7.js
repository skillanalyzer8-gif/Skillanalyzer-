const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Loading navigation layouts...";

navigator.vibrate?.([100,80,100]);

setTimeout(showNavigation,1800);

});

/*=========================
SHOW CHALLENGE
=========================*/

function showNavigation(){

designArea.innerHTML=`

<h2>

🛍 Choose The Best Navigation

</h2>

<p>

Which navigation style gives users the easiest experience?

</p>

<div class="navCard">

<h3>Navigation A</h3>

<p>

❌ 9 menu items<br>

❌ Hidden options<br>

❌ Confusing layout

</p>

</div>

<div class="navCard">

<h3>Navigation B</h3>

<p>

✅ Bottom navigation<br>

✅ 5 clear icons<br>

✅ Easy access

</p>

</div>

<div class="navCard">

<h3>Navigation C</h3>

<p>

🎨 Beautiful design<br>

❌ Too many animations

</p>

</div>

<div class="navCard">

<h3>Navigation D</h3>

<p>

⚡ Sidebar only<br>

❌ Important options hidden

</p>

</div>

`;

document.querySelectorAll(".navCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewNavigation(index);

});

});

}

/*=========================
RESULT
=========================*/

function reviewNavigation(choice){

let title="";
let message="";
let usability="";
let speed="";
let score="";

if(choice===1){

title="🏆 Excellent Navigation";

message="Perfect! Simple bottom navigation helps users find features quickly and improves the overall experience.";

usability="99%";

speed="97%";

score="100 / 100";

}else{

title="⚠ Navigation Needs Improvement";

message="Complex navigation increases user frustration. Keep important features visible and easy to access.";

usability="74%";

speed="72%";

score="76 / 100";

}

designArea.innerHTML=`

<h2>

${title}

</h2>

<br>

<p>

${message}

</p>

<br>

<h3>

📱 Usability : ${usability}

</h3>

<h3>

⚡ Navigation Speed : ${speed}

</h3>

<h3>

⭐ UX Score : ${score}

</h3>

`;

status.innerHTML="Navigation analysis completed.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Ui8.html";

},5000);

}