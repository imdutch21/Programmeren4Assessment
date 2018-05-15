const auth = require("../util/authentication");
const Error = require("../model/ApiError");
const db = require('../config/db.improved');
const assert = require("assert");
const User = require("../model/User");

module.exports = {
    validateToken(req, res, next) {
        console.log("validatie token");
        let token = req.header("x-access-token") || '';
        auth.decodeToken(token, (err, payload) => {
            if (err) {
                const error = new Error(401, err.message || err);
                next(error);
            } else {
                console.log("geauthenticeerd payload = ");
                req.user = payload.sub;
                console.log(req.user);
                next();
            }
        });
    },

    login(req, res, next) {
        let user;
        let body = req.body || '';
        try {
            console.log(body.email);
            assert(typeof(body) === "object", "Body is not defined");
            user = new User.UserLogin(body.email, body.password);
        } catch (ex) {
            next(new Error(412, ex.toString()));
            return;
        }
        let query = ("SELECT id FROM user WHERE email = ? AND password = ?");
        let values = [user.email, user.password];
        db.query(query, values, function (error, rows, fields) {
            if (error) {
                next(error);
            } else if (rows.length === 0) {
                next(new Error(401, "Wachtwoord of email adres is incorrect!"))
            } else {
                res.status(200).json({
                    "token": auth.encodeToken(rows[0].id),
                    "email": user.email
                }).end();
            }
        })
    },

    register(req, res, next) {
        console.log("register")
        let body = req.body || '';

        let user;
        try {
            assert(typeof(body) === "object", "Body is not defined");
            user = new User.UserRegister(body.firstname, body.lastname, body.email, body.password);
        } catch (ex) {
            next(new Error(412, ex.toString()));
            return;
        }

        db.query("SELECT * FROM user WHERE email = ?", [user.email], function (error, rows, fields) {
            if (error) {
                next(error);
            } else if (rows.length > 0) {
                next(new Error(401, "Email is already taken!"))
            } else {
                let query = ("INSERT INTO user(Voornaam, Achternaam, Email, Password) VALUES(?) ");
                let values = [user.firstname, user.lastname, user.email, user.password];
                db.query(query, [values], function (error, rows, fields) {
                    if (error) {
                        next(error);
                    } else {
                        db.query("SELECT id FROM user WHERE email = ?", [user.email], function (error, rows, fields) {
                            if (error) {
                                next(error);
                            } else {
                                console.dir(rows);
                                console.dir(rows[0]);
                                res.status(200).json({
                                    "token": auth.encodeToken(rows[0].id),
                                    "email": user.email
                                }).end();

                            }
                        })
                    }
                })
            }

        })
    }
};