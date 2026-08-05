const startBtn = document.getElementById("startChallenge");

const designArea = document.querySelector(".designArea");

const status = document.getElementById("statusText");


startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="Generating wireframe scenarios...";

navigator.vibrate?.([100,80,100]);

setTimeout(showWireframes,1800);

});


/*=========================
SHOW CHALLENGE
=========================*/

function showWireframes(){

designArea.innerHTML=`

<h2>

🏦 Choose The Best Wireframe

</h2>


<p>

Which structure gives users the smoothest journey?

</p>


<div class="wireCard">

<h3>Wireframe A</h3>

<p>

❌ No clear sections<br>

❌ Random placement<br>

❌ Confusing flow

</p>

</div>



<div class="wireCard">

<h3>Wireframe B</h3>

<p>

✅ Clear dashboard<br>

✅ Important actions visible<br>

✅ Simple user flow

</p>

</div>



<div class="wireCard">

<h3>Wireframe C</h3>

<p>

🎨 Attractive layout<br>

❌ Poor content structure

</p>

</div>



<div class="wireCard">

<h3>Wireframe D</h3>

<p>

⚡ Many features<br>

❌ Difficult navigation

</p>

</div>


`;


document.querySelectorAll(".wireCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

reviewWireframe(index);

});

});

}


/*=========================
RESULT
=========================*/

function reviewWireframe(choice){

let title="";
let message="";
let flow="";
let clarity="";
let score="";


if(choice===1){

title="🏆 Excellent Wireframe";

message="Perfect! A good wireframe focuses on user flow, clear structure and easy access to important features.";

flow="99%";

clarity="98%";

score="100 / 100";


}else{

title="⚠ Wireframe Needs Improvement";

message="Wireframes should solve user problems before adding visual details.";

flow="73%";

clarity="76%";

score="75 / 100";

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

🔄 User Flow : ${flow}

</h3>


<h3>

📐 Structure Clarity : ${clarity}

</h3>


<h3>

⭐ UX Score : ${score}

</h3>

`;


status.innerHTML="Wireframe evaluation completed.";


navigator.vibrate?.([120,80,120]);


setTimeout(()=>{

window.location.href="Ui12.html";

},5000);


}