class PlannerItem {
    constructor(title, description, itemType, dueDate, userId) {
        this.title = title;
        this.description = description;
        this.itemType = itemType;
        this.dueDate = dueDate;
        this.userId = userId;
    }
}

const plannerForm = document.getElementById("plannerForm");
const plannerMessage = document.getElementById("plannerMessage");
const plannerOutput = document.getElementById("plannerOutput");
const plannerWelcome = document.getElementById("plannerWelcome");
const logoutButton = document.getElementById("logoutButton");
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "login.html";
}

if (plannerWelcome && loggedInUser) {
    plannerWelcome.textContent = `Logged in as ${loggedInUser.first_name} ${loggedInUser.last_name}`;
}

if (plannerForm) {
    plannerForm.addEventListener("submit", addPlannerItem);
}

if (logoutButton) {
    logoutButton.addEventListener("click", logoutUser);
}

async function addPlannerItem(event) {
    event.preventDefault();

    const title = document.getElementById("plannerTitle").value;
    const description = document.getElementById("plannerDescription").value;
    const itemType = document.getElementById("plannerType").value;
    const dueDate = document.getElementById("plannerDueDate").value;

    const item = new PlannerItem(
        title,
        description,
        itemType,
        dueDate,
        loggedInUser.user_id
    );

    try {
        const response = await fetch("/plannerItem/createPlannerItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to create planner item.");
        }

        if (plannerMessage) {
            plannerMessage.textContent = "Planner item created successfully.";
        }

        if (plannerOutput) {
            plannerOutput.textContent = JSON.stringify(data, null, 2);
        }

        plannerForm.reset();
        document.getElementById("plannerType").value = "study session";
    } catch (error) {
        if (plannerMessage) {
            plannerMessage.textContent = error.message;
        }
    }
}

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
