// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, // You should use a secure hashing mechanism for storing passwords
    phoneNumber: String,
    influencer: {
        type: Array
    }
});

module.exports = mongoose.model('User', userSchema);
