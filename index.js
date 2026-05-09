require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

const userRoutes = require("./server/routes/user");
const plannerItemRoutes = require("./server/routes/plannerItem");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/login.html")));

app.use("/user", userRoutes);
app.use("/plannerItem", plannerItemRoutes);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!!`));
