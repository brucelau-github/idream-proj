//define counter object
var counter = { counter: 0};

exports.show = function(req, res){
	res.json(counter);
};
exports.add = function(req, res){
	//get req add number
	var number = parseInt(req.params.number);
	counter.counter += number;
	res.json(counter);
};
exports.sub = function(req, res){
	//get req add number
	var number = parseInt(req.params.number);
	counter.counter -= number;
	res.json(counter);
};
exports.clear = function(req, res){
	counter.counter = 0;
	res.json(counter);
};
