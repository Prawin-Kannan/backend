const { OAuth2Client } = require('google-auth-library');
const config = require('../config');

const client = new OAuth2Client(config.googleClientId);

exports.googleIn = async (idToken) => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: config.googleClientId,
    });
    const payload = ticket.getPayload();
    const user = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
    };
    return user;
};
