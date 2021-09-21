const { Database } = require('quickmongo');
const { mongodb } = require('../Config/config');

try {
	const dab = new Database(mongodb);
	global.db = dab;
	console.log('[ZULY DATABASE] database connected'.green);
}
catch (e) {
	console.log(`[ZULY DATABASE] Status Code ${e.code}\nError: ${e}`.red);
}
