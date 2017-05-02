var redis = require('redis');

exports.client = function() {

	var client = redis.createClient(process.env.REDISLAB_PORT, process.env.REDISLAB_HOST);

	client.auth(process.env.REDISLAB_DBPASS, function (err) {
		if (err) throw err;
	});

	client.on('connect', function() {
		//select default db index
		client.select(0);
		console.log('Connected to Redis');
	});

	client.on('error', function(err) {
		console.error('Redis error', err);
	});

	return client;
};
