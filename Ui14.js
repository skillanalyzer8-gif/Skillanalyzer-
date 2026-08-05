const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");


startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Evaluating accessibility...";

navigator.vibrate?.([100,80,100]);

setTimeout(showAccessibility,1800);

});


/*=========================
SHOW CHALLENGE
=========================*/

function showAccessibility(){

designArea.innerHTML=`

<h2>

♿ Choose The Most Accessible Design

</h2>

<p>

Which design is easiest for everyone to use?

</p>

<div class="accessCard">

<h3>Design A</h3>

<p>

❌ Tiny buttons<br>

❌ Low contrast<br>

❌ Difficult navigation

</p>

</div>

<div class="accessCard">

<h3>Design B</h3>

<p>

✅ Large buttons<br>

✅ High contrast<br>

✅ Clear labels

</p>

</div>

<div class="accessCard">

<h3>Design C</h3>

<p>

🎨 Stylish interface<br>

❌ Icons without labels

</p>

</div>

<div class="accessCard">

<h3>Design D</h3>

<p>

⚡ Fancy animations<br>

❌ Poor readability

</p>

</div>

`;

document.querySelectorAll(".accessCard")

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
let usability="";
let inclusion="";
let score="";


if(choice===1){

title="🏆 Excellent Accessibility";

message="Great choice! Accessible designs help everyone, including users with disabilities, navigate comfortably.";

usability="99%";

inclusion="100%";

score="100 / 100";

}else{

title="⚠ Accessibility Needs Improvement";

message="Accessibility is essential. Large buttons, clear labels and strong contrast create better user experiences.";

usability="75%";

inclusion="73%";

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

♿ Usability : ${usability}

</h3>

<h3>

🌍 Inclusion : ${inclusion}

</h3>

<h3>

⭐ UX Score : ${score}

</h3>

`;

status.innerHTML="Accessibility evaluation completed.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Ui15.html";

},5000);

}