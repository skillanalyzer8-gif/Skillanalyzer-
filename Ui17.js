const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");


startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Evaluating feedback systems...";

navigator.vibrate?.([100,80,100]);

setTimeout(showFeedbackChallenge,1800);

});


/*=========================
SHOW CHALLENGE
=========================*/

function showFeedbackChallenge(){

designArea.innerHTML=`

<h2>

💬 Choose The Best Feedback System

</h2>

<p>

Which feedback keeps users informed after every action?

</p>

<div class="feedbackCard">

<h3>Feedback A</h3>

<p>

❌ No loading indicator<br>

❌ No confirmation<br>

❌ Users feel confused

</p>

</div>

<div class="feedbackCard">

<h3>Feedback B</h3>

<p>

✅ Loading animation<br>

✅ Success message<br>

✅ Helpful error alerts

</p>

</div>

<div class="feedbackCard">

<h3>Feedback C</h3>

<p>

🎨 Fancy animations<br>

❌ No useful information

</p>

</div>

<div class="feedbackCard">

<h3>Feedback D</h3>

<p>

⚡ Popup for every click<br>

❌ Too distracting

</p>

</div>

`;

document.querySelectorAll(".feedbackCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewFeedback(index);

});

});

}


/*=========================
RESULT
=========================*/

function reviewFeedback(choice){

let title="";
let message="";
let clarity="";
let confidence="";
let score="";


if(choice===1){

title="🏆 Excellent User Feedback";

message="Perfect! Immediate feedback reassures users that their actions were successful and keeps them informed.";

clarity="99%";

confidence="98%";

score="100 / 100";

}else{

title="⚠ Feedback Needs Improvement";

message="Users should always receive clear feedback after important actions to avoid confusion.";

clarity="75%";

confidence="76%";

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

💬 Feedback Clarity : ${clarity}

</h3>

<h3>

😊 User Confidence : ${confidence}

</h3>

<h3>

⭐ UX Score : ${score}

</h3>

`;

status.innerHTML="Feedback evaluation completed.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Ui18.html";

},5000);

}