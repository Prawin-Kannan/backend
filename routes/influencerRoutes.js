const express = require('express');
const router = express.Router();
const influencerController = require('../controllers/influencerController');

// Route to get all influencers
router.get('/', influencerController.getAllInfluencers);
router.get('/influencers', influencerController.Influencers);
router.get('/influencersname', influencerController.influencersname);


// Route to save an influencer
router.post('/', influencerController.saveInfluencer);

// Add more routes as needed (update, delete, etc.)

module.exports = router;
