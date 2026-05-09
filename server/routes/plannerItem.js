const express = require("express");
const router = express.Router();
const PlannerItem = require("../models/plannerItem");

router
    .get("/getAllPlannerItems", async (req, res) => {
        try {
            const plannerItems = await PlannerItem.getAllPlannerItems();
            res.send(plannerItems);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .post("/createPlannerItem", async (req, res) => {
        try {
            const plannerItem = await PlannerItem.createPlannerItem(req.body);
            res.send(plannerItem);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .get("/:id", async (req, res) => {
        try {
            const plannerItem = await PlannerItem.getPlannerItemById(req.params.id);

            if (!plannerItem) {
                throw Error("Planner item not found!");
            }

            res.send(plannerItem);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .put("/:id", async (req, res) => {
        try {
            const updatedRows = await PlannerItem.updatePlannerItem(req.params.id, req.body);

            if (!updatedRows) {
                throw Error("Planner item not found!");
            }

            res.send({ message: "Planner item updated successfully." });
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .delete("/:id", async (req, res) => {
        try {
            const deletedRows = await PlannerItem.deletePlannerItem(req.params.id);

            if (!deletedRows) {
                throw Error("Planner item not found!");
            }

            res.send({ message: "Planner item deleted successfully." });
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    });

module.exports = router;
