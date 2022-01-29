const Database = require('./ZulyMongo');
const config = require('../Config/config');

const uri = config.mongodb;

if (uri.includes('zulybotc')) {
	console.log('[ERRO] Troca o banco de dados para produção mlk.'.red);
}

global.db = new Database(config.mongodb, 'zulybot');
global.db.on('ready', () => {
	console.log('[MONGO] Estou pronta!'.yellow);
});
global.db.connect();
