const auth = require("../util/authentication");
const ApiError = require("../model/ApiError");
const db = require('../config/db.improved');
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
        if(req.body.email === res.body.email && req.body.password === res.body.password){
            
            res.status(200).json(auth.encodeToken(req.body.user)).end();
        } else {
            next();
        }

        
        
        
    register(req, res ,next) {
        let body = req.body || '',

        if(body.voornaam === undefined || body.achternaam === undefined || body.email === undefined || body.password === undefined) {
            next(new Error(412, "Een of meer properties in de request body ontbreken of zijn foutief"))
        } else {
           let querry = ("INSERT INTO user(ID, Voornaam, Achternaam, Email, Password) VALUES(?) ")
            let values = [body.voornaam, body.achternaam, body.email, body.password, userID];
            db.query(querry, [values], function (error, rows, fields) {
              if(error){
                  next(error);
              } else {
                    db.querry("SELECT * FROM user WHERE =" + body.email , function (error, rows, fields ) {
                if(error) {
                    next(error);
                } else if (rows.length === 0) {
                    next(new Error(412, "Email does not exist"));
                } else {
                    res.status(200).json({
                       status : {
                           query : 'OK'
                       },
                       result: rows
                    })

                }
            }
        }
    }
}
}
