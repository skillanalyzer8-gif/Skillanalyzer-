alert("Login.js Loaded!");
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Show / Hide Password
function togglePassword() {
    let password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

window.togglePassword = togglePassword;

// Login
async function login() {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please enter Email and Password.");
        return;
    }

    try {

        await signInWithEmailAndPassword(auth, email, password);

        alert("Login Successful!");

        window.location.href = "Dashboard.html";

    } catch (error) {

        alert(error.message);

    }

}

window.login = login;

// Forgot Password
document.querySelector(".forgot").addEventListener("click", function(e){
    e.preventDefault();
    alert("Forgot Password page will be added soon.");
});

// Sign Up
document.querySelector(".signup a").addEventListener("click", function(){
    window.location.href = "Register.html";
});