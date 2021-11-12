'use strict';
Object.defineProperty(exports, '__esModule', {
	value: !0
}), exports.RosePoster = void 0;
const BasePoster_1 = require('./BasePoster');
class RosePoster extends BasePoster_1.BasePoster {
	constructor (e, t, s) {
		if (!e) throw new Error('Top.gg Token Eksik');
		if (!t) throw new Error('Eksik client');
		if (!(t instanceof require('discord-rose').Master)) throw new Error('Discord-Rose ustası değil.');
		super(e, s), this.client = t, this._binder({
			clientReady: () => this.clientReady(),
			waitForReady: e => this.waitForReady(e),
			getStats: () => this.getStats()
		});
	}
	async clientReady () {
		if (!this.client.spawned) return !1;
		return (await this.client.getStats()).every(e => e.shards.every(e => e.state === 2));
	}
	waitForReady (e) {
		this.client.once('READY', () => {
			e();
		});
	}
	async getStats () {
		return {
			serverCount: (await this.client.getStats()).reduce((e, t) => e + t.shards.reduce((e, t) => e + t.guilds, 0), 0),
			shardCount: this.client.options.shards
		};
	}
}
exports.RosePoster = RosePoster;