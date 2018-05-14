const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const apiError = require('./model/apiError')
const AuthController = require('./controllers/authentication.controller')
const auth_routes = require("./routes/auth-routes");
const port = process.env.PORT || 3000

let app = express()

//login and registreren #niet beveiligd
app.use('/api', auth_routes)

//Check van de Api key
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

app.listen(port, function () {
	console.log('De server luistert op port ' + port); //log the actual active port, not some static number
});

module.exports = app
