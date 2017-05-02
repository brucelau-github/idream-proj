var express = require('express');
var app = express();
var counter = require('./counter');

//routing definition
app.get('/Counter/show', counter.show);
app.put('/Counter/add/:number', counter.add);
app.put('/Counter/sub/:number', counter.sub);
app.put('/Counter/clear', counter.clear);

app.listen(3000, function () {
  console.log('gamp app listening on port 3000!')
})
