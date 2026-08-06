import { auth, db } from "./firebase.js";

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 👇 Replace the old event listener with this
document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value;
                    const confirmPassword = document.getElementById("confirmPassword").value;

                        if (password !== confirmPassword) {
                                alert("Passwords do not match!");
                                        return;
                                            }

                                                alert("Form data received successfully!");
                                                });
