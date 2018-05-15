//
// Authenticatie van JSON Web Token
//


//Het encode van een username naar een Token
const moment = require('moment');
const jwt = require('jwt-simple');
const config = require('../config/config.json');
const secret = process.env.SECRETKEY || config.secretkey;


function encodeToken(username) {
    const playload = {
        exp: moment().add(10, 'days').unix(),
        iat: moment().unix(),
        sub: username
    };
    return jwt.encode(playload, secret)
}


// Het decoden van de Token naar een username
function decodeToken(token, callback) {

    try {
        const payload = jwt.decode(token, secret);
        //Check of de Token niet verlopen is.
        const now = moment().unix();
        if (now > payload.exp) {
            callback('Token is verlopen.', null)
        } else {
            callback(null, payload)
        }
    } catch (err) {
        callback(err, null)
    }
}

module.exports = {
    encodeToken,
    decodeToken
};
