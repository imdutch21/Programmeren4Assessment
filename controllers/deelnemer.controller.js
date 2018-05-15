import { create } from 'domain';

//
// deelnemer
//

const db = require('../config/db.improved');
const Error = require('../model/Error');
module.exports = {

    GetAll(req, res, next) {
        let studenthuisID = req.params.studenthuisID || ''
        let maaltijdID = req.params.maaltijdID || ''
        if (studenthuisID !== '' && maaltijdID !== '') {
            db.query('SELECT * FROM deelnemers WHERE studenthuisID = ? AND maaltijdID = ? ', [studenthuisID, maaltijdID], function (error, rows, fields) {
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

    CREATE(req, res, next) {
        let userID = req.user || ''
        let studenthuisID = req.params.studenthuisID || ''
        let maaltijdID = req.params.maaltijdID || ''

        if (userID === undefined || studenthuisID === undefined || maaltijdID === undefined) {
            next(new Error(412, "Een of meer properties in de request body ontbreken of zijn foutief"))
        } else {
            db.query("SELECT * FROM deelnemers WHERE studentthuisID = ? AND maaltijdID = ? AND userID = ? ", [studenthuisID, maaltijdID, userID], function (error, rows, fields) {
                if (error) {
                    next(error);
                } else if (rows.length > 0) {
                    next(new Error(409, "Conflict ( Gebruikers is al aangemeld"))
                } else {
                    db.query("INSERT INTO deelnemers(userID, studenthuisID, maaltijdID) VALUES(?)", [[userID, studenthuisID, maaltijdID]], function (error, rows, fields) {
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

    DELETE(req, res, next) { 
    let userID = req.user || ''
    let studenthuisID = req.params.studenthuisID || ''
    let maaltijdID = req.params.maaltijdID || ''

    if (userID !== "" && studenthuisID !== '' && maaltijdID !== '') {
        db.query("SELECT * FROM deelnemers WHERE studenthuisID = ? AND maaltijdID = ? AND userID = ?", [studenthuisID, maaltijdID, userID], function (error, rows, fields) {
            if (error) {
                next(error)
            } else {
                db.query("DELETE FROM deelnemers WHERE userID = ? AND maaltijdID = ? AND userID = ?", [studenthuisID, maaltijdID, userID], function (error, rows, fields) {
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












