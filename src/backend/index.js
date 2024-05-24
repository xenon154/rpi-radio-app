const { exec } = require("child_process");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const express = require("express");
const path = require("path");
const fs = require("fs");
const serveIndex = require("serve-index");
const multer = require("multer");

const app = express();

const server = createServer(app);
const io = new Server(server);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            path.parse(file.originalname).name +
                "-" +
                Math.round(Math.random() * 1e6) +
                path.extname(file.originalname)
        );
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

app.use(
    "/scripts",
    express.static(path.join(__dirname, "../web", "scripts")),
    serveIndex(path.join(__dirname, "../web", "scripts"), { icons: true })
);

app.use(
    "/uploads/audio",
    express.static(path.join(__dirname, "../..", "uploads")),
    serveIndex(path.join(__dirname, "../web", "scripts"), { icons: true })
);

app.post("/api/upload", upload.single("song"), (req, res) => {
    res.send("File uploaded.");
});

app.get("/api/uploads", (req, res) => {
    fs.readdir("uploads", (err, files) => {
        if (err) {
            console.error("Error: " + err);
            res.send([]);
            return null;
        }

        res.send(files);
    });
});

io.on("connection", (socket) => {
    console.log("New connection");
});

const PORT = process.env.port || 3142;

app.listen(PORT, () => {
    console.log("rpi-radio-app is listening at localhost:3142");
});
