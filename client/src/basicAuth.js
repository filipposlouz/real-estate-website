class Auth {
  constructor() {
    this.authenticated = false;
    this.route = { route: "/" };
    this.alreadyRun = false;
  }

  async login(data) {
    console.log("login called");
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    if (res.success === true) {
      this.authenticated = true;
      console.log(this.authenticated);
      return this.authenticated;
    } else {
      console.log(res.message);
    }
  }

  logout() {
    console.log("logout");
    this.authenticated = false;
  }

  setRoute(route) {
    this.route = { ...route };
  }

  getRoute() {
    return this.route;
  }

  setRun() {
    this.alreadyRun = true;
  }

  getRun() {
    return this.alreadyRun;
  }

  isAuthenticated() {
    console.log("called");
    return this.authenticated;
  }
}

// console.log(Auth.getRun() ? "hi" : "no");
const userState = new Auth();

// function auth() {
//   return authentication;
// }
