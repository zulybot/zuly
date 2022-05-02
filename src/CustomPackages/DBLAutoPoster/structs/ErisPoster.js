'use strict';

const BasePoster_1 = require('./BasePoster');
class ErisPoster extends BasePoster_1.BasePoster {
	constructor (e, t, r) {
		if (!e) throw new Error('Top.gg Tokeni Eksik');
		if (!t) throw new Error('Eksik client');
		if (!(t instanceof require('eris').Client)) throw new Error('Eris client değil.');
		
	}

	clientReady () {
		return this.client.ready;
	}

	waitForReady (e) {
		this.client.once('ready', () => {
			e();
		});
	}

	async getStats () {
		return {
			serverCount: this.client.guilds.size,
			shardCount: this.client.options.maxShards
		};
	}
}
exports.ErisPoster = ErisPoster;
