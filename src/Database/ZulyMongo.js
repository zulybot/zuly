const { mongodb } = require('../Config/config');
const { connect } = require('mongoose');

try {
	connect(mongodb);
	console.log('[MONGO] Conectada com sucesso!'.green);
}
catch (e) {
	console.log('[MONGO] Desconectada com erro!'.green);
}