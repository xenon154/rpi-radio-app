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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() );
    }
});
const upload = multer({ storage });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../web", "index.html"));
});

// serve entire styles folder
app.use(
    "/styles",
    express.static(path.join(__dirname, "../web", "styles")),
    serveIndex(path.join(__dirname, "../web", "styles"), { icons: true })
);

app.post("/api/upload", upload.single("song"), (req, res) => {
    res.send("File uploaded.");
});

io.on("connection", (socket) => {
    console.log("New connection");
});

const PORT = process.env.port || 3142;

app.listen(PORT, () => {
    console.log("rpi-radio-app is listening at localhost:3142");
});
