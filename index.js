var express = require('express');
var app = express();
require('dotenv').config();
var counter = require('./src/counter');

//routing definition
app.get('/Counter/show', counter.show);
app.put('/Counter/add/:number', counter.add);
app.put('/Counter/sub/:number', counter.sub);
app.put('/Counter/clear', counter.clear);
app.use(express.static('./public'));

app.listen(process.env.SVR_PORT, function () {
  console.log('gamp app listening on port', process.env.SVR_PORT, '!')
});
