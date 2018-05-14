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
        
        
        
//     register(req, res ,next) {
//         let body = req.body || '';

//         if(body.voornaam === undefined || body.achternaam === undefined || body.email === undefined || body.password === undefined) {
//             next(new Error(412, "Een of meer properties in de request body ontbreken of zijn foutief"))
//         } else {
//             db.querry("SELECT * FROM user WHERE =" + body.email , function (error, rows, fields ) {
//                 if(error) {
//                     next(error);
//                 } else if (rows.length === 0) {
//                     next(new Error(412, "Email does not exist"));
//                 } else {
//                     res.status(200).json({
//                        status : {
//                            query : 'OK'
//                        }
//                     })

//                 }

//             }
//         }


// //         if(
// //             let token = auth.encodeToken();
// //             res.status(200).json({"token" :token}).end();
// //         } else {
// //             next(new ApiError("Username is al in gebruik", 401));
// //         }
// //     }
    }
}
