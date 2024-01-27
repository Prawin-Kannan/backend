const mongoose = require('mongoose');

const influencerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, mail: {
        type: String,
        required: true,
    }
});

const Influencer = mongoose.model('Influencer', influencerSchema);

module.exports = Influencer;
