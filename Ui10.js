const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");


startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Collecting user research data...";

navigator.vibrate?.([100,80,100]);

setTimeout(showResearch,1800);

});


/*=========================
SHOW RESEARCH CHALLENGE
=========================*/

function showResearch(){

designArea.innerHTML=`

<h2>

🏥 Identify User Need

</h2>


<p>

Which user problem should be prioritized?

</p>


<div class="researchCard">

<h3>Research A</h3>

<p>

❌ Add more animations<br>

❌ Make the app flashy<br>

❌ Focus only on appearance

</p>

</div>


<div class="researchCard">

<h3>Research B</h3>

<p>

✅ Understand patient problems<br>

✅ Interview users<br>

✅ Improve healthcare experience

</p>

</div>


<div class="researchCard">

<h3>Research C</h3>

<p>

🎨 Copy competitor designs<br>

❌ Ignore real users

</p>

</div>


<div class="researchCard">

<h3>Research D</h3>

<p>

⚡ Add many features<br>

❌ Without knowing user needs

</p>

</div>


`;


document.querySelectorAll(".researchCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewResearch(index);

});

});

}


/*=========================
RESULT
=========================*/

function reviewResearch(choice){

let title="";
let message="";
let accuracy="";
let satisfaction="";
let score="";


if(choice===1){

title="🏆 Excellent Research Approach";

message="Perfect! Great UX starts by understanding real users, their problems and expectations.";

accuracy="99%";

satisfaction="98%";

score="100 / 100";


}else{

title="⚠ Weak Research Method";

message="Design decisions should be based on user research, not assumptions.";

accuracy="72%";

satisfaction="75%";

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

📊 Research Accuracy : ${accuracy}

</h3>


<h3>

😊 User Satisfaction : ${satisfaction}

</h3>


<h3>

⭐ UX Research Score : ${score}

</h3>

`;


status.innerHTML="User research evaluation completed.";


navigator.vibrate?.([120,80,120]);


setTimeout(()=>{

window.location.href="Ui11.html";

},5000);


}