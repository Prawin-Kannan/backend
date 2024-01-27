const { OAuth2Client } = require('google-auth-library');
const config = require('../config');

const client = new OAuth2Client(config.googleClientId);

exports.googleIn = async (idToken) => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: config.googleClientId,
    });
    const payload = ticket.getPayload();
    // You can customize this part based on your needs, e.g., create or update user in the database
    const user = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
    };
    return user;
};
