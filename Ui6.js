const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Analyzing icon styles...";

navigator.vibrate?.([100,80,100]);

setTimeout(showIcons,1800);

});

/*=========================
SHOW CHALLENGE
=========================*/

function showIcons(){

designArea.innerHTML=`

<h2>

🍔 Choose The Best Icon

</h2>

<p>

Which icon style is easiest to recognize?

</p>

<div class="iconCard">

<h3>Icon A</h3>

<p>

🎨 Highly detailed<br>

❌ Too many small elements<br>

❌ Difficult to recognize

</p>

</div>

<div class="iconCard">

<h3>Icon B</h3>

<p>

✅ Simple shape<br>

✅ Clear meaning<br>

✅ Easy to recognize

</p>

</div>

<div class="iconCard">

<h3>Icon C</h3>

<p>

✨ Decorative style<br>

❌ Confusing design

</p>

</div>

<div class="iconCard">

<h3>Icon D</h3>

<p>

⚪ Outline only<br>

❌ Very thin lines<br>

❌ Poor visibility

</p>

</div>

`;

document.querySelectorAll(".iconCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewIcon(index);

});

});

}

/*=========================
RESULT
=========================*/

function reviewIcon(choice){

let title="";
let message="";
let recognition="";
let usability="";
let score="";

if(choice===1){

title="🏆 Excellent Icon Choice";

message="Perfect! The best icons are simple, memorable and instantly understood by users.";

recognition="99%";

usability="97%";

score="100 / 100";

}else{

title="⚠ Icon Needs Improvement";

message="Complex icons confuse users. Keep icons simple, meaningful and easy to identify.";

recognition="72%";

usability="76%";

score="75 / 100";

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

👀 Recognition : ${recognition}

</h3>

<h3>

📱 Usability : ${usability}

</h3>

<h3>

⭐ Design Score : ${score}

</h3>

`;

status.innerHTML="Icon evaluation completed.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Ui7.html";

},5000);

}