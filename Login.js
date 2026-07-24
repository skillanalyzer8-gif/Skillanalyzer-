// Show / Hide Password

function togglePassword() {

    let password = document.getElementById("password");

    if (password.type === "password") {

        password.type = "text";

    } else {

        password.type = "password";

    }

}


// Login Button

function login() {

    let email = document.querySelector('input[type="email"]').value;

    let password = document.getElementById("password").value;


    if (email === "" || password === "") {

        alert("Please enter Email and Password.");

        return;

    }


    // Dummy Login

    alert("Login Successful!");

    window.location.href = "dashboard.html";

}


// Forgot Password

document.querySelector(".forgot").addEventListener("click", function(e){

    e.preventDefault();

    alert("Forgot Password page will be added soon.");

});


// Sign Up

document.querySelector(".signup a").addEventListener("click", function(){

    window.location.href="register.html";

});