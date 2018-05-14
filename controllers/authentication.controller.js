const auth = require("..util/authentication")
const apiError = require("../model/apiError")
const loginLijst = []

module.exports = {
    validateToken(req, res ,next) {
        console.log("validatie token")
        let authToken = req.header('access-token') || '';
        auth.decodeToken(token, (err, payload) => {
            if(err) {
                const error = new apiError(err.message || err, 401);
                next(error);
            } else {
                console.log("geauthenticeerd payload = ")
                console.dir(payload)
                req.user = payload.sub
                next();
            }
        });
    },

    login(req, res ,next) {
        if(loginLijst[req.body.username] === req.body.password) {
            res.status(200).json(auth.encodeToken(req.body.username)).end(); 
        } else {
            next();
        }
    },
    register(req, res ,next) {
        if(loginLijst[req.body.username] === undefined){
            loginLijst[req.body.username] = req.body.password
            let authToken = authToken.encodeToken
            res.status(200).json({"token" :token}).end();
            res.status(200).json({}).end();
        } else {
            next(new apiError("Username is al in gebruik", 401));
        }
    }
}