const express = require("express");
const path = require("path");
require("dotenv").config();

const userRoutes = require("./server/routes/user");
const plannerItemRoutes = require("./server/routes/plannerItem");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", userRoutes);
app.use("/api/planner-items", plannerItemRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
