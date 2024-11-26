const mongoose = require('mongoose');
const { Schema } = mongoose;

const songSchema = new Schema({
    name: { type: String, index: true }
});

songSchema.index({name: 'text'});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;