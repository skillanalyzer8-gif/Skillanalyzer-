import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

function togglePassword() {
    let password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

window.togglePassword = togglePassword;

document.getElementById("loginBtn").addEventListener("click", async function () {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

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

});

document.querySelector(".forgot").addEventListener("click", function(e){
    e.preventDefault();
    alert("Forgot Password page will be added soon.");
});