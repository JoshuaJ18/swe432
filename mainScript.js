import Playlist from "./playlist.js";
import Song from "./song.js";
import User from "./user.js";

const user1 = new User("email@email.com", "username 11", "password");
const user2 = new User("email@email.com", "username 22", "password");
const user3 = new User("email@email.com", "username 3", "password");
const user4 = new User("email@email.com", "username 4", "password");

const users = [
    user1,
    user2,
    user3,
    user4
];

const song1 = new Song("song 1", "This is song 1", "1:32", "../../public/images/music_img.png");
const song2 = new Song("song 2", "This is song 2", "3:34", "../../public/images/music_img.png");
const song3 = new Song("song 3", "This is song 3", "2:52", "../../public/images/music_img.png");

const songs = [
    song1, 
    song2,
    song3
];

let playlistSongs = [
    song1
];

const playlist = new Playlist("playlist 1", playlistSongs);

const playlists = [
    playlist
];

function playlistSubmit() {
    alert("Playlist created");
    return true;
};

function selectSong(e) {
    const innerHtml = e.target.textContent;

    const playlistList = document.getElementById("playlist-list");
    
    const listItem = document.createElement("li");
    const p = document.createElement("p");
    const text = document.createTextNode(innerHtml);

    p.appendChild(text);
    listItem.appendChild(p);
    
    playlistList.appendChild(listItem);


    return true;
};

function selectUser(e) {
    const userInnerHtml = e.textContent;
    playlist.setDj(userInnerHtml);

    return true;
};


const playlistBtn = document.querySelector("#playlist button");
playlistBtn.addEventListener("click", playlistSubmit);

const dropdown = document.getElementById("dropdown");

playlists.forEach(playlist => {
    const option = document.createElement("option");
    const optionText = document.createTextNode(playlist.getName());
    option.appendChild(optionText)
    dropdown.appendChild(option);
});

const playlistList = document.getElementById("playlist-list");

playlist.songs.forEach(song => {
    const listItem = document.createElement("li");
    const p = document.createElement("p");
    const text = document.createTextNode(song.name);

    p.appendChild(text);
    listItem.appendChild(p);
    
    playlistList.appendChild(listItem);
});

const songsList = document.getElementById("songs-list");


songs.forEach((song) => {
    const listItem = document.createElement("li");
    const btn = document.createElement("button");
    btn.addEventListener("click", selectSong);
    btn.textContent = song.name;

    listItem.appendChild(btn);
    
    songsList.appendChild(listItem);
});

const userInfo = document.getElementById("user-info");
const username = document.createElement("h1");
username.textContent = user1.name;
userInfo.appendChild(username);


const userList = document.getElementById("user-list");

users.forEach((user) => {
    const userListItem = document.createElement("li");
    const userButton = document.createElement("button");
    userButton.addEventListener("click", selectUser);
    userButton.textContent = user.name;

    userListItem.appendChild(userButton);
    userList.appendChild(userListItem);
})

