require('colors');
const bodyParser = require('body-parser');
const express = require('express');
const app = new express();

const guilds = global.zuly.guilds.size;
const users = global.zuly.guilds.reduce((acc, guild) => acc + guild.memberCount, 0);
const ping = global.zuly.shards.random().latency;

app.use(express.json());
app.use(bodyParser.json());
require('./SearcherBot')(app);
require('./BotLists')(app);

app.get('/api/status', async (req, res) => {
	return res.json({
		servers: guilds,
		users: users,
		ping: ping
	});
});
app.get('/', (req, res) => {
	res.sendStatus(200);
});
app.post('/', (req, res) => {
	res.sendStatus(200);
});
app.listen(3000, () => {
	console.log('[WEBHOOK] Ready!'.green);
});
