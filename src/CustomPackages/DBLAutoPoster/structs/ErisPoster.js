'use strict';
Object.defineProperty(exports, '__esModule', {
	value: !0
}), exports.ErisPoster = void 0;
const BasePoster_1 = require('./BasePoster');
class ErisPoster extends BasePoster_1.BasePoster {
	constructor (e, t, r) {
		if (!e) throw new Error('Top.gg Tokeni Eksik');
		if (!t) throw new Error('Eksik client');
		if (!(t instanceof require('eris').Client)) throw new Error('Eris client değil.');
		super(e, r), this.client = t, this._binder({
			clientReady: () => this.clientReady(),
			waitForReady: e => this.waitForReady(e),
			getStats: () => this.getStats()
		});
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
