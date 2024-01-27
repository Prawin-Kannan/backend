const Influencer = require('../models/Influencer');

// Example service function to get all influencers from the database
exports.getAllInfluencers = async () => {
    try {
        const influencers = await Influencer.find();
        return influencers;
    } catch (error) {
        throw error;
    }
};

// Example service function to save an influencer to the database
exports.saveInfluencer = async (influencerData) => {
    try {
        const newInfluencer = new Influencer(influencerData);
        const savedInfluencer = await newInfluencer.save();
        return savedInfluencer;
    } catch (error) {
        throw error;
    }
};
