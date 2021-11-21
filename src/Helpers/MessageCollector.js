/**
 * Creates Message Reaction
 * @param {Channel} channel
 * @param {{
 *     channel: Channel,
 *     max: number,
 *     user: User,
 *     time: number,
 *     ignoreBots: boolean,
 *     stopOnCollect: boolean,
 *     accept: {
 *         deletedMessages: boolean,
 *         editedMessages: boolean
 *     },
 *     rules: {
 *         include: string,
 *         equal: string,
 *         start: string,
 *         end: string
 *     },
 * }} options
 */
const CollectorBase = require('./Collector.js');
module.exports = class MessageCollector extends CollectorBase {
	constructor (channel, options) {
		super(channel.client);
		this.options = {
			channel: options.channel ? options.channel : channel,
			max: options?.max ?? 1,
			user: options?.user,
			time: options?.time ?? 90000,
			ignoreBots: options?.ignoreBots ?? !0,
			stopOnCollect: !!options.stopOnCollect,
			accept: {
				deletedMessages: !!options.accept?.deletedMessages,
				editedMessages: !!options.accept?.editedMessages
			},
			rules: {
				include: options.rules?.includes,
				equal: options.rules?.equals,
				start: options.rules?.starts,
				end: options.rules?.ends
			}
		};
		this.on('collect', (m, c, u) => {
			this.collectedSize += 1;
			this.collected.push({
				message: m,
				content: c,
				user: u
			});
			if (this.options.stopOnCollect) {
				return this.stopAll();
			}
		});
		this.client.on('messageCreate', (message) => {
			this.collect(message);
		});
		if (this.options.accept.deletedMessages) {
			this.client.on('messageDelete', (message) => {
				this.collect(message);
			});
		}
		if (this.options.accept.editedMessages) {
			this.client.on('messageUpdate', (message) => {
				this.collect(message);
			});
		}
	}
	collect (message) {
		if (this.ended) return;
		if (this.collectedSize >= this.options.max) {
			return;
		}
		if (this.options.ignoreBots) {
			if (message.author.bot) return;
		}
		if (message.author.id !== this.options.user.idz || message.channel.id !== this.options.channel.id) {
			return null;
		}
		else if (this.options.rules) {
			const rules = this.options.rules;
			if (rules.equal) {
				if (message.content !== rules.equal) {
					return null;
				}
			}
			if (rules.include) {
				if (!message.content.includes(rules.include)) {
					return null;
				}
			}
			if (rules.start) {
				if (!message.content.startsWith(rules.start)) {
					return null;
				}
			}
			if (rules.end) {
				if (!message.content.endsWith(rules.end)) {
					return null;
				}
			}
			return this.emit('collect', message, message.content, message.author);
		}
		else {
			return this.emit('collect', message, message.content, message.author);
		}
	}
};