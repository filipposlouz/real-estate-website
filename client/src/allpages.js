// Selectors
const loginButton = document.querySelector(".loginLogout");
const myListings = document.querySelector(".myListings div button a");
const propertyCode = document.querySelector("#kodikos");
const srchbutton = document.querySelector(".srchbutton");
const toggleButton = document.querySelector(".toggle-button");
const navbarLinks = document.querySelector(".nav_links");
const navbarRight = document.querySelector(".navRight");

// Event Listeners
toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
  if (localStorage.getItem("id")) {
    loginButton.innerText = "Έξοδος";
    const role = await fetch("http://localhost:3000/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ hash: localStorage.getItem("id") }),
    }).then((res) => res.json());
    if (role.message === "Unauthorized." && role.role === undefined) {
      localStorage.clear();
      window.location.href = "login.html";
      return;
    }
    if (role.role === "Admin") {
      myListings.innerText = "Εκκρεμή Αιτήματα";
    }
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
  console.log("here");
  if (myListings.innerText === "Εκκρεμή Αιτήματα") {
    window.location.href = "adminPending.html";
  } else if (localStorage.getItem("id")) {
    window.location.href = "myListings.html";
  } else {
    window.location.href = "login.html";
  }
});

srchbutton.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location.href = "property.html" + `?propertyId=${propertyCode.value}`;
});