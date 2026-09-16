import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ===============================
// LOAD FIREBASE
// ===============================

let auth;

try {

    const firebaseModule =
        await import("./firebase.js");

    auth = firebaseModule.auth;

    console.log("Firebase loaded successfully.");

} catch (error) {

    console.error("Firebase loading error:", error);

    alert(
        "Firebase could not load.\n\n" +
        error.message
    );

}


// ===============================
// PASSWORD TOGGLE
// ===============================

function togglePassword() {

    const password =
        document.getElementById("password");

    if (!password) return;

    if (password.type === "password") {

        password.type = "text";

    } else {

        password.type = "password";

    }

}

window.togglePassword =
    togglePassword;


// ===============================
// LOGIN BUTTON
// ===============================

const loginBtn =
    document.getElementById("loginBtn");


if (!loginBtn) {

    console.error(
        "Login button not found."
    );

} else {

    loginBtn.addEventListener(
        "click",
        async function () {

            console.log(
                "LOGIN BUTTON CLICKED"
            );


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            if (email === "" ||
                password === "") {

                alert(
                    "Please enter Email and Password."
                );

                return;

            }


            if (!auth) {

                alert(
                    "Firebase Authentication is not available."
                );

                return;

            }


            try {

                console.log(
                    "Trying Firebase login..."
                );


                const userCredential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                console.log(
                    "Login successful:",
                    userCredential.user.uid
                );


                alert(
                    "Login Successful!"
                );


                // ===============================
                // GO TO DASHBOARD
                // ===============================

                window.location.href =
                    "Dashboard.html";


            } catch (error) {

                console.error(
                    "Firebase Login Error:",
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

        }
    );

}


// ===============================
// FORGOT PASSWORD
// ===============================

const forgotLink =
    document.querySelector(".forgot");


if (forgotLink) {

    forgotLink.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            alert(
                "Forgot Password page will be added soon."
            );

        }
    );

}