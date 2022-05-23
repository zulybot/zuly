module.exports = class MessageUpdateEvent {
	constructor () {
		return {
			nome: 'messageDeleteBulk',
			run: this.run
		};
	}
	async run (messages) {
		const message = messages.first();
		if (!message.content) return;

		const logs = await global.zuly.db.get(`logs-${message.guild.id}`) || '927209681754132530';
		const channel = await global.zuly.channels.cache.get(logs);

		let webhook = await channel.fetchWebhooks();
		webhook = webhook.find((x) => x.name === `${global.zuly.user.username} | Logs`);

		if (!webhook) {
			webhook = await channel.createWebhook(`${global.zuly.user.username} | Logs`, {
				avatar: global.zuly.user.displayAvatarURL({ dynamic: true, size: 4096 })
			});
		}

		let idioma = require('../Config/idiomas');
		let lang = await global.zuly.db.get(`idioma-${message.guild.id}`) || 'pt_br';
		lang = lang.replace(/-/g, '_');
		idioma = idioma[lang];

		let humanLog = '- ' + idioma.logs.bulkDelete.replace('%n', messages.size).replace('%c', message.channel.name).replace('%id', message.channel.id);

		const moment = require('moment');

		for (const message of [...messages.values()].reverse()) {
			humanLog += `\r\n[${moment(messages.createdAt).format('MMMM Do YYYY, h:mm:ss a')}] ${message.author?.tag ?? 'Unknown'} (${message.id})`;
			humanLog += ' : ' + message.content;
		}

		const { MessageAttachment } = require('discord.js');
		const attachment = new MessageAttachment(Buffer.from(humanLog, 'utf-8'), 'deleted.txt');

		webhook.send({
			files: [attachment],
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							label: global.zuly.user.username,
							style: 5,
							url: 'https://zulybot.xyz',
							disabled: false
						}
					]
				}
			],
			username: global.zuly.user.username,
			avatarURL: global.zuly.user.displayAvatarURL({ dynamic: true, size: 4096 })
		});
	}
};
