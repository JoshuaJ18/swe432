const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();
const mongoURI = process.env.API_URL;
mongoose.connect(mongoURI);

const SongModel = require('./models/song');
const PlaylistModel = require('./models/playlist');
const UserModel = require('./models/user');

const PORT = process.env.PORT || 3000;

app.use( cookieParser() );
app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: mongoURI}),
  cookie: { secure: true }
}));

app.set('view engine', 'ejs');

SongModel.createIndexes();

/*
// Insert dummy data 
const song1 = new SongModel({name: "song one"});
const song2 = new SongModel({name: "song 2"});
const song3 = new SongModel({name: "song three"});
song1.save();
song2.save();
song3.save();
*/


app.get('/', async (req, res) => {
  const songs = await SongModel.find({}).limit(20);
  const users = await UserModel.find({}).limit(5);
  const oldPlaylists = await PlaylistModel.find({});

  const sessionSongs = req.session.songs;
  
  res.render('pages/index', { songs, users, oldPlaylists, sessionSongs});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);

});

// API Calls:
app.get('/api/songs/getAllSongs', async (req, res) => {
  SongModel.find()
  .then((response) => {
    res.json(response);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get('/api/songs/getSongById/:songId', async (req, res) => {
  let songId = req.params.songId;

  SongModel.findById(new mongoose.mongo.ObjectId(songId))
  .then((response) => {
    res.json(response);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get('/api/songs/getPlaylists', async (req, res) => {
  PlaylistModel.find()
  .then((response) => {
    res.json(response);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get('/api/playlists/getPlaylistSongs/:playlistName', async (req, res) => {
  let playlistName = req.params.playlistName;

  PlaylistModel.findOne({name: playlistName})
  .then((response) => {
    res.json(response);
  })
  .catch((err) => {
    console.log(err);
  })
});

app.get('/api/songs/searchSongs/:songInput', async (req, res) => {
  let songInput = req.params.songInput;
  songInput = "\"" + songInput + "\"";

  SongModel.find({ $text: {$search: songInput} })
  .then((response) => {
    res.json(response);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get('/api/songs/searchSongs', async (req, res) => {
  SongModel.find({})
  .then((response) => {
    res.json(response);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.post('/api/playlists/newPlaylist', async function(req, res) {
  let playlist = req.body;

  let songObjectIds = [];
  playlist.songs.forEach((songId) => songObjectIds.push(new mongoose.Types.ObjectId(String(songId))));

  let newPlaylist = new PlaylistModel({
    name: playlist.name,
    dj: playlist.dj,
    date: playlist.date,
    time: playlist.time,
    songs: songObjectIds
  });
  
  newPlaylist.save()
  .then((response) => {
    res.json(response);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.post('/api/sessions/addSong', async function (req, res) {
  const songList = req.body;

  if (!req.session.songs) {
    req.session.songs = [];
    console.log("deleted");
  }

  let currentList = req.session.songs;

  currentList.push(songList);
  req.session.songs = currentList;

  res.status(200).send();
});

app.post('/api/sessions/clearSession', async function (req, res) {

  req.session.songs = [];

  res.status(200).send();
});
