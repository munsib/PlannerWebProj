class User {
    constructor(firstName, lastName, username, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

class LoginUser {
    constructor(identifier, password) {
        this.identifier = identifier;
        this.password = password;
    }
}

const form = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");
const loginMessage = document.getElementById("loginMessage");

if (form) {
    form.addEventListener("submit", registerUser);
}

async function registerUser(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const newUser = new User(firstName, lastName, username, email, password);

    try {
        const response = await fetch("/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to register user.");
        }

        localStorage.setItem("loggedInUser", JSON.stringify(data));

        if (registerMessage) {
            registerMessage.textContent = "Registration successful. Redirecting to planner...";
        }

        window.location.href = "PlannerSkele.html";
    } catch (error) {
        if (registerMessage) {
            registerMessage.textContent = error.message;
        }
    }
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
}

async function loginUser(event) {
    event.preventDefault();

    const identifier = document.getElementById("loginIdentifier").value;
    const password = document.getElementById("loginPassword").value;

    const user = new LoginUser(identifier, password);

    try {
        const response = await fetch("/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to log in.");
        }

        localStorage.setItem("loggedInUser", JSON.stringify(data));

        if (loginMessage) {
            loginMessage.textContent = "Login successful. Redirecting to planner...";
        }

        window.location.href = "PlannerSkele.html";
    } catch (error) {
        if (loginMessage) {
            loginMessage.textContent = error.message;
        }
    }
}
