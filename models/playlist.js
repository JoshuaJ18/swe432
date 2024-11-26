let mongoose = require('mongoose');
const { Schema } = mongoose;

let playlistSchema = new Schema({
    name: String,
    dj: String,
    date: Date,
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Songs'}]
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;