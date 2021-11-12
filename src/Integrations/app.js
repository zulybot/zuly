require('colors');
const bodyParser = require('body-parser');
const express = require('express');
const app = new express();
app.use(express.json());
app.use(bodyParser.json());
require('./SearcherBot')(app);
require('./BotLists')(app);
app.get('/', (req, res) => {
	res.sendStatus(200);
});
app.post('/', (req, res) => {
	res.sendStatus(200);
});
app.listen(3000, () => {
	console.log('[WEBHOOK] Ready!'.green);
});