const options = document.querySelectorAll(".option");
const fill = document.querySelector(".fill");
const text = document.querySelector(".analysis p");
const nextBtn = document.getElementById("nextBtn");

// Disable Next Button Initially
nextBtn.disabled = true;
nextBtn.style.opacity = "0.5";

options.forEach(option=>{

option.addEventListener("click",function(){

// Remove previous selection
options.forEach(opt=>opt.classList.remove("active"));

// Highlight current selection
this.classList.add("active");

// Reset Progress
fill.style.width="0%";
text.innerHTML="🤖 AI is reviewing your code review...";

nextBtn.disabled=true;
nextBtn.style.opacity="0.5";

// Progress Animation
setTimeout(()=>{

fill.style.width="100%";

},100);

// AI Decision
setTimeout(()=>{

let answer=this.querySelector("h4").innerText;

let message="";

if(answer==="Weak Password Security"){

message=
"✅ Excellent Review!<br><br>"+
"Secure Coding +20<br>"+
"Code Review +18<br>"+
"Developer DNA Updated";

}

else if(answer==="Poor Formatting"){

message=
"👍 Formatting matters, but security comes first.<br><br>"+
"Code Quality +10";

}

else if(answer==="Rename Variables"){

message=
"⚠ Helpful suggestion.<br><br>"+
"Readability +8";

}

else{

message=
"❌ Pull Request Rejected!<br><br>"+
"Hardcoded passwords are a critical security risk.";

}

text.innerHTML=message;

nextBtn.disabled=false;
nextBtn.style.opacity="1";

},1800);

});

});

// Continue to Mission 10

nextBtn.addEventListener("click",function(){

window.location.href="Mission10.html";

});