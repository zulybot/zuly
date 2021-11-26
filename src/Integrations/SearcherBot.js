module.exports = (app) => {
	const config = require('../Config/config');
	app.get('/api/searcher', async (req, res) => {
		res.sendStatus(200);
	});
	app.post('/api/searcher', async (req, res) => {
		const data = req.body;
		const auth = req.headers.authorization;
		if (auth !== config.secrets.searcher) return;
		console.log(data);
		res.sendStatus(200);
	});
};
