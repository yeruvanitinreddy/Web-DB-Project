//To handle registration form
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const user = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      dob: document.getElementById("dob").value,
      username: document.getElementById("username").value,
      password: document.getElementById("pass").value
    };

    console.log("Registered User:", user);
  });
}

// To handle login form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const loginUser = {
      username: document.getElementById("username").value,
      password: document.getElementById("pass").value
    };

    console.log("Login Attempt:", loginUser);
  });
}
