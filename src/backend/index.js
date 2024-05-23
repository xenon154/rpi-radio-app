const { exec } = require("child_process");
const express = require("express");
const path = require("path");
const serveIndex = require("serve-index");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/../web", "index.html"));
});

// serve entire styles folder
app.use(
    "/styles",
    express.static("../web/styles"),
    serveIndex("../web/styles", { icons: true })
);

const PORT = process.env.port || 3142;

app.listen(PORT, () => {
    console.log("rpi-radio-app is listening at localhost:3142");
});
