let listedSongs = [];

setInterval(async () => {
    let songs = await req("get", "api/uploads");
    songs.forEach((song) => {
        if (!listedSongs.includes(song)) {
            let ul = document.querySelector("ul");
            let li = document.createElement("li");
            li.innerText = song;
            
            ul.appendChild(li);

            listedSongs.push(song);
        }
    });

    listedSongs.forEach((song, i) => {
        // means it was deleted
        if (!songs.includes(song)) {
            listedSongs.splice(i, 1);
        }
    });
}, 2500);
