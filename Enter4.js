const startBtn=document.getElementById("startTesting");

const lab=document.querySelector(".labArea");

const status=document.getElementById("statusText");

const reviews=[

{

name:"👨‍🎓 Student",

text:"The app is useful, but it is too slow.",

fix:"Improve Speed"

},

{

name:"👩‍🍳 Restaurant",

text:"I don't understand how to use it.",

fix:"Better Design"

},

{

name:"👩‍💼 Business Owner",

text:"Everything is good, but notifications are missing.",

fix:"Add Notifications"

}

];

let reviewIndex=0;

let solved=0;

/*=========================
START
=========================*/

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Inviting first customer...";

navigator.vibrate?.(120);

setTimeout(showReview,2000);

});

/*=========================
SHOW REVIEW
=========================*/

function showReview(){

const review=reviews[reviewIndex];

lab.innerHTML=`

<div class="reviewCard">

<h3>

${review.name}

</h3>

<p>

"${review.text}"

</p>

<button class="fixBtn">

${review.fix}

</button>

</div>

`;

status.innerHTML="Customer is waiting...";

document.querySelector(".fixBtn")

.addEventListener("click",()=>{

status.innerHTML="Updating prototype...";

navigator.vibrate?.(80);

setTimeout(()=>{

solved++;

reviewIndex++;

if(reviewIndex<reviews.length){

showReview();

}else{

finishMission();

}

},1200);

});

}

/*=========================
MISSION COMPLETE
=========================*/

function finishMission(){

lab.innerHTML=`

<h2>

⭐ PRODUCT IMPROVED

</h2>

<br>

<h1>

4.9 ⭐

</h1>

<p>

Customer Rating

</p>

<br>

<h2>

🎉 327 Happy Users

</h2>

<br>

<p>

Customers love your product!

</p>

`;

status.innerHTML="Excellent Customer Focus";

navigator.vibrate?.([120,80,120]);

setTimeout(()=>{

window.location.href="Enter5.html";

},3500);

}