const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");


startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Analyzing dark mode interfaces...";

navigator.vibrate?.([100,80,100]);

setTimeout(showDarkModes,1800);

});


/*=========================
SHOW CHALLENGE
=========================*/

function showDarkModes(){

designArea.innerHTML=`

<h2>

🌙 Choose The Best Dark Theme

</h2>

<p>

Which interface gives the best dark mode experience?

</p>


<div class="darkCard">

<h3>Theme A</h3>

<p>

❌ Pure black background<br>

❌ Poor contrast<br>

❌ Difficult reading

</p>

</div>


<div class="darkCard">

<h3>Theme B</h3>

<p>

✅ Dark gray background<br>

✅ Clear text contrast<br>

✅ Comfortable for eyes

</p>

</div>


<div class="darkCard">

<h3>Theme C</h3>

<p>

🎨 Bright colors everywhere<br>

❌ Eye distraction

</p>

</div>


<div class="darkCard">

<h3>Theme D</h3>

<p>

⚡ Dark theme with tiny text<br>

❌ Poor readability

</p>

</div>

`;


document.querySelectorAll(".darkCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewDarkMode(index);

});

});

}


/*=========================
RESULT
=========================*/

function reviewDarkMode(choice){

let title="";
let message="";
let comfort="";
let contrast="";
let score="";


if(choice===1){

title="🏆 Perfect Dark Mode";

message="Excellent! Balanced contrast and dark gray backgrounds provide a comfortable user experience.";

comfort="98%";

contrast="99%";

score="100 / 100";


}else{

title="⚠ Dark Mode Needs Improvement";

message="Dark mode is not just changing colors. Proper contrast and readability are essential.";

comfort="73%";

contrast="75%";

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

👁 Eye Comfort : ${comfort}

</h3>


<h3>

🎨 Contrast : ${contrast}

</h3>


<h3>

⭐ UX Score : ${score}

</h3>

`;


status.innerHTML="Dark mode evaluation completed.";


navigator.vibrate?.([120,80,120]);


setTimeout(()=>{

window.location.href="Ui10.html";

},5000);


}