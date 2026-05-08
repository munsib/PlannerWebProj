const express = require("express");
const { getAllPlannerItems } = require("../models/plannerItem");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const plannerItems = await getAllPlannerItems();
        res.status(200).json(plannerItems);
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch planner items.",
            error: error.message
        });
    }
});

module.exports = router;
