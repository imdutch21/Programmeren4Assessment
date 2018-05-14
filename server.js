
const express = require('express')
const morgan = require('morgan')
=======
// 
const http = require('http');
const express = require('express');
const authentication = require('./api/authentication.api.js');
const maaltijd = require('./api/maaltijd.api.js');

const bodyParser = require('body-parser')
const apiError = require('./model/apiError')
const AuthController = require('./controllers/authentication.controller')
const auth_routes = require("./routes/auth-routes");
const port = process.env.PORT || 3000

let app = express()
=======
const config = require('./config/config');
const db = require('./config/db.improved');
const app = express();

//login and registreren #niet beveiligd
app.use('/api', auth_routes)

//Check van de Api key
=======
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

app.all('*', AuthController.validateToken);

// Request is geautoriseerd
app.use('/api', person_routes)

// Endpoints pakken die niet bestaan
app.use('*', function (req, res, next) {
	const error = new apiError("Endpoint bestaan niet", 404)
	next(error)
})

// Logregel, wordt getoond wanneer geen andere routes matchten
// EN er geen foutsituatie is - anders wordt de error handler aangeroepen  
app.use((err, req, res, next) => {
	if (err instanceof require('assert').AssertionError) {
		console.log('AssertionError' + err)
		err.code = 500
	} else if (err instanceof apiError) {
		console.og('ApirError: ' + err)
	} else {
		console.log('Other Error: ' + err)
	}

	res.status(err.code)
	console.dir(err)
	res.json(err)
	res.end()
})
=======
    res.contentType('application/json');
    console.log('contenttype toegevoegd.');
    console.log('URL = ' + req.originalUrl);
    next();
});

// Demo route handler - print logregel voor alle /api* endpoints.
app.use('/api*', function (req, resp, next) {
    console.log('/api aangeroepen');
    next();
});

// Instantierr de api endpoint routes die we willen aanbieden
// app.use('/api', routes_v1);
app.use('/api/studentenhuis', maaltijd)

// Logregel, wordt getoond wanneer geen andere routes matchten
// EN er geen foutsituatie is - anders wordt de error handler aangeroepen  
app.use('*', function (req, res, next) {
    res.status(404) //return 404 for a 404 route, not 200!
        .json({
            message: 'Geen enkele endpoint matcht!'
        })
        .end();
});

// Error handler, handelt alle foutsituaties af waarbij error !== null
app.use(function (error, req, res, next) {
    console.error(error.toString());
    let status = 500;
    if (error.status !== undefined)
        status = error.status;

    res.status(status).json({
        message: error
    }).end();
});

app.listen(port, function () {
    console.log('De server luistert op port ' + port); //log the actual active port, not some static number
});

module.exports = app

