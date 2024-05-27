const { spawn, exec } = require("node:child_process");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const express = require("express");
const path = require("path");
const fs = require("fs");
const serveIndex = require("serve-index");
const multer = require("multer");
const Mp3ToWav = require("mp3-to-wav");

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
            path.parse(file.originalname).name.split(" ").join("-") +
                "-" +
                Math.round(Math.random() * 1e6) +
                path.extname(file.originalname)
        );
    }
});
const upload = multer({ storage });

let songQueue = [];
let currSong = 0;

let songCmd;

async function playSong(fn) {
    let wav_converted;

    console.log(path.resolve("uploads/" + path.parse(fn).name + ".wav"));

    if (
        !fs.existsSync(path.resolve("uploads/" + path.parse(fn).name + ".wav"))
    ) {
        if (path.extname(fn) !== ".wav") {
            wav_converted = await new Mp3ToWav(
                path.resolve("uploads/" + fn),
                path.resolve("uploads/")
            ).exec();
        }
    }

    songCmd = exec(
        `sudo bash $HOME/fm_transmitter/src/pi_fm_rds -freq 103.1 -audio ${path.resolve(
            "uploads/" + path.parse(fn).name + ".wav"
        )}`,
        (err, stdout, stderr) => {
            if (err) {
                console.log("Error broadcasting song.")
                return;
            }

            console.log(`Output of song broadcast: ${stdout}`);
            console.log(`Error while broadcasting song: ${stderr}`);
        },
        { detached: true }
    );

    console.log("Playing new song: " + path.parse(fn).name);
}

function stopSong() {
    if (songCmd) {
        process.kill(-songCmd.pid);
    }
}

io.on("connection", async (socket) => {
    socket.on("playSong", async (fn) => {
        await playSong(fn);
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../web", "index.html"));
});

// serve entire folders
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
    res.sendFile(path.join(__dirname, "../web", "redirect.html"));
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

const PORT = process.env.port || 3142;

server.listen(PORT, () => {
    console.log("rpi-radio-app is listening at localhost:3142");
});
