const { exec } = require("child_process");
const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/../web", "index.html"));
});

const PORT = process.env.port || 3142;

app.listen(PORT, () => {
    console.log("rpi-radio-app is listening at localhost:3142");
});
