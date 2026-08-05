const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");


startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Analyzing personalized experiences...";

navigator.vibrate?.([100,80,100]);

setTimeout(showPersonalChallenge,1800);

});


/*=========================
SHOW CHALLENGE
=========================*/

function showPersonalChallenge(){

designArea.innerHTML=`

<h2>

🧠 Choose The Best Personalization

</h2>

<p>

Which experience feels most tailored to the user?

</p>

<div class="personalCard">

<h3>Experience A</h3>

<p>

❌ Same content for everyone<br>

❌ No recommendations<br>

❌ Generic interface

</p>

</div>

<div class="personalCard">

<h3>Experience B</h3>

<p>

✅ Personalized playlists<br>

✅ Smart recommendations<br>

✅ Customized home screen

</p>

</div>

<div class="personalCard">

<h3>Experience C</h3>

<p>

🎨 Beautiful design<br>

❌ No user preferences saved

</p>

</div>

<div class="personalCard">

<h3>Experience D</h3>

<p>

⚡ Random suggestions<br>

❌ Irrelevant content

</p>

</div>

`;

document.querySelectorAll(".personalCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewPersonal(index);

});

});

}


/*=========================
RESULT
=========================*/

function reviewPersonal(choice){

let title="";
let message="";
let relevance="";
let satisfaction="";
let score="";


if(choice===1){

title="🏆 Excellent Personalization";

message="Perfect! Personalized content increases engagement and makes users feel valued.";

relevance="99%";

satisfaction="98%";

score="100 / 100";

}else{

title="⚠ Personalization Needs Improvement";

message="Apps become more enjoyable when they remember user preferences and provide relevant recommendations.";

relevance="75%";

satisfaction="76%";

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

🎯 Content Relevance : ${relevance}

</h3>

<h3>

😊 User Satisfaction : ${satisfaction}

</h3>

<h3>

⭐ UX Score : ${score}

</h3>

`;

status.innerHTML="Personalization evaluation completed.";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Ui20.html";

},5000);

}