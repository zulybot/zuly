const CollectorBase = require('./Collector.js');
module.exports = class ReactionCollector extends CollectorBase {
	constructor (message, options) {
		super(message.channel.client);
		this.options = {
			time: options.time ? options.time : 90000,
			emoji: options.emoji ? options.emoji : null,
			user: options.user ? options.user : null,
			message: options.message ? options.message : message,
			max: options.max ? options.max : 5,
			ignoreBots: options.ignoreBots ? options.ignoreBots : !0,
			acceptReactionRemove: !!options.acceptDeletedMessage,
			stopOnCollect: !!options.stopOnCollect
		};
		this.createTimeout(this.options.time);
		this.client.on('messageReactionAdd', (message, emoji, reactor) => {
			return this.collect(message, emoji, reactor);
		});
		if (this.options.acceptReactionRemove) {
			this.client.on('messageReactionRemove', (message, emoji, reactor) => {
				return this.collect(message, emoji, reactor);
			});
		}
		this.on('collect', (m, e, r) => {
			this.collectedSize += 1;
			this.collected.push({
				message: m,
				emoji: e,
				reactor: r
			});
			if (this.options.stopOnCollect) {
				return this.stopAll();
			}
		});
	}
	collect (message, emoji, reactor) {
		if (this.ended) return;
		if (reactor.user.bot) {
			if (this.options.ignoreBots) {
				return;
			}
		}
		if (message.id !== this.options.message.id || reactor.id !== this.options.user.id) {
			return null;
		}
		else if (emoji === this.options.emoji) {
			return this.emit('collect', message, emoji, reactor);
		}
		else if (emoji.name !== this.options.emoji) {
			if (emoji.id !== this.options.emoji) {
				return null;
			}
		}
		else {
			this.emit('collect', message, emoji, reactor);
		}
	}
};