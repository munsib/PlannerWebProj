class PlannerItem {
    constructor(text) {
        this.text = text;
    }
}

const plannerForm = document.getElementById("plannerForm");

if (plannerForm) {
    plannerForm.addEventListener("submit", addPlannerItem);
}

function addPlannerItem(event) {
    event.preventDefault();

    const text = document.getElementById("plannerText").value;

    const item = new PlannerItem(text);

    console.log(item);
}
