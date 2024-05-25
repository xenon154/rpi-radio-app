import { socket } from "./main";

function broadcastSong(filename) {
    socket.emit("playSong", filename);
}
