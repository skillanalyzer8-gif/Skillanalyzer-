const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");


startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Analyzing typography styles...";

navigator.vibrate?.([100,80,100]);

setTimeout(showTypography,1800);

});


/*=========================
SHOW CHALLENGE
=========================*/

function showTypography(){

designArea.innerHTML=`

<h2>

🔤 Choose The Best Typography

</h2>

<p>

Which typography style gives users the best reading experience?

</p>

<div class="textCard">

<h3>Typography A</h3>

<p>

❌ Fancy decorative font<br>

❌ Tiny text<br>

❌ Difficult to read

</p>

</div>

<div class="textCard">

<h3>Typography B</h3>

<p>

✅ Clean sans-serif font<br>

✅ Proper spacing<br>

✅ Excellent readability

</p>

</div>

<div class="textCard">

<h3>Typography C</h3>

<p>

🎨 Multiple font styles<br>

❌ Inconsistent appearance

</p>

</div>

<div class="textCard">

<h3>Typography D</h3>

<p>

⚡ Very bold everywhere<br>

❌ Poor visual hierarchy

</p>

</div>

`;

document.querySelectorAll(".textCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewTypography(index);

});

});

}


/*=========================
RESULT
=========================*/

function reviewTypography(choice){

let title="";
let message="";
let readability="";
let accessibility="";
let score="";


if(choice===1){

title="🏆 Excellent Typography";

message="Perfect! Clean fonts, proper spacing and clear hierarchy improve readability and user experience.";

readability="99%";

accessibility="98%";

score="100 / 100";

}else{

title="⚠ Typography Needs Improvement";

message="Typography should make content easier to read, not harder. Simplicity always wins.";

readability="74%";

accessibility="76%";

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

📖 Readability : ${readability}

</h3>

<h3>

♿ Accessibility : ${accessibility}

</h3>

<h3>

⭐ UX Score : ${score}

</h3>

`;

status.innerHTML="Typography evaluation completed.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Ui14.html";

},5000);

}