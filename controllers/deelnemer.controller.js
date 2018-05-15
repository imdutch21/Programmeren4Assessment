
const db = require('../config/db.improved');
const Error = require('../model/ApiError');
module.exports = {

    getAll(req, res, next) {
        console.log("get");
        let studentenhuisID = req.params.studentenhuisID || '';
        let maaltijdID = req.params.maaltijdID || '';
        if (studentenhuisID !== '' && maaltijdID !== '') {
            db.query('SELECT * FROM deelnemers WHERE studentenhuisID = ? AND maaltijdID = ? ', [studentenhuisID, maaltijdID], function (error, rows, fields) {
                console.log("---query");
                if (error) {
                    next(error);
                } else if (rows.length === 0) {
                    next(new Error(404, "Niet gevonden (deelnemer bestaat niet)"))
                } else {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        result: rows
                    }).end()

                }

            })
        }
    },

    create(req, res, next) {
        let userID = req.user || '';
        let studentenhuisID = req.params.studentenhuisID || '';
        let maaltijdID = req.params.maaltijdID || '';

        if (userID === undefined || studentenhuisID === undefined || maaltijdID === undefined) {
            next(new Error(412, "Een of meer properties in de request body ontbreken of zijn foutief"))
        } else {
            db.query("SELECT * FROM deelnemers WHERE studentthuisID = ? AND maaltijdID = ? AND userID = ? ", [studentenhuisID, maaltijdID, userID], function (error, rows, fields) {
                if (error) {
                    next(error);
                } else if (rows.length > 0) {
                    next(new Error(409, "Conflict ( Gebruikers is al aangemeld"))
                } else {
                    db.query("INSERT INTO deelnemers(userID, studentenhuisID, maaltijdID) VALUES(?)", [[userID, studentenhuisID, maaltijdID]], function (error, rows, fields) {
                        if (error) {
                            next(error);
                        } else {
                            db.query("SELECT voornaam, email, achternaam FROM user WHERE userID = ?", [userID], function (error, rows, fields) {
                                if (error) {
                                    next(error);
                                } else {
                                    res.status(200).json({
                                        status: {
                                            query: "OK"
                                        },
                                        result: rows
                                    }).end()
                                }
                            })

                        }
                    })
                }
            })
        }

    },

    delete(req, res, next) {
    let userID = req.user || '';
    let studentenhuisID = req.params.studentenhuisID || '';
    let maaltijdID = req.params.maaltijdID || '';

    if (userID !== "" && studentenhuisID !== '' && maaltijdID !== '') {
        db.query("SELECT * FROM deelnemers WHERE studentenhuisID = ? AND maaltijdID = ? AND userID = ?", [studentenhuisID, maaltijdID, userID], function (error, rows, fields) {
            if (error) {
                next(error)
            } else {
                db.query("DELETE FROM deelnemers WHERE userID = ? AND maaltijdID = ? AND userID = ?", [studentenhuisID, maaltijdID, userID], function (error, rows, fields) {
                    if (error) {
                        next(error)
                    } else {
                        res.status(200).end
                    }
                })
            }
        })
    }
}
};












