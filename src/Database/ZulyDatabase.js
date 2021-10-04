const Database = require('./ZulyMongo');
const config = require('../Config/config');
global.db = new Database(config.mongodb, 'zulybot');

global.db.on('ready', () => {
	console.log('[MONGO] Estou pronta!'.brightYellow);
});

global.db.connect();