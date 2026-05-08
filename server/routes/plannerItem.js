const express = require("express");
const {
    createPlannerItem,
    getPlannerItemById,
    updatePlannerItem,
    deletePlannerItem
} = require("../models/plannerItem");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const plannerItem = await createPlannerItem(req.body);
        res.status(201).json(plannerItem);
    } catch (error) {
        res.status(500).json({
            message: "Unable to create planner item.",
            error: error.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const plannerItem = await getPlannerItemById(req.params.id);

        if (!plannerItem) {
            return res.status(404).json({
                message: "Planner item not found."
            });
        }

        return res.status(200).json(plannerItem);
    } catch (error) {
        return res.status(500).json({
            message: "Unable to fetch planner item.",
            error: error.message
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedRows = await updatePlannerItem(req.params.id, req.body);

        if (updatedRows === 0) {
            return res.status(404).json({
                message: "Planner item not found."
            });
        }

        return res.status(200).json({
            message: "Planner item updated successfully."
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to update planner item.",
            error: error.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedRows = await deletePlannerItem(req.params.id);

        if (deletedRows === 0) {
            return res.status(404).json({
                message: "Planner item not found."
            });
        }

        return res.status(200).json({
            message: "Planner item deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to delete planner item.",
            error: error.message
        });
    }
});

module.exports = router;
