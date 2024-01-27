// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, 
    phoneNumber: String,
    influencer: {
        type: Array
    }
});

module.exports = mongoose.model('User', userSchema);
