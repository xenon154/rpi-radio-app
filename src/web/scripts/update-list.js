let listedSongs = [];

setInterval(() => {
    let songs = post("api/uploads");
    console.log(songs);
}, 2500);
