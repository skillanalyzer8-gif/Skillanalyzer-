const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");


startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Analyzing microinteractions...";

navigator.vibrate?.([100,80,100]);

setTimeout(showMicroChallenge,1800);

});


/*=========================
SHOW CHALLENGE
=========================*/

function showMicroChallenge(){

designArea.innerHTML=`

<h2>

✨ Choose The Best Microinteraction

</h2>

<p>

Which interaction makes users feel the app is responsive?

</p>

<div class="microCard">

<h3>Interaction A</h3>

<p>

❌ No animation<br>

❌ No feedback<br>

❌ Feels unresponsive

</p>

</div>

<div class="microCard">

<h3>Interaction B</h3>

<p>

✅ Button animation<br>

✅ Loading indicator<br>

✅ Success confirmation

</p>

</div>

<div class="microCard">

<h3>Interaction C</h3>

<p>

🎨 Long animation<br>

❌ Slows the experience

</p>

</div>

<div class="microCard">

<h3>Interaction D</h3>

<p>

⚡ Random effects<br>

❌ Distracting for users

</p>

</div>

`;

document.querySelectorAll(".microCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewMicro(index);

});

});

}


/*=========================
RESULT
=========================*/

function reviewMicro(choice){

let title="";
let message="";
let engagement="";
let responsiveness="";
let score="";


if(choice===1){

title="🏆 Excellent Microinteraction";

message="Perfect! Small animations and instant feedback make interfaces feel smooth, modern and enjoyable.";

engagement="99%";

responsiveness="98%";

score="100 / 100";

}else{

title="⚠ Microinteraction Needs Improvement";

message="Microinteractions should be quick, meaningful and never distract the user.";

engagement="75%";

responsiveness="76%";

score="77 / 100";

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

✨ Engagement : ${engagement}

</h3>

<h3>

⚡ Responsiveness : ${responsiveness}

</h3>

<h3>

⭐ UX Score : ${score}

</h3>

`;

status.innerHTML="Microinteraction evaluation completed.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Ui19.html";

},5000);

}