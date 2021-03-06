require('colors');
const bodyParser = require('body-parser');
const express = require('express');
const app = new express();
app.use(express.json());
app.use(bodyParser.json());
require('./SearcherBot')(app);
require('./BotLists')(app);
app.get('/api/backgrounds', async (req, res) => {
	const backgrounds = require('../Config/backgrounds');
	return res.json(backgrounds);
});
app.get('/api/commands', async (req, res) => {
	return res.json(global.zuly.commands);
});
app.get('/api/status', async (req, res) => {
	const guilds = global.zuly.guilds.cache.size;
	const users = await global.zuly.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
	const date = Date.now();
	await global.zuly.db.set('ping', Date.now()).then(async () => {
		const dbPing = await require('pretty-ms')(Date.now() - date);
		await global.zuly.db.delete('ping');
		return res.json({
			clientStatus: {
				servers: guilds,
				users: users,
				channels: global.zuly.channels.cache.size,
			},
			ram: (process.memoryUsage().rss / 1024 / 1024).toFixed(0),
			ping: {
				db: dbPing,
				ws: global.zuly.ws.ping
			}
		});
	});
});
app.get('/', (req, res) => {
	res.sendStatus(200);
});
app.post('/', (req, res) => {
	res.sendStatus(200);
});
app.listen(2601, () => {
	console.log('[WEBHOOK] Ready at http://localhost:2601!'.green);
});