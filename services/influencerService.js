const Influencer = require('../models/Influencer');


exports.getAllInfluencers = async () => {
    try {
        const influencers = await Influencer.find();
        return influencers;
    } catch (error) {
        throw error;
    }
};


exports.saveInfluencer = async (influencerData) => {
    try {
        const newInfluencer = new Influencer(influencerData);
        const savedInfluencer = await newInfluencer.save();
        return savedInfluencer;
    } catch (error) {
        throw error;
    }
};
