const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PassSchema = new Schema({
    user: {type: String},
    url: {type: String},
    username: {type: String},
    password: {type: String},
});

module.exports = mongoose.model('Password', PassSchema);