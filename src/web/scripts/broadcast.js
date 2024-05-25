function broadcastSong(filename) {
    socket.emit("playSong", filename);
}
