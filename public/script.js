async function register() {
  const email = emailInput();
  const password = passwordInput();

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById("msg").innerText = data.message;
}

async function login() {
  const email = emailInput();
  const password = passwordInput();

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (data.success) window.location.href = "/portfolio.html";
  else document.getElementById("msg").innerText = "Invalid credentials";
}

function emailInput() {
  return document.getElementById("email").value;
}
function passwordInput() {
  return document.getElementById("password").value;
}
