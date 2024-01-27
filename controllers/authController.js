// controllers/authController.js

const { googleIn } = require('../services/authService');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Influencer = require('../models/Influencer');

const signUp = async (req, res) => {

    const { name, email, password, phoneNumber } = req.body;
    console.log(req.body);

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        // Create a new user document
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
        });

        // Save the user to the database
        await newUser.save();
        res.status(200).json({ message: 'User Created' });
    } catch (error) {
        console.error('Error saving user to MongoDB:', error);
        // Handle error and send an appropriate response
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const Influencersave = async (req, res) => {
    try {
        const { userName, influencers } = req.body;
        if (!userName || !influencers || !Array.isArray(influencers)) {
            return res.status(400).json({ message: 'Invalid request. UserName and influencers array are required.' });
        }

        // Find the user by userName
        const user = await User.findOne({ name: userName });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update the "influencer" field for the user
        user.influencer = influencers;
        const updatedUser = await user.save();

        res.json(updatedUser);
    } catch (error) {
        console.error('Error saving influencers to user:', error);
        res.status(500).json({ message: 'Failed to save influencers to user. Please try again later.' });
    }
};

const UserInfluencers = async (req, res) => {
    try {
        const userName = req.query.userName; // Access query parameter

        const user = await User.findOne({ name: userName });
        console.log('User name:', user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the influencers associated with the user
        res.json({ influencers: user.influencer });
    } catch (error) {
        console.error('Error fetching user influencers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const googleSignIn = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Check if both name and email are provided
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and Email are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: 'User with this email already exists', user: { name, email } });
        } else {
            const newUser = new User({ name, email });
            await newUser.save();
            const defaultInfluencers = [
                { name: 'Influencer 1', followers: 100000, category: 'Fashion' },
                { name: 'Influencer 2', followers: 50000, category: 'Fitness' },
                { name: 'Influencer 3', followers: 200000, category: 'Travel' },
            ];

            // Save default influencers for the new user
            await Influencer.insertMany(defaultInfluencers.map((influencer) => ({ ...influencer, userId: newUser._id })));

            return res.status(200).json({ message: 'User data saved successfully', user: { name, email } });
        }
    } catch (error) {
        console.error('Error saving user data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    signUp,
    googleSignIn,
    Influencersave,
    UserInfluencers
};