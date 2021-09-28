module.exports = class ZulybBot {
	constructor (client) {
		if (!client) throw new Error('Cade o client alek');
		this.client = client;
		this.canvas = require('canvas');
		this.Ebl = require('./EmbedBuilder').Embed;
	}

	async iniciar () {
		await this.client.connect();
		return 'zulybot';
	}

	async reload () {
		for (const cache in require.cache) {
			if (cache.includes('commands') || cache.includes('utils') || cache.includes('events')) delete require.cache[cache];
		}

		require('./Handler/comandos');

		process.removeAllListeners();
		global.zuly.removeAllListeners();
	}

	get exit () {
		return process.exit();
	}

	async fetch (url) {
		const {
			get
		} = require('axios');
		const {
			data
		} = await get(url);

		return data;
	}

	color (color) {
		if (typeof color === 'string') {
			if (color.toLowerCase() === 'random') return Math.floor(Math.random() * (0xffffff + 1));
			if (color.toLowerCase() === 'default') return 0;
			color = parseInt(color.replace('#', ''), 16);
		}
		else if (Array.isArray(color)) {
			color = (color[0] << 16) + (color[1] << 8) + color[2];
		}
		if (color < 0 || color > 0xffffff) throw new Error('A cor deve ser um código hex!');
		else if (color && isNaN(color)) throw new Error('Não foi possível converter a cor para número :(');
		return color;
	}
};

// LRD
