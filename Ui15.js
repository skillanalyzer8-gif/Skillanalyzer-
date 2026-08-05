const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");


startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Testing layouts on different devices...";

navigator.vibrate?.([100,80,100]);

setTimeout(showResponsiveChallenge,1800);

});


/*=========================
SHOW CHALLENGE
=========================*/

function showResponsiveChallenge(){

designArea.innerHTML=`

<h2>

📱 Choose The Best Responsive Layout

</h2>

<p>

Which layout adapts correctly to all screen sizes?

</p>

<div class="deviceCard">

<h3>Layout A</h3>

<p>

❌ Desktop only<br>

❌ Breaks on mobile<br>

❌ Fixed width

</p>

</div>

<div class="deviceCard">

<h3>Layout B</h3>

<p>

✅ Flexible layout<br>

✅ Mobile friendly<br>

✅ Tablet & desktop support

</p>

</div>

<div class="deviceCard">

<h3>Layout C</h3>

<p>

🎨 Beautiful desktop view<br>

❌ Small text on phones

</p>

</div>

<div class="deviceCard">

<h3>Layout D</h3>

<p>

⚡ Large images everywhere<br>

❌ Slow loading on mobiles

</p>

</div>

`;

document.querySelectorAll(".deviceCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewResponsive(index);

});

});

}


/*=========================
RESULT
=========================*/

function reviewResponsive(choice){

let title="";
let message="";
let adaptability="";
let usability="";
let score="";


if(choice===1){

title="🏆 Excellent Responsive Design";

message="Perfect! Responsive layouts automatically adjust to every device, improving usability and user satisfaction.";

adaptability="99%";

usability="98%";

score="100 / 100";

}else{

title="⚠ Responsive Design Needs Improvement";

message="Modern apps must work on every screen size. Flexible layouts always provide a better experience.";

adaptability="75%";

usability="76%";

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

📱 Adaptability : ${adaptability}

</h3>

<h3>

😊 User Experience : ${usability}

</h3>

<h3>

⭐ UX Score : ${score}

</h3>

`;

status.innerHTML="Responsive design evaluation completed.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Ui16.html";

},5000);

}