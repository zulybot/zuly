const Sharder = require('eris-sharder').Master;
const sharder = new Sharder('someToken', '/src/main.js', {
	stats: true,
	debug: true,
	guildsPerShard: 1500,
	name: 'ExampleBot',
	webhooks: {
		shard: {
			id: 'webhookID',
			token: 'webhookToken'
		},
		cluster: {
			id: 'webhookID',
			token: 'webhookToken'
		}
	},
	clientOptions: {
		messageLimit: 150,
		defaultImageFormat: 'png'
	}
});

sharder.on('stats', stats => {
	console.log(stats);
});