let listedSongs = [];

setInterval(() => {
    let songs = req("GET", "api/uploads");
    console.log(songs);
}, 2500);
