let listedSongs = [];

async function updateList() {
    let songs = await req("get", "api/uploads");
    songs.forEach((song) => {
        if (!listedSongs.includes(song)) {
            let ul = document.querySelector("ul");
            let li = document.createElement("li");
            li.innerHTML = `<a href="javascript:broadcastSong(${song})">${song}</a>`;
            li.id = "song-" + songs.indexOf(song);

            ul.appendChild(li);

            listedSongs.push(song);
        }
    });

    listedSongs.forEach((song, i) => {
        // means it was deleted
        if (!songs.includes(song)) {
            let li = document.querySelector("#song-" + i);
            li.parentElement.removeChild(li);
            listedSongs.splice(i, 1);
        }
    });
}
