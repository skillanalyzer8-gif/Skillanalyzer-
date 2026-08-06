document.querySelector("form").addEventListener("submit", function (e) {
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

                                                                            alert("Button is working!");
                                                                            });
})
