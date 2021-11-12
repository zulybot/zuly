'use strict';
Object.defineProperty(exports, '__esModule', {
	value: !0
}), exports.DJSSharderPoster = void 0;
const BasePoster_1 = require('./BasePoster');
class DJSSharderPoster extends BasePoster_1.BasePoster {
	constructor (e, t, r) {
		if (!e) throw new Error('Top.gg Tokeni Eksik');
		if (!t) throw new Error('Eksik client');
		if (!(t instanceof require('discord.js').ShardingManager)) throw new Error('Bir discord.js ShardingManager değil.');
		super(e, r), this.client = t, this._binder({
			clientReady: () => this.clientReady(),
			waitForReady: e => this.waitForReady(e),
			getStats: () => this.getStats()
		});
	}
	clientReady () {
		return this.client.shards.size > 0 && this.client.shards.every(e => e.ready);
	}
	waitForReady (e) {
		const t = r => {
			r.id === this.client.totalShards - 1 && (this.client.off('shardCreate', t), r.once('ready', () => {
				e();
			}));
		};
		this.client.on('shardCreate', t);
	}
	async getStats () {
		const e = await this.client.fetchClientValues('guilds.cache.size');
		return {
			serverCount: e.reduce((e, t) => e + t, 0),
			shardCount: e.length
		};
	}
}
exports.DJSSharderPoster = DJSSharderPoster;