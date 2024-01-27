const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const influencerRoutes = require('./routes/influencerRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect(config.databaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use('/auth', authRoutes);
app.use('/influencers', influencerRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
