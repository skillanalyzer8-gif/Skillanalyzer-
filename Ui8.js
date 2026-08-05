const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Analyzing layouts...";

navigator.vibrate?.([100,80,100]);

setTimeout(showLayouts,1800);

});

/*=========================
SHOW CHALLENGE
=========================*/

function showLayouts(){

designArea.innerHTML=`

<h2>

✈ Choose The Best Layout

</h2>

<p>

Which layout provides the best spacing and visual hierarchy?

</p>

<div class="layoutCard">

<h3>Layout A</h3>

<p>

❌ Crowded elements<br>

❌ No spacing<br>

❌ Difficult to scan

</p>

</div>

<div class="layoutCard">

<h3>Layout B</h3>

<p>

✅ Balanced spacing<br>

✅ Clean alignment<br>

✅ Easy to understand

</p>

</div>

<div class="layoutCard">

<h3>Layout C</h3>

<p>

🎨 Stylish layout<br>

❌ Uneven spacing

</p>

</div>

<div class="layoutCard">

<h3>Layout D</h3>

<p>

⚡ Large empty spaces<br>

❌ Poor content balance

</p>

</div>

`;

document.querySelectorAll(".layoutCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewLayout(index);

});

});

}

/*=========================
RESULT
=========================*/

function reviewLayout(choice){

let title="";
let message="";
let hierarchy="";
let readability="";
let score="";

if(choice===1){

title="🏆 Perfect Layout";

message="Excellent! Proper spacing improves readability, guides attention and creates a premium user experience.";

hierarchy="98%";

readability="99%";

score="100 / 100";

}else{

title="⚠ Layout Needs Improvement";

message="Poor spacing makes users work harder. Good layouts create balance and visual clarity.";

hierarchy="74%";

readability="77%";

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

📐 Visual Hierarchy : ${hierarchy}

</h3>

<h3>

📖 Readability : ${readability}

</h3>

<h3>

⭐ Layout Score : ${score}

</h3>

`;

status.innerHTML="Layout evaluation completed.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Ui9.html";

},5000);

}