const express = require("express");
const { getAllUsers } = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch users.",
            error: error.message
        });
    }
});

module.exports = router;
