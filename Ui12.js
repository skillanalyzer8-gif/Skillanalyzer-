const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");


startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Analyzing color palettes...";

navigator.vibrate?.([100,80,100]);

setTimeout(showColors,1800);

});


/*=========================
SHOW CHALLENGE
=========================*/

function showColors(){

designArea.innerHTML=`

<h2>

🎨 Choose The Best Color Palette

</h2>

<p>

Which color palette creates trust for a banking application?

</p>


<div class="colorCard">

<h3>Palette A</h3>

<p>

❌ Bright red & orange<br>

❌ Feels risky<br>

❌ Creates tension

</p>

</div>


<div class="colorCard">

<h3>Palette B</h3>

<p>

✅ Blue & white<br>

✅ Trustworthy<br>

✅ Professional appearance

</p>

</div>


<div class="colorCard">

<h3>Palette C</h3>

<p>

🎨 Neon green & pink<br>

❌ Too distracting

</p>

</div>


<div class="colorCard">

<h3>Palette D</h3>

<p>

⚡ Random colorful theme<br>

❌ No brand consistency

</p>

</div>

`;

document.querySelectorAll(".colorCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewPalette(index);

});

});

}


/*=========================
RESULT
=========================*/

function reviewPalette(choice){

let title="";
let message="";
let trust="";
let branding="";
let score="";


if(choice===1){

title="🏆 Perfect Color Choice";

message="Excellent! Blue is widely associated with trust, security and professionalism, making it ideal for banking applications.";

trust="99%";

branding="98%";

score="100 / 100";


}else{

title="⚠ Color Choice Needs Improvement";

message="Color psychology influences user emotions. Select colors that match the product's purpose.";

trust="74%";

branding="76%";

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

💙 Trust Level : ${trust}

</h3>

<h3>

🎯 Brand Consistency : ${branding}

</h3>

<h3>

⭐ UX Score : ${score}

</h3>

`;


status.innerHTML="Color psychology evaluation completed.";


navigator.vibrate?.([120,80,120]);


setTimeout(()=>{

window.location.href="Ui13.html";

},5000);

}