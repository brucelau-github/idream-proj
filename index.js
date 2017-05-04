'use strict'
var express = require('express');
var app = express();
require('dotenv').config();
var counter = require('./src/counter');
var bodyParser = require('body-parser')

//authentication
var path = require('path');
var auth = require('express-authentication');
var basic = require('express-authentication-basic');

var login = basic(function(challenge, callback) {
	if (challenge.username === 'bruce' && challenge.password === 'liu') {
		callback(null, true, { user: 'charles' });
	} else {
		callback(null, false, { error: 'INVALID_PASSWORD' });
	}
});
app.use(login);
app.use(function(req, res,next) {
	if (req.authenticated) {
		next();
	} else {
		res.status(401).send();
	}
});

app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())
//routing definition
app.get('/Counter/show', counter.show);
app.put('/Counter/add/:number', counter.add);
app.put('/Counter/sub/:number', counter.sub);
app.put('/Counter/clear', counter.clear);
app.use(express.static('./public'));

app.listen(process.env.SVR_PORT, function () {
  console.log('gamp app listening on port', process.env.SVR_PORT, '!')
});
