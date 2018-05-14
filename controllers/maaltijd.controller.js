const db = require('../config/db.improved');
const Error = require('../model/Error');
module.exports = {

    getAll(req, res, next) {
        let id = req.params.number || '';
        if (id !== '') {
            db.query('SELECT * FROM studentenhuis WHERE ID = ' + id, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else if (rows.length === 0) {
                    next(new Error(404, "Niet gevonden (huisId bestaat niet)"))
                }
            });
            db.query('SELECT * FROM maaltijd WHERE StudentenhuisID = ' + id, function (error, rows, fields) {
                if (error) {
                    next(error)
                } else {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        result: rows
                    }).end()
                }
            })
        } else {
            next(new Error(404, "Niet gevonden (huisId bestaat niet)"))
        }
    },

    getOneById(req, res, next) {
        let houseId = req.params.number || '';
        let mealId = req.params.id || '';
        console.dir(req.params);
        if (houseId !== '' && mealId !== '') {
            db.query('SELECT * FROM studentenhuis WHERE ID = ' + id, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else if (rows.length === 0) {
                    next(new Error(404, "Niet gevonden (huisId bestaat niet)"))
                }
            });
            db.query('SELECT * FROM maaltijd WHERE ID=' + mealId + ' AND StudentenhuisID = ' + houseId, function (error, rows, fields) {
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

            })
        } else {
            next(new Error(404, "Niet gevonden (huisId of maaltijdId bestaat niet) maaltijdId:" + mealId + ", huisId:" + houseId))
        }
    },
    create(req, res, next) {
        let houseId = req.params.number || '';
        let body = req.body || '';
        let userID = req.user || '1';
        console.dir(body);

        if (body.naam === undefined || body.beschrijving === undefined || body.ingredienten === undefined || body.allergie === undefined || body.prijs === undefined || userID === undefined || houseId === undefined) {
            next(new Error(412, "Een of meer properties in de request body ontbreken of zijn foutief"))
        } else if (houseId !== '' && body !== '') {
            let querry = 'INSERT INTO maaltijd(Naam, Beschrijving, Ingredienten, Allergie, Prijs, UserID, StudentenhuisID) VALUES (?)';
            let values = [body.naam, body.beschrijving, body.ingredienten, body.allergie, body.prijs, userID, houseId];
            db.query(querry, [values], function (error, rows, fields) {
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
            })
        } else {
            next(new Error(404, "Niet gevonden (huisId bestaat niet)"));
        }
    },

    update(req, res, next) {
        let houseId = req.params.number || '';
        let userID = req.user || '1';
        let mealId = req.params.id || '';
        if (houseId !== '' && body !== '') {
            let query = 'UPDATE maaltijd SET Naam=?,Beschrijving=?,Ingredienten=?,Allergie=?,Prijs=?,StudentenhuisID=? WHERE ID = ?';
            let values = [body.naam, body.beschrijving, body.ingredienten, body.allergie, body.prijs, houseId, mealId];
            db.query("SELECT * FROM maaltijd WHERE ID=" + mealId, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else if (rows.length === 0) {
                    next(new Error(404, "Niet gevonden (huisId of maaltijdId bestaat niet)"))
                }
            });

            db.query("SELECT * FROM maaltijd WHERE ID=" + mealId + " AND UserID = " + userID, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else if (rows.length === 0) {
                    next(new Error(409, "Conflict (Gebruiker mag deze data niet wijzigen)"));
                }
            });

            db.query(query, values, function (error, rows, fields) {
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
        } else {
            next(new Error(404, "Niet gevonden (huisId bestaat niet)"));
        }
    },

    delete(req, res, next) {
        let houseId = req.params.number || '';
        let body = req.body || '';
        let userID = req.user || '1';
        let mealId = req.params.id || '';

        if (body.naam === undefined || body.beschrijving === undefined || body.ingredienten === undefined || body.allergie === undefined || body.prijs === undefined || userID === undefined || houseId === undefined) {
            next(new Error(412, "Een of meer properties in de request body ontbreken of zijn foutief"))
        } else if (houseId !== '' && body !== '') {
            db.query("SELECT * FROM maaltijd WHERE ID=" + mealId, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else if (rows.length === 0) {
                    next(new Error(404, "Niet gevonden (huisId of maaltijdId bestaat niet)"))
                }
            });

            db.query("SELECT * FROM maaltijd WHERE ID=" + mealId + " AND UserID = " + userID, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else if (rows.length === 0) {
                    next(new Error(409, "Conflict (Gebruiker mag deze data niet wijzigen)"));
                }
            });

            db.query("DELETE FROM maaltijd WHERE ID=" + mealId , function (error, rows, fields) {
                if (error) {
                    next(error);
                } else {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        }
                    }).end();
                }
            });
        } else {
            next(new Error(404, "Niet gevonden (huisId bestaat niet)"));
        }
    }

};