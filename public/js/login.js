// Initial code from login.js
let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
  slider.classList.add("moveslider");
  formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
  slider.classList.remove("moveslider");
  formSection.classList.remove("form-section-move");
});

// New code for handling login functionality
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  event.preventDefault();
  const response = await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    // Login successful, redirect to index.html
    window.location.href = `/${data.redirectUrl}`;
  } else {
    // Login failed, handle accordingly
    console.error(data.message);
    // Display error message to the user
  }
});


// Handling registration functionality
const registerBtn = document.getElementById("registerBtn");
const registerUsername = document.getElementById("registerUsername");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");

registerBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const response = await fetch("/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: registerUsername.value,
      email: registerEmail.value,
      password: registerPassword.value,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    // Registration successful, redirect to login page and switch to login slider
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
    alert("Registration successful! Please login.");
  } else {
    // Registration failed, handle accordingly
    console.error(data.message); // Display error message to the user
  }
});