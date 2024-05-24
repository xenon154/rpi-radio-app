const { exec } = require("child_process");
const express = require("express");
const path = require("path");
const serveIndex = require("serve-index");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const multer = require("multer");

const app = express();

const server = createServer(app);
const io = new Server(server);

const upload = multer({ dest: "uploads" });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../web", "index.html"));
});

// serve entire styles folder
app.use(
    "/styles",
    express.static(path.join(__dirname, "../web", "styles")),
    serveIndex(path.join(__dirname, "../web", "styles"), { icons: true })
);

app.post("/api/upload", (req, res) => {
    res.send("File uploaded successfully.");
});

io.on("connection", (socket) => {
    console.log("New connection");
});

const PORT = process.env.port || 3142;

app.listen(PORT, () => {
    console.log("rpi-radio-app is listening at localhost:3142");
});
