const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/googleSignIn', authController.googleSignIn);
router.post('/signup', authController.signUp);
router.post('/influencersave', authController.Influencersave);
router.get('/userInfluencers', authController.UserInfluencers);

module.exports = router;
