const CollectorBase = require('./Collector.js');
module.exports = class extends CollectorBase {
	constructor (e, t) {
		super(e.channel.client), this.options = {
			time: t.time ? t.time : 9e4,
			emoji: t.emoji ? t.emoji : null,
			user: t.user ? t.user : null,
			message: t.message ? t.message : e,
			max: t.max ? t.max : 5,
			ignoreBots: !t.ignoreBots || t.ignoreBots,
			acceptReactionRemove: !!t.acceptDeletedMessage,
			stopOnCollect: !!t.stopOnCollect
		}, this.createTimeout(this.options.time), this.client.on('messageReactionAdd', (e, t, o) => this.collect(e, t, o)), this.options.acceptReactionRemove && this.client.on('messageReactionRemove', (e, t, o) => this.collect(e, t, o)), this.on('collect', (e, t, o) => {
			if (this.collectedSize += 1, this.collected.push({
				message: e,
				emoji: t,
				reactor: o
			}), this.options.stopOnCollect) return this.stopAll();
		});
	}
	collect (e, t, o) {
		if (!(this.ended || o.user.bot && this.options.ignoreBots)) {
			if (e.id !== this.options.message.id || o.id !== this.options.user.id) return null;
			if (t === this.options.emoji) return this.emit('collect', e, t, o);
			if (t.name !== this.options.emoji) {
				if (t.id !== this.options.emoji) return null;
			}
			else {this.emit('collect', e, t, o);};
		}
	}
};