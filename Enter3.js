const startBtn = document.getElementById("startLab");
const machineArea = document.querySelector(".machineArea");
const statusText = document.getElementById("statusText");

let selectedFeatures = [];

/*=========================
START LAB
=========================*/

startBtn.addEventListener("click", () => {

    startBtn.disabled = true;
        startBtn.innerHTML = "INITIALIZING...";

            statusText.innerHTML = "Powering AI Prototype Lab...";

                navigator.vibrate?.(100);

                    setTimeout(() => {

                            statusText.innerHTML = "Loading startup components...";

                                }, 1200);

                                    setTimeout(() => {

                                            openPrototypeLab();

                                                }, 2500);

                                                });

                                                /*=========================
                                                PROTOTYPE LAB
                                                =========================*/

                                                function openPrototypeLab() {

                                                    machineArea.innerHTML = `

                                                        <h2>Select 3 Features</h2>

                                                            <div class="featureGrid">

                                                                    <div class="feature">📱 Mobile App</div>

                                                                            <div class="feature">🤖 AI Assistant</div>

                                                                                    <div class="feature">☁ Cloud</div>

                                                                                            <div class="feature">📦 Delivery</div>

                                                                                                    <div class="feature">💳 Payment</div>

                                                                                                            <div class="feature">📷 Camera</div>

                                                                                                                    <div class="feature">🗺 GPS</div>

                                                                                                                            <div class="feature">🔔 Notifications</div>

                                                                                                                                </div>

                                                                                                                                    <p id="countText">

                                                                                                                                        Selected : 0 / 3

                                                                                                                                            </p>

                                                                                                                                                `;

                                                                                                                                                    statusText.innerHTML = "Choose only the important features.";

                                                                                                                                                        document.querySelectorAll(".feature").forEach(feature => {

                                                                                                                                                                feature.addEventListener("click", () => {

                                                                                                                                                                            if (feature.classList.contains("selected")) return;

                                                                                                                                                                                        if (selectedFeatures.length >= 3) return;

                                                                                                                                                                                                    feature.classList.add("selected");

                                                                                                                                                                                                                selectedFeatures.push(feature.innerText);

                                                                                                                                                                                                                            document.getElementById("countText").innerHTML =
                                                                                                                                                                                                                                            "Selected : " + selectedFeatures.length + " / 3";

                                                                                                                                                                                                                                                        if (selectedFeatures.length === 3) {

                                                                                                                                                                                                                                                                        setTimeout(buildPrototype, 1000);

                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                /*=========================
                                                                                                                                                                                                                                                                                                BUILD PROTOTYPE
                                                                                                                                                                                                                                                                                                =========================*/

                                                                                                                                                                                                                                                                                                function buildPrototype() {

                                                                                                                                                                                                                                                                                                    statusText.innerHTML = "Building Prototype...";

                                                                                                                                                                                                                                                                                                        machineArea.innerHTML = `

                                                                                                                                                                                                                                                                                                            <h2>⚙ AI Prototype Machine</h2>

                                                                                                                                                                                                                                                                                                                <div class="builder">

                                                                                                                                                                                                                                                                                                                        ⚡

                                                                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                                                                <p>

                                                                                                                                                                                                                                                                                                                                    Creating your first product...

                                                                                                                                                                                                                                                                                                                                        </p>

                                                                                                                                                                                                                                                                                                                                            `;

                                                                                                                                                                                                                                                                                                                                                navigator.vibrate?.([100,80,100]);

                                                                                                                                                                                                                                                                                                                                                    setTimeout(budgetCut,3000);

                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                    /*=========================
                                                                                                                                                                                                                                                                                                                                                    BUDGET CUT
                                                                                                                                                                                                                                                                                                                                                    =========================*/

                                                                                                                                                                                                                                                                                                                                                    function budgetCut(){

                                                                                                                                                                                                                                                                                                                                                        statusText.innerHTML="Budget Reduced by 60%!";

                                                                                                                                                                                                                                                                                                                                                            machineArea.innerHTML=`

                                                                                                                                                                                                                                                                                                                                                                <h2>

                                                                                                                                                                                                                                                                                                                                                                    💸 Budget Crisis

                                                                                                                                                                                                                                                                                                                                                                        </h2>

                                                                                                                                                                                                                                                                                                                                                                            <p>

                                                                                                                                                                                                                                                                                                                                                                                Remove ONE feature.

                                                                                                                                                                                                                                                                                                                                                                                    Keep only what is really important.

                                                                                                                                                                                                                                                                                                                                                                                        </p>

                                                                                                                                                                                                                                                                                                                                                                                            <div class="featureGrid">

                                                                                                                                                                                                                                                                                                                                                                                                ${selectedFeatures.map(item=>`

                                                                                                                                                                                                                                                                                                                                                                                                    <div class="removeFeature">

                                                                                                                                                                                                                                                                                                                                                                                                        ${item}

                                                                                                                                                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                                                                                                                                                `).join("")}

                                                                                                                                                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                                                                                                                                                        `;

                                                                                                                                                                                                                                                                                                                                                                                                                            document.querySelectorAll(".removeFeature").forEach(card=>{

                                                                                                                                                                                                                                                                                                                                                                                                                                    card.addEventListener("click",()=>{

                                                                                                                                                                                                                                                                                                                                                                                                                                                finishMission(card.innerText);

                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                                                            /*=========================
                                                                                                                                                                                                                                                                                                                                                                                                                                                            MISSION COMPLETE
                                                                                                                                                                                                                                                                                                                                                                                                                                                            =========================*/

                                                                                                                                                                                                                                                                                                                                                                                                                                                            function finishMission(removed){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                statusText.innerHTML="Prototype Ready";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    machineArea.innerHTML=`

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <h2>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            🚀 Prototype Completed

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </h2>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <br>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Feature Removed

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <h3>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ${removed}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </h3>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <br>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Customers Interested

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <h2>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    👥 127

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </h2>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <br>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Startup Value

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <h2>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ₹50,000

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </h2>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <br>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Level 1 Startup Built!

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        `;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            navigator.vibrate?.([120,80,120]);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                setTimeout(()=>{

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        window.location.href="Enter4.html";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            },3500);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }