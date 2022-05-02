'use strict';

const BasePoster_1 = require('./BasePoster');
class DJSPoster extends BasePoster_1.BasePoster {
	constructor (e, t, s) {
		if (!e) throw new Error('Top.gg Tokeni Eksik');
		if (!t) throw new Error('Eksik client');
		if (!(t instanceof require('discord.js').Client)) throw new Error('Bir discord.js client değil.');
		
	}

	clientReady () {
		return this.client.ws.status === 0;
	}

	waitForReady (e) {
		this.client.once('ready', () => {
			e();
		});
	}

	async getStats () {
		let e;
		return {
			serverCount: this.client.guilds.cache.size,
			shardId: (e = this.client.shard) === null || void 0 === e ? void 0 : e.ids[0],
			shardCount: this.client.options.shardCount || 1
		};
	}
}
exports.DJSPoster = DJSPoster;
