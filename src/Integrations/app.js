require('colors');
const bodyParser = require('body-parser');
const express = require('express');
const app = new express();
app.use(express.json());
app.use(bodyParser.json());
require('./SearcherBot')(app);
require('./BotLists')(app);
app.get('/api/status', async (req, res) => {
	const { cluster } = require('../Config/config');
	const guilds = global.zuly.guilds.size;
	const users = await global.zuly.guilds.reduce((acc, guild) => acc + guild.memberCount, 0);
	const mongoose = require('mongoose');
	const date = Date.now();
	const pingDB = new Promise((r) =>
		mongoose.connection.db.admin().ping(() => r(Date.now() - date))
	);
	return res.json({
		id: cluster.id,
		name: cluster.nome,
		firstShard: cluster.firstShard,
		lastShard: cluster.lastShard,
		servers: guilds,
		users: users,
		ping: global.zuly.shards.random().latency,
		ram: (process.memoryUsage().rss / 1024 / 1024).toFixed(0) + 'mb',
		pingDB: await pingDB + 'ms'
	});
});
app.get('/', (req, res) => {
	res.sendStatus(200);
});
app.post('/', (req, res) => {
	res.sendStatus(200);
});
app.listen(2601, () => {
	console.log('[WEBHOOK] Ready!'.green);
});