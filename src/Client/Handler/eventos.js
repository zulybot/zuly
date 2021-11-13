const fs = require('fs');
fs.readdir('./src/Events/', (e, o) => {
	o.forEach(async e => {
		delete require.cache[e];
		const o = require(`../../Events/${e}`),
			n = e.replace('.js', ''),
			r = new o(global.zuly, o.nome);
		// await global.zuly.events.set(event.nome, event)
		global.zuly[r.type || 'on'](r.nome, async (...e) => r.run(...e)), console.log(`[EVENTOS] Evento ${n} carregado usando os argumentos (${r.nome}).`.brightBlue);
	});
});