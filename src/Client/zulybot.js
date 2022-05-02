module.exports = class {
	constructor (e) {
		if (!e) throw new Error('Cade o client alek');
		
	}

	async iniciar (token) {
		return await this.client.login(token), 'zulybot';
	}

	async reload () {
		for(let cache in require.cache) {
			if (cache.includes('commands') || cache.includes('utils') || cache.includes('events')) delete require.cache[cache];
		  }

		  require('./Handler/comandos');

		  process.removeAllListeners();
		  global.zuly.removeAllListeners();
	}

	get exit () {
		return process.exit();
	}

	color (e) {
		if (typeof e === 'string') {
			if (e.toLowerCase() === 'random') return Math.floor(16777216 * Math.random());
			if (e.toLowerCase() === 'default') return 0;
			e = parseInt(e.replace('#', ''), 16);
		}
		else { Array.isArray(e) && (e = (e[0] << 16) + (e[1] << 8) + e[2]); }
		if (e < 0 || e > 16777215) throw new Error('A cor deve ser um código hex!');
		if (e && isNaN(e)) throw new Error('Não foi possível converter a cor para número :(');
		return e;
	}
};
