const auth = require("../util/authentication");
const ApiError = require("../model/ApiError");
const loginLijst = [];
module.exports = {
    validateToken(req, res ,next) {
        console.log("validatie token");
        let authToken = req.header('access-token') || '';
        let token = req.header("x-access-token") || '';
        auth.decodeToken(token, (err, payload) => {
            if(err) {
                const error = new ApiError(err.message || err, 401);
                next(error);
            } else {
                console.log("geauthenticeerd payload = ");
                console.dir(payload);
                req.user = payload.sub;
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
        if(req.body !== undefined && loginLijst[req.body.username] === undefined){
            loginLijst[req.body.username] = req.body.password;
            let token = auth.encodeToken();
            res.status(200).json({"token" :token}).end();
        } else {
            next(new ApiError("Username is al in gebruik", 401));
        }
    }
};