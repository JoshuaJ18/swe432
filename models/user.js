let mongoose = require('mongoose');
const { Schema } = mongoose;

let userSchema = new Schema({
    username: String,
    password: String,
    role: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;