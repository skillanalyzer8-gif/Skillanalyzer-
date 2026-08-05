const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Analyzing button designs...";

navigator.vibrate?.([100,80,100]);

setTimeout(showButtons,1800);

});

/*=========================
SHOW CHALLENGE
=========================*/

function showButtons(){

designArea.innerHTML=`

<h2>

🛒 Choose The Best Button

</h2>

<p>

Which button will users notice and click first?

</p>

<div class="buttonCard">

<h3>Button A</h3>

<p>

❌ Small size<br>

❌ Light gray color<br>

❌ Hard to notice

</p>

</div>

<div class="buttonCard">

<h3>Button B</h3>

<p>

✅ Large size<br>

✅ Bright primary color<br>

✅ Clear "Buy Now" label

</p>

</div>

<div class="buttonCard">

<h3>Button C</h3>

<p>

🎨 Fancy animation<br>

❌ Low contrast

</p>

</div>

<div class="buttonCard">

<h3>Button D</h3>

<p>

⚡ Transparent button<br>

❌ No border<br>

❌ Confusing appearance

</p>

</div>

`;

document.querySelectorAll(".buttonCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewButton(index);

});

});

}

/*=========================
RESULT
=========================*/

function reviewButton(choice){

let title="";
let message="";
let visibility="";
let clickRate="";
let score="";

if(choice===1){

title="🏆 Excellent CTA";

message="Great choice! Primary buttons should be large, high-contrast and easy to recognize immediately.";

visibility="99%";

clickRate="96%";

score="100 / 100";

}else{

title="⚠ Weak Call To Action";

message="Users may miss this button. Important actions should always stand out clearly.";

visibility="71%";

clickRate="68%";

score="74 / 100";

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

👀 Visibility : ${visibility}

</h3>

<h3>

🖱 Click Rate : ${clickRate}

</h3>

<h3>

⭐ UI Score : ${score}

</h3>

`;

status.innerHTML="Button usability review completed.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Ui6.html";

},5000);

}