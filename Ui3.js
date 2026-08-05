const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Loading accessibility test...";

navigator.vibrate?.([100,80,100]);

setTimeout(showChallenge,1800);

});

/*=========================
SHOW CHALLENGE
=========================*/

function showChallenge(){

designArea.innerHTML=`

<h2>

👵 Choose The Best Design

</h2>

<p>

Which design is easiest for elderly users?

</p>

<div class="optionCard">

<h3>Design A</h3>

<p>

❌ Small text<br>

❌ Tiny buttons<br>

❌ Low contrast

</p>

</div>

<div class="optionCard">

<h3>Design B</h3>

<p>

✅ Large text<br>

✅ Big buttons<br>

✅ High contrast

</p>

</div>

<div class="optionCard">

<h3>Design C</h3>

<p>

🎨 Beautiful colors<br>

❌ Small icons

</p>

</div>

<div class="optionCard">

<h3>Design D</h3>

<p>

⚡ Modern layout<br>

❌ Difficult navigation

</p>

</div>

`;

document.querySelectorAll(".optionCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewAccessibility(index);

});

});

}

/*=========================
RESULT
=========================*/

function reviewAccessibility(choice){

let title="";
let message="";
let accessibility="";
let usability="";
let satisfaction="";

if(choice===1){

title="🏆 Excellent Accessibility";

message="Great choice! Large text, high contrast and bigger buttons help everyone use the app comfortably.";

accessibility="100 / 100";

usability="98%";

satisfaction="97%";

}else{

title="⚠ Needs Improvement";

message="Good design should be usable by everyone. Accessibility is more important than appearance.";

accessibility="74 / 100";

usability="78%";

satisfaction="75%";

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

♿ Accessibility Score : ${accessibility}

</h3>

<h3>

😊 Usability : ${usability}

</h3>

<h3>

⭐ User Satisfaction : ${satisfaction}

</h3>

`;

status.innerHTML="Accessibility review completed.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Ui4.html";

},5000);

}