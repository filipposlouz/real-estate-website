// Selectors
const email = document.querySelector(".email");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const repeatPassword = document.querySelector(".repeatPassword");
const submit = document.querySelector(".submitRegister");

// Event Listeners
submit.addEventListener("click", async (e) => {
  e.preventDefault();
  if (email.value && username.value && password.value && repeatPassword.value) {
    if (password.value === repeatPassword.value) {
      const data = {
        email: email.value,
        username: username.value,
        password: password.value,
      };
      console.log("here");
      const res = await fetch("http://localhost:3000/register", {
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
      }
    } else {
      console.log("wrong password");
    }
  } else {
    console.log("fill the inputs");
  }
});
