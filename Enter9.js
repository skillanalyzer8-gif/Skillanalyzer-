const startBtn=document.getElementById("startMeeting");

const meeting=document.querySelector(".meetingArea");

const status=document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Client entered the meeting...";

navigator.vibrate?.(120);

setTimeout(showDeal,1800);

});

/*=========================
CLIENT REQUEST
=========================*/

function showDeal(){

meeting.innerHTML=`

<h2>

🧑‍💼 Client Requirements

</h2>

<br>

<p>

Budget : ₹5,00,000

</p>

<p>

Requested Features : 10

</p>

<br>

<p>

How will you respond?

</p>

<br>

<div class="negotiationCard">

✅ Deliver all 10 features for ₹5L

</div>

<div class="negotiationCard">

🤝 Deliver 6 important features now and 4 later

</div>

<div class="negotiationCard">

❌ Reject the project

</div>

`;

document.querySelectorAll(".negotiationCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

evaluate(index);

});

});

}

/*=========================
RESULT
=========================*/

function evaluate(choice){

if(choice===1){

meeting.innerHTML=`

<h2>

🎉 Excellent Negotiation!

</h2>

<br>

<h2>

Client Accepted

</h2>

<br>

<p>

✔ Budget Protected

</p>

<p>

✔ Client Happy

</p>

<p>

✔ Team Workload Balanced

</p>

<br>

<h2>

💰 Profit : ₹2,40,000

</h2>

`;

status.innerHTML="Negotiation Success";

navigator.vibrate?.([120,80,120]);

}

else if(choice===0){

meeting.innerHTML=`

<h2>

⚠ Project Accepted

</h2>

<br>

<p>

The client is happy...

</p>

<p>

But your team is overloaded.

</p>

<p>

Profit becomes very low.

</p>

`;

status.innerHTML="Too Many Promises";

navigator.vibrate?.(180);

}

else{

meeting.innerHTML=`

<h2>

❌ Client Walked Away

</h2>

<br>

<p>

You lost a valuable opportunity.

</p>

<p>

Sometimes negotiation is better than rejection.

</p>

`;

status.innerHTML="Deal Lost";

navigator.vibrate?.(220);

}

setTimeout(()=>{

window.location.href="Enter10.html";

},4000);

}