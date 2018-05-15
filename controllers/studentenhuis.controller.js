const db = require('../config/db.improved');
const Error = require('../model/ApiError');
const Studentenhuis = require('../model/Studentenhuis');
module.exports = {
    getAll(req, res, next) {
        db.query('SELECT studentenhuis.id, studentenhuis.naam, studentenhuis.adres, user.voornaam as "contact", user.email FROM studentenhuis LEFT JOIN user ON user.ID = studentenhuis.UserID ', function (error, rows, fields) {
            if (error)
                next(error);
            else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: rows
                }).end()
            }
        })
    },
    getOneById(req, res, next) {
        let houseId = req.params.number || '';
        if (houseId !== '') {
            db.query("SELECT studentenhuis.id, studentenhuis.naam, studentenhuis.adres, user.voornaam as 'contact', user.email FROM studentenhuis LEFT JOIN user ON user.ID = studentenhuis.UserID WHERE studentenhuis.id =" + houseId, function (error, rows, fields) {
                if (error)
                    next(error);
                else if (rows.length > 0) {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        result: rows
                    }).end()
                } else {
                    next(new Error(404, "Niet gevonden (huisId bestaat niet)"))
                }
            });
        } else {
            next(new Error(404, "Niet gevonden (huisId bestaat niet)"))
        }
    },
    create(req, res, next) {
        let body = req.body || '';
        let userID = req.user || '1';
        console.dir(body);
        let studentenhuis;
        try {
            assert(typeof(body) === "object", "Body is not defined");
            studentenhuis = new Studentenhuis(body.naam, body.adres);
        } catch (ex) {
            next(new Error(412, ex.toString()));
            return;
        }

        let querry = 'INSERT INTO studentenhuis(Naam, Adres, UserID) VALUES (?)';
        let values = [studentenhuis.naam, studentenhuis.adres, userID];
        db.query(querry, [values], function (error, rows, fields) {
            if (error) {
                next(error);
            } else {
                db.query("SELECT studentenhuis.id, studentenhuis.naam, studentenhuis.adres, user.voornaam as 'contact', user.email FROM studentenhuis LEFT JOIN user ON user.ID = studentenhuis.UserID WHERE studentenhuis.id =  " + rows.insertId, function (error, rows, fields) {
                    if (error) {
                        next(error);
                    } else {
                        res.status(200).json({
                            status: {
                                query: 'OK'
                            },
                            result: rows
                        }).end();
                    }
                });
            }
        });

    },

    update(req, res, next) {
        let body = req.body || '';
        let userID = req.user || '1';
        let houseId = req.params.number || '';
        let studentenhuis;
        try {
            assert(typeof(body) === "object", "Body is not defined");
            studentenhuis = new Studentenhuis(body.naam, body.adres);
        } catch (ex) {
            next(new Error(412, ex.toString()));
            return;
        }

        if (houseId !== '') {
            db.query("SELECT * FROM studentenhuis WHERE ID=" + houseId, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else if (rows.length === 0) {
                    next(new Error(404, "Niet gevonden (huisId bestaat niet)"))
                } else {
                    db.query("SELECT * FROM studentenhuis WHERE ID=" + houseId + " AND userid = " + userID, function (error, rows, fields) {
                        if (error) {
                            next(error);
                        } else if (rows.length === 0) {
                            next(new Error(409, "Conflict (Gebruiker mag deze data niet wijzigen)"))
                        } else {
                            let query = 'UPDATE studentenhuis SET Naam=?,adres=? WHERE ID = ?';
                            let values = [body.naam, body.adres, houseId];
                            db.query(query, values, function (error, rows, fields) {
                                if (error) {
                                    next(error);
                                } else {
                                    db.query("SELECT studentenhuis.id, studentenhuis.naam, studentenhuis.adres, user.voornaam as 'contact', user.email FROM studentenhuis LEFT JOIN user ON user.ID = studentenhuis.UserID WHERE studentenhuis.id =  " + houseId, function (error, rows, fields) {
                                        if (error) {
                                            next(error);
                                        } else {
                                            res.status(200).json({
                                                status: {
                                                    query: 'OK'
                                                },
                                                result: rows
                                            }).end();
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            next(new Error(404, "Niet gevonden (huisId bestaat niet)"));
        }
    },

    delete(req, res, next) {
        let houseId = req.params.number || '';
        let userID = req.user || '1';
        let body = req.body || '';

        let studentenhuis;
        try {
            assert(typeof(body) === "object", "Body is not defined");
            studentenhuis = new Studentenhuis(body.naam, body.adres);
        } catch (ex) {
            next(new Error(412, ex.toString()));
            return;
        }

        if (houseId !== '') {
            db.query("SELECT * FROM studentenhuis WHERE ID=" + houseId, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else if (rows.length === 0) {
                    next(new Error(404, "Niet gevonden (huisId bestaat niet)"))
                } else {
                    db.query("SELECT * FROM studentenhuis WHERE ID=" + houseId + " AND UserID = " + userID, function (error, rows, fields) {
                        if (error) {
                            next(error);
                        } else if (rows.length === 0) {
                            next(new Error(409, "Conflict (Gebruiker mag deze data niet wijzigen)"));
                        } else {
                            res.status(200).json({
                                status: {
                                    query: 'OK'
                                }
                            }).end();
                        }
                    });
                }
            });
        } else {
            next(new Error(404, "Niet gevonden (huisId bestaat niet)"));
        }
    }

};