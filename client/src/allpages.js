// Selectors
const loginButton = document.querySelector(".loginLogout li a");
const myListings = document.querySelector(".myListings div button a");

// Event Listeners
window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  if (localStorage.getItem("id")) {
    loginButton.innerText = "Έξοδος";
  }
});

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (loginButton.innerText === "Έξοδος") {
    localStorage.clear();
    window.location.href = "index.html";
  } else {
    window.location.href = "login.html";
  }
});

myListings.addEventListener("click", (e) => {
  e.preventDefault();
  if (localStorage.getItem("id")) {
    window.location.href = "myListings.html";
  } else {
    window.location.href = "login.html";
  }
});
