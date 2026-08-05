const startBtn=document.getElementById("startDesign");

const designArea=document.querySelector(".designArea");

const status=document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Loading client requirements...";

navigator.vibrate?.([100,80,100]);

setTimeout(showDesigns,1800);

});

/*=========================
DESIGN CHALLENGE
=========================*/

function showDesigns(){

designArea.innerHTML=`

<h2>

📱 Choose The Best Login Design

</h2>

<div class="designCard">

<h3>Design A</h3>

<p>

🎨 Beautiful colors<br>

❌ Small buttons<br>

❌ Tiny text

</p>

</div>

<div class="designCard">

<h3>Design B</h3>

<p>

✅ Large button<br>

✅ Clear spacing<br>

✅ Easy to read

</p>

</div>

<div class="designCard">

<h3>Design C</h3>

<p>

🎨 Amazing animation<br>

❌ Confusing layout

</p>

</div>

<div class="designCard">

<h3>Design D</h3>

<p>

⚡ Very simple<br>

❌ No contrast<br>

❌ Hard to notice button

</p>

</div>

`;

document.querySelectorAll(".designCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewDesign(index);

});

});

}

/*=========================
RESULT
=========================*/

function reviewDesign(choice){

let title="";
let message="";
let score="";

if(choice===1){

title="🏆 Excellent UX";

message="You chose the design that is easiest to use. Great UI is simple, readable and user-friendly.";

score="100 / 100";

}

else{

title="⚠ Good Visuals, Poor UX";

message="A beautiful design is not enough. Users must complete their task quickly and comfortably.";

score="72 / 100";

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

<h2>

User Satisfaction

${score}

</h2>

`;

status.innerHTML="AI completed the design review.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="UI2.html";

},4500);

}