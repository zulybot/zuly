const { Database } = require('quickmongo'); const c = require('../config');

try {
	const dab = new Database(c.mongo);
	global.db = dab;
	console.log('[ZULY DATABASE] database connected'.green);
}
catch (e) {
	console.log(`[ERROR_STATUS_${e.code}] status code ${e.code}\nError: ${e}`.red);
}
