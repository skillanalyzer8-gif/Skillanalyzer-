import { auth, db } from "./firebase.js";

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.querySelector("form").addEventListener("submit", async function (e) {

    e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value;
                    const confirmPassword = document.getElementById("confirmPassword").value;

                        if (fullName === "" || email === "" || password === "" || confirmPassword === "") {
                                alert("Please fill all fields!");
                                        return;
                                            }

                                                if (password !== confirmPassword) {
                                                        alert("Passwords do not match!");
                                                                return;
                                                                    }

                                                                        try {

                                                                                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                                                                                        const user = userCredential.user;

                                                                                                await setDoc(doc(db, "users", user.uid), {
                                                                                                            fullName: fullName,
                                                                                                                        email: email,
                                                                                                                                    createdAt: new Date().toISOString()
                                                                                                                                            });

                                                                                                                                                    alert("Registration Successful!");

                                                                                                                                                            window.location.href = "Login.html";

                                                                                                                                                                } catch (error) {

                                                                                                                                                                        alert(error.message);

                                                                                                                                                                            }

                                                                                                                                                                            });