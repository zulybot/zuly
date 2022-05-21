const { Client } = require('quickpostgres');
const config = require('../Config/config');
const uri = config.postgre;

global.zuly.db = new Client(uri);
global.zuly.db.on('ready', async () => {
	console.log('[POSTGRESQL] Postgre iniciado com sucesso!'.yellow);
});

global.zuly.del = global.zuly.db.delete;

(async () => {
	await global.zuly.db.connect();
})();
