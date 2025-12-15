// =========================
// REGISTER
// =========================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const user = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      dob: document.getElementById("dob").value,
      username: document.getElementById("username").value,
      password: document.getElementById("pass").value
    };

    const res = await fetch("/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    const data = await res.json();

    // Save user_id so they stay logged in
    localStorage.setItem("user_id", data.user_id);

    // Redirect to second entity page
    window.location.href = "post.html";
  });
}


// =========================
// LOGIN
// =========================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const loginUser = {
      username: document.getElementById("username").value,
      password: document.getElementById("pass").value
    };

    const res = await fetch("/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser)
    });

    const data = await res.json();

    if (data.error) {
      alert("Invalid username or password");
      return;
    }

    // Save user_id so they stay logged in
    localStorage.setItem("user_id", data.user_id);

    // Redirect to second entity page
    window.location.href = "post.html";
  });
}
