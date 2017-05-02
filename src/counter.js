//define counter object
var redcli = require('./redis').client();
var counter = { counter: 0};

function init() {
	redcli.get('counter', function(err,rep) {
		if (rep == null) redcli.set('counter', counter.counter);
		else {
			counter.counter = parseInt(rep);
		}
	});
}

function saveCounter() {
	redcli.set('counter', counter.counter);
}

init();

exports.show = function(req, res){
	res.json(counter);
};

exports.add = function(req, res){
	//get req add number
	var number = parseInt(req.params.number);
	counter.counter += number;
	saveCounter();
	res.json(counter);
};
exports.sub = function(req, res){
	//get req add number
	var number = parseInt(req.params.number);
	counter.counter -= number;
	saveCounter();
	res.json(counter);
};
exports.clear = function(req, res){
	counter.counter = 0;
	saveCounter();
	res.json(counter);
};
