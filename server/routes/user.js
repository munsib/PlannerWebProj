const express = require("express");
const {
    createUser,
    loginUser,
    updateUser,
    deleteUser
} = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Unable to register user.",
            error: error.message
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await loginUser(req.body);

        if (!user) {
            return res.status(401).json({
                message: "Invalid username/email or password."
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: "Unable to log in user.",
            error: error.message
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedRows = await updateUser(req.params.id, req.body);

        if (updatedRows === 0) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        return res.status(200).json({
            message: "User updated successfully."
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to update user.",
            error: error.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedRows = await deleteUser(req.params.id);

        if (deletedRows === 0) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        return res.status(200).json({
            message: "User deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to delete user.",
            error: error.message
        });
    }
});

module.exports = router;
