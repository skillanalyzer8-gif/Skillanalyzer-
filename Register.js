import { auth, db } from "./firebase.js";
document.querySelector("form").addEventListener("submit",function(e){

        e.preventDefault();

            alert("Registration Successful!");

                window.location.href="Login.html";

                });
