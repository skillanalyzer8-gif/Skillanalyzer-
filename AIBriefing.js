const status=document.getElementById("status");

setTimeout(()=>{
status.innerHTML="Connecting to Assessment Server...";
},1000);

setTimeout(()=>{
status.innerHTML="Loading Developer Missions...";
},2500);

setTimeout(()=>{
status.innerHTML="Preparing AI Decision Engine...";
},4000);

setTimeout(()=>{
window.location.href="Mission1.html";
},6000);