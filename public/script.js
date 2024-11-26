let playlistSongs = [];

async function addSong(song) {
    const playlistList = document.getElementById("playlist-list");
    const listItem = document.createElement("li");
    const p = document.createElement("p");
    const text = document.createTextNode(song.innerHTML);
    const button = document.createElement("button");
    button.innerText = "X";
    button.onclick = function () {
        removeSong(button);
    }
    button.className = "playlist-list-button";

    p.appendChild(text);
    listItem.appendChild(p);
    listItem.appendChild(button);
    listItem.id = song.id;
    
    playlistList.appendChild(listItem);

    const sendList = [];
    sendList.push(song.id);
    sendList.push(song.innerHTML);

    
    fetch('/api/sessions/addSong', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sendList)
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
    
};

const btn2 = document.querySelector("#song-search button");
btn2.addEventListener("click", addSong.bind(this));


function playlistSubmit(event) {
    event.preventDefault();
    let songIdList = [];

    const newPlaylistSongs = document.querySelectorAll("#playlist-list li");

    newPlaylistSongs.forEach((song) => {
        let songName = song.innerHTML.split(">")[1].split("<")[0];
        const songId = song.id;

        songIdList.push(songId);
        
    });

    songIdList = songIdList.filter((songId) => !(songId === null));

    const dj = document.getElementById("dj-input").innerText;
    const playlistName = document.getElementById("playlist-name-input").value;
    const date = document.getElementById("date-input").value;
    const newDate = new Date(date);
    const time = document.getElementById("time-input").value.split(":");
    newDate.setHours(time[0]);
    newDate.setMinutes(time[1]);

    const newPlaylist = {name: playlistName, dj:dj, date: newDate, songs: songIdList};

    fetch('/api/playlists/newPlaylist', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPlaylist)
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
};

const btn1 = document.querySelector("#playlist button");
btn1.addEventListener("click", playlistSubmit);

async function searchSong(search) {
    const searchInput = document.getElementById("search-song-input").value;
    let newSongs;

    const currentSongs = document.getElementById("songs-list");
    currentSongs.innerHTML = '';

    if (!(searchInput) || searchInput.length < 1) {
        try {
            const res = await fetch(`/api/songs/searchSongs`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            newSongs = await res.json();
            console.log("\ntest " + newSongs);
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            const res = await fetch(`/api/songs/searchSongs/${searchInput}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            newSongs = await res.json();
        } catch (err) {
            console.log(err);
        }
    }

    const currentSongList = document.querySelector("#songs-list");

    newSongs.forEach((song) => {
        let button = document.createElement("button");
        let songName = document.createTextNode(song.name);
        button.appendChild(songName);
        button.className = "song";
        button.id = song._id;
        button.onclick = function () {
            addSong(button);
        }

        let li = document.createElement("li");
        li.appendChild(button);
        currentSongList.appendChild(li);
    });

}

const btn3 = document.querySelector("#song-search input");
btn3.addEventListener("change", searchSong.bind(this));

async function playlistTemplate(option) {
    let choice = option.value;
    let playlistTemp;

    if (!(choice === "-1")) {
        const currentSongs = document.getElementById("playlist-list");
        currentSongs.innerHTML = '';

        try {
            const res = await fetch(`/api/playlists/getPlaylistSongs/${choice}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            playlistTemp = await res.json();
        } catch (err) {
            console.log(err);
        }

        const currentSongList = document.getElementById("playlist-list");

        playlistTemp.songs.forEach(async (song) => {
            let currentSong;
            try {
                const res = await fetch(`/api/songs/getSongById/${song}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                currentSong = await res.json();
            } catch (err) {
                console.log(err);
            }

            const listItem = document.createElement("li");
            const p = document.createElement("p");
            let text = document.createTextNode(currentSong.name);

            p.appendChild(text);
            listItem.appendChild(p);
            listItem.id = currentSong._id;

            currentSongList.appendChild(listItem);
        });

    } else {
        const currentSongs = document.getElementById("playlist-list");
        currentSongs.innerHTML = '';
    }
}

function assignDJ(dj) {
    const assignedDJSpot = document.getElementById("dj-input");
    assignedDJSpot.innerHTML = '';
    const text = document.createTextNode(dj.innerHTML);
    assignedDJSpot.appendChild(text);
}

function removeSong(songId) {
    console.log(songId.parentNode);
    songId.parentNode.remove();
}

const btn4 = document.querySelectorAll("#playlist-list button");
btn4.forEach((btn) => {
    btn.addEventListener("click", removeSong.bind(this));
});