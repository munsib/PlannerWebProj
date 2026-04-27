class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

class LoginUser {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

const form = document.getElementById("registerForm");

if (form) {
    form.addEventListener("submit", registerUser);
}

function registerUser(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const newUser = new User(firstName, lastName, email, password);

    console.log(newUser);
}
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
}

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const user = new LoginUser(email, password);

    console.log(user);
}
