const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");


startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Evaluating navigation systems...";

navigator.vibrate?.([100,80,100]);

setTimeout(showNavigationChallenge,1800);

});


/*=========================
SHOW CHALLENGE
=========================*/

function showNavigationChallenge(){

designArea.innerHTML=`

<h2>

🧭 Choose The Best Navigation

</h2>

<p>

Which navigation system helps users reach features quickly?

</p>

<div class="navCard">

<h3>Navigation A</h3>

<p>

❌ Hidden menu<br>

❌ Confusing labels<br>

❌ Difficult to explore

</p>

</div>

<div class="navCard">

<h3>Navigation B</h3>

<p>

✅ Bottom navigation<br>

✅ Clear icons & labels<br>

✅ Easy access

</p>

</div>

<div class="navCard">

<h3>Navigation C</h3>

<p>

🎨 Stylish animation<br>

❌ Too many menu levels

</p>

</div>

<div class="navCard">

<h3>Navigation D</h3>

<p>

⚡ Random menu placement<br>

❌ Poor consistency

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
let efficiency="";
let score="";


if(choice===1){

title="🏆 Excellent Navigation";

message="Perfect! Clear navigation helps users complete tasks faster with less effort.";

usability="99%";

efficiency="98%";

score="100 / 100";

}else{

title="⚠ Navigation Needs Improvement";

message="Navigation should always be simple, consistent and easy to understand.";

usability="75%";

efficiency="76%";

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

🧭 Navigation Quality : ${usability}

</h3>

<h3>

⚡ User Efficiency : ${efficiency}

</h3>

<h3>

⭐ UX Score : ${score}

</h3>

`;

status.innerHTML="Navigation evaluation completed.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Ui17.html";

},5000);

}