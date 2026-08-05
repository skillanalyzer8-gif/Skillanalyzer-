const startBtn=document.getElementById("startChallenge");

const designArea=document.querySelector(".designArea");

const status=document.getElementById("statusText");


startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Calculating final UX mastery...";

navigator.vibrate?.([100,80,100,80,150]);

setTimeout(showCertificate,2000);

});


/*=========================
FINAL CERTIFICATE
=========================*/

function showCertificate(){

designArea.innerHTML=`

<h2>

🏆 UX MASTER CERTIFICATE

</h2>

<br>

<p>

🎉 Congratulations!

</p>

<br>

<p>

You successfully completed

<b>ALL 20 UI/UX MISSIONS</b>

inside Skill Analyzer.

</p>

<br>

<div class="finalCard">

<h3>

⭐ Overall UX Score

</h3>

<p>

100 / 100

</p>

</div>

<div class="finalCard">

<h3>

🥇 Achievement

</h3>

<p>

Certified UI/UX Explorer

</p>

</div>

<div class="finalCard">

<h3>

🚀 Skills Unlocked

</h3>

<p>

✔ Color Theory<br>

✔ Typography<br>

✔ Accessibility<br>

✔ Responsive Design<br>

✔ Navigation<br>

✔ User Feedback<br>

✔ Microinteractions<br>

✔ Personalization

</p>

</div>

`;

status.innerHTML="🎉 Journey Successfully Completed!";

navigator.vibrate?.([200,100,200,100,300]);

createConfetti();

}


/*=========================
CONFETTI
=========================*/

function createConfetti(){

for(let i=0;i<80;i++){

let confetti=document.createElement("div");

confetti.style.position="fixed";

confetti.style.width="8px";

confetti.style.height="8px";

confetti.style.background=
`hsl(${Math.random()*360},90%,60%)`;

confetti.style.left=Math.random()*100+"vw";

confetti.style.top="-20px";

confetti.style.borderRadius="50%";

confetti.style.pointerEvents="none";

confetti.style.transition="4s linear";

document.body.appendChild(confetti);

setTimeout(()=>{

confetti.style.transform=
`translateY(${window.innerHeight+100}px)
rotate(${Math.random()*720}deg)`;

confetti.style.opacity="0";

},100);

setTimeout(()=>{

confetti.remove();

},4500);

}

}