/* eslint-disable no-unreachable-loop */
'use strict';
module.exports = class MessageEventCommand {
	constructor () {
		return {
			nome: 'messageDelete',
			run: this.run
		};
	}
	async run (message) {
		if (message.author.bot) return;
		let idioma = require('../Config/idiomas');
		let lang = await global.db.get(`idioma-${message.guildID}`) || 'pt_br';
		lang = lang.replace(/-/g, '_');
		idioma = idioma[lang];

		const canal = message.channel;

		const webhooks = await global.zuly.getChannelWebhooks(canal.id);

		const embed = new global.zuly.manager.Ebl();
		embed.setTitle(`${message.author.username}#${message.author.discriminator} | Message Log`);
		embed.setThumbnail(message.author.avatarURL);
		embed.addField(`📝 ${idioma.eventLog.fields.deletedMessage}`, message.content);
		embed.addField(`<:zu_logs_channel:910218450415255593> ${idioma.eventLog.channel}`, `<#${message.channel.id}> \`(${message.channel.name}) [${message.channel.id}]\``);
		embed.setColor('#ff0000');
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);

		if (!webhooks.length) {
			canal.createWebhook({
				avatar: global.zuly.user.avatarURL,
				name: global.zuly.user.username,
				reason: 'Zuly | EventLog'
			}).then(async (webhook) => {
				console.log(webhook);
				await global.zuly.executeWebhook(webhook.id, webhook.token, {
					username: global.zuly.user.username,
					avatarURL: global.zuly.user.avatarURL,
					embeds: [embed.get()]
				});
			});
		}
		else {
			for (const webhook of webhooks) {
				if (webhook.token) {
					await global.zuly.executeWebhook(webhook.id, webhook.token, {
						username: global.zuly.user.username,
						avatarURL: global.zuly.user.avatarURL,
						embeds: [embed.get()]
					});
					break;
				}
				else {
					await canal.createMessage({
						username: global.zuly.user.username,
						avatarURL: global.zuly.user.avatarURL,
						embeds: [embed.get()]
					});
					break;
				}
			}
		}
	}
};