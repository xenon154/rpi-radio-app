let listedSongs = [];

setInterval(async () => {
    let songs = await req("get", "api/uploads");
    console.log(songs);
}, 2500);
