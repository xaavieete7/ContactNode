const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_id: {type: String},
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String, unique: true},
    username: {type: String, unique: true},
    password: {type: String}
});

module.exports = mongoose.model('User', UserSchema);