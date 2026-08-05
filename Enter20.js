const startBtn=document.getElementById("beginLegacy");

const legacy=document.querySelector(".legacyArea");

const status=document.getElementById("statusText");

startBtn.addEventListener("click",()=>{

startBtn.style.display="none";

status.innerHTML="World Council Connected...";

navigator.vibrate?.([120,80,120]);

setTimeout(showLegacyChoices,2000);

});

/*=========================
FINAL LEGACY
=========================*/

function showLegacyChoices(){

legacy.innerHTML=`

<h2>

🌍 Choose Your Legacy

</h2>

<div class="legacyCard">

<h3>❤️ Build A Better Humanity</h3>

<p>

Use innovation to improve every person's life.

</p>

</div>

<div class="legacyCard">

<h3>🚀 Expand Human Civilization</h3>

<p>

Lead humanity beyond Earth.

</p>

</div>

<div class="legacyCard">

<h3>🌱 Protect The Planet Forever</h3>

<p>

Restore nature for future generations.

</p>

</div>

<div class="legacyCard">

<h3>📚 Share Knowledge With Everyone</h3>

<p>

Make education free for every child.

</p>

</div>

`;

document.querySelectorAll(".legacyCard")

.forEach((card,index)=>{

card.addEventListener("click",()=>{

finalEnding(index);

});

});

}

/*=========================
ENDING
=========================*/

function finalEnding(choice){

const endings=[

{

icon:"❤️",

title:"The People's Entrepreneur",

text:"You proved that true success is measured by the lives you improve."

},

{

icon:"🚀",

title:"The Space Visionary",

text:"Your company helped humanity become a multi-planet civilization."

},

{

icon:"🌱",

title:"The Earth's Guardian",

text:"Future generations inherited a cleaner and healthier planet."

},

{

icon:"📚",

title:"The Teacher Of The World",

text:"Knowledge became available to every child on Earth."

}

];

const end=endings[choice];

legacy.innerHTML=`

<h2>

${end.icon}

${end.title}

</h2>

<br>

<p>

${end.text}

</p>

<br>

<h2>

🏆 CONGRATULATIONS

</h2>

<p>

You completed all 20 Entrepreneurship Missions.

You didn't just build a successful company...

You built a legacy that changed the world.

</p>

<br>

<h2>

⭐ LEGENDARY ENTREPRENEUR ⭐

</h2>

`;

status.innerHTML="Mission Complete";

navigator.vibrate?.([150,80,150,80,250]);

setTimeout(()=>{

alert("🎉 Congratulations! Entrepreneurship Path Completed!");

},5000);

}