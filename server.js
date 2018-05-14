// 
const http = require('http');
const express = require('express');
const routes_v1 = require('./api/authentication.api.js');
const maaltijd = require('./api/maaltijd.api.js');
const bodyParser = require('body-parser')
const logger = require('morgan');

const config = require('./config/config');
const db = require('./config/db.improved');
const app = express();

const port = process.env.PORT || config.webPort || 4001

app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

app.use(logger('dev'));

// Voeg ContentType toe aan alle responses (en ga door naar next route handler)
app.use('*', function (req, res, next) {
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
app.use('/api', routes_v1);
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
    res.status(500).json({
        message: error
    }).end();
});

app.listen(port, function () {
    console.log('De server luistert op port ' + port); //log the actual active port, not some static number
});
