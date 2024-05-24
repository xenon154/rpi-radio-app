let listedSongs = [];

setInterval(() => {
    let songs = req("get", "api/uploads");
    console.log(songs);
}, 2500);
