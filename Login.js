import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ===============================
// PASSWORD TOGGLE
// ===============================

function togglePassword() {

    const password =
        document.getElementById("password");

    if (password.type === "password") {

        password.type = "text";

    } else {

        password.type = "password";

    }

}

window.togglePassword = togglePassword;


// ===============================
// LOGIN BUTTON
// ===============================

const loginBtn =
    document.getElementById("loginBtn");


loginBtn.addEventListener("click", async function () {

    console.log("LOGIN BUTTON CLICKED");

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    if (email === "" || password === "") {

        alert("Please enter Email and Password.");

        return;

    }


    try {

        console.log("Firebase Auth object:", auth);

        console.log("Starting Firebase login...");


        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        console.log(
            "LOGIN SUCCESSFUL:",
            userCredential.user.uid
        );


        alert("Login Successful!");


        // ===============================
        // GO TO DASHBOARD
        // ===============================

        window.location.href =
            "Dashboard.html";


    } catch (error) {

        console.error(
            "FIREBASE LOGIN ERROR:",
            error
        );


        alert(
            "Login failed.\n\n" +
            "Error code: " +
            error.code +
            "\n\n" +
            error.message
        );

    }

});


// ===============================
// FORGOT PASSWORD
// ===============================

const forgotLink =
    document.querySelector(".forgot");


if (forgotLink) {

    forgotLink.addEventListener("click", function (e) {

        e.preventDefault();

        alert(
            "Forgot Password page will be added soon."
        );

    });

}