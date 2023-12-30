// login.js

document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is already authenticated
    if (localStorage.getItem("authenticated")) {
        // Redirect to the main page or perform other actions for authenticated users
        window.location.href = "main.html";
    }

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission
        login();
    });

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission
        register();
    });
});

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check credentials (replace this with server-side authentication)
    if (username === "lia@gmail.com" && password === "lia23#") {
        // Authentication successful
        localStorage.setItem("authenticated", true);
        window.location.href = "main.html";
    } else {
        // Authentication failed
        alert("Invalid credentials. Please try again.");
    }
}

function register() {
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    // Implement your registration logic here
    // For simplicity, I'll just show an alert
    alert(`User ${newUsername} registered successfully!`);
}
