console.log("LOGIN.JS STARTED");

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async function () {

    console.log("BUTTON CLICKED");

    alert("Step 1: Login button works.");

    try {

        console.log("Step 2: Loading firebase.js...");

        const firebaseModule = await import("./firebase.js");

        console.log("Step 3: firebase.js loaded.");
        console.log("Firebase module:", firebaseModule);

        alert("Step 3: Firebase.js loaded successfully.");

        if (!firebaseModule.auth) {

            alert("ERROR: auth was not exported from firebase.js.");

            return;

        }

        alert("Step 4: Firebase Auth object exists.");

    } catch (error) {

        console.error("FIREBASE.JS ERROR:", error);

        alert(
            "Firebase.js could not load.\n\n" +
            "Error:\n" +
            error.message
        );

    }

});