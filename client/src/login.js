// Selectors
const username = document.querySelector(".username input");
const password = document.querySelector(".password input");
const loginBtn = document.querySelector(".submitLogin");
const logoutBtn = document.querySelector(".submitLogout");
const registerBtn = document.querySelector(".submitRegister");

// Event Listeners
loginBtn.addEventListener("click", async (e) => {
  const data = { username: username.value, password: password.value };
  console.log(data);
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  if (res.success === true) {
    localStorage.setItem("id", res.id);
    window.location.href = "index.html";
    // console.log(localStorage.getItem("id"));
    // MAKE MODAL TO DISPLAY IF INFO WAS WRONG
  } else {
    console.log(res.message);
  }
});

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "register.html";
});
