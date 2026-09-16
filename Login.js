console.log("LOGIN.JS LOADED");

const loginBtn = document.getElementById("loginBtn");

console.log("LOGIN BUTTON:", loginBtn);

if (!loginBtn) {

    console.error("ERROR: loginBtn was not found.");

} else {

    loginBtn.addEventListener("click", function () {

        console.log("LOGIN BUTTON CLICKED");

        alert("LOGIN BUTTON IS WORKING!");

    });

}