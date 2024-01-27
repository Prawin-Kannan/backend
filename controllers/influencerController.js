const influencerService = require('../services/influencerService');
const Influencer = require('../models/Influencer');

// Controller function to get all influencers
exports.getAllInfluencers = async (req, res, next) => {
    try {
        const influencers = await influencerService.getAllInfluencers();
        res.json({ influencers });
    } catch (error) {
        next(error);
    }
};

exports.Influencers = async (req, res, next) => {
    try {
        const email = req.query;
        // Find all influencers with the specified email
        const influencers = await Influencer.find(email);

        res.json(influencers);
    } catch (error) {
        console.error('Error fetching influencers by email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.influencersname = async (req, res, next) => {
    try {
        const searchTerm = req.query.name;
    
        // Use a regular expression for case-insensitive search
        const influencers = await Influencer.find({ name: { $regex: new RegExp(searchTerm, 'i') } });
    
        res.json(influencers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

// Controller function to save an influencer
exports.saveInfluencer = async (req, res, next) => {
    try {
        const influencerData = req.body;
        const savedInfluencer = await influencerService.saveInfluencer(influencerData);
        res.status(201).json({ influencer: savedInfluencer });
    } catch (error) {
        next(error);
    }
};

// Add more controller functions as needed (update, delete, etc.)
