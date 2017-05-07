'use strict'
var express = require('express');
var app = express();

function logErrors(err, req, res, next) {

	console.error(err.stack);
	next(err);
}

function clientSideErrorHandler(err, req, res, next) {
	if ( req.xhr ) {
		res.status(500).send({error: 'something failed!'});
	} else {
		next(err);
	}
}

function errorHandler(err, req, res, next) {
	res.status(500);
	res.render('error', {error: err});
}

app.use(logErrors);
app.use(clientSideErrorHandler);
app.use(errorHandler);
module.exports = app;
