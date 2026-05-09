const express = require("express");
const router = express.Router();
const User = require("../models/user");

router
    .get("/getAllUsers", async (req, res) => {
        try {
            const users = await User.getAllUsers();
            res.send(users);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .post("/login", async (req, res) => {
        try {
            const user = await User.login(req.body);
            res.send({ ...user, password: undefined });
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .post("/register", async (req, res) => {
        try {
            const user = await User.register(req.body);
            res.send({ ...user, password: undefined });
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .put("/:id", async (req, res) => {
        try {
            const updatedRows = await User.updateUser(req.params.id, req.body);

            if (!updatedRows) {
                throw Error("User not found!");
            }

            res.send({ message: "User updated successfully." });
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .delete("/:id", async (req, res) => {
        try {
            const deletedRows = await User.deleteUser(req.params.id);

            if (!deletedRows) {
                throw Error("User not found!");
            }

            res.send({ message: "User deleted successfully." });
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    });

module.exports = router;
