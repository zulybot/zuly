const DatabaseManager = require('./MongoWrapper');
const config = require('../Config/config');
const uri = config.mongodb;

if (uri.includes('zulybotc')) {
	console.log('[ERRO] Troca o banco de dados para produção mlk.'.red);
}

global.zuly.db = new DatabaseManager(config.mongodb, 'zulybot');
global.zuly.db.on('ready', () => {
	console.log('[MONGO] Estou pronta!'.yellow);
});

global.zuly.db.connect();
