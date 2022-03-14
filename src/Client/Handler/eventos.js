const fs = require('fs');

global.zuly.events.clear();

fs.readdir('./src/Events/', (erro, eventos) => {
	eventos.forEach(async evento => {
		delete require.cache[evento];

		const ArquivoEvento = require(`../../Events/${evento}`);
		const Evento = evento.replace('.js', '');
		const event = new ArquivoEvento(global.zuly, ArquivoEvento.nome);
		await global.zuly.events.set(event.nome, event);
		try {
			global.zuly[event.type || 'on'](event.nome, async (...args) => event.run(...args));
		}
		catch (e) {
			console.log(`[ERRO] Evento ${event.nome} não pode ser executado.`);
			console.log(e);
		}
		console.log(`[EVENTOS] Evento ${Evento} carregado usando os argumentos (${event.nome}).`.brightBlue);
	});
});