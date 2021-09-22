const fs = require('fs');

fs.readdir('./src/Events/', (erro, eventos) => {
	eventos.forEach(async evento => {
		delete require.cache[evento];
		const ArquivoEvento = require(`../../Events/${evento}`);
		const Evento = evento.replace('.js', '');
		const event = new ArquivoEvento(global.zuly, ArquivoEvento.nome);
		// await global.zuly.events.set(event.nome, event)
		global.zuly[event.type || 'on'](event.nome, async (...args) => event.run(...args));
		console.log(`[EVENTOS] Evento ${Evento} carregado usando os argumentos (${event.nome}).`.brightBlue);
	});
});
