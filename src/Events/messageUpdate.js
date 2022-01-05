'use strict';
module.exports = class MessageEventCommand {
	constructor () {
		return {
			nome: 'messageUpdate',
			run: this.run
		};
	}
	async run (newMessage, oldMessage) {
		const channelDB = await global.db.get(`logs-${newMessage.guildID}`) || '927209681754132530';
		const channel = await global.zuly.getRESTChannel(channelDB);
		if (newMessage.author.bot) return;
		if (newMessage.content === oldMessage.content) return;
		if (newMessage.author.id === global.zuly.user.id) return;

		const webhook = await global.zuly.getWebhook(channel);

		let idioma = require('../Config/idiomas');
		let lang = await global.db.get(`idioma-${newMessage.guildID}`) || 'pt_br';
		lang = lang.replace(/-/g, '_');
		idioma = idioma[lang];

		const embed = new global.zuly.manager.Ebl();
		embed.setTitle(`${newMessage.author.username}#${newMessage.author.discriminator} | ${idioma.logs.message.title}`);
		embed.addField(`📝 ${idioma.logs.oldMessage}`, `\`\`\`${oldMessage.content}\`\`\``, true);
		embed.addField(`📝 ${idioma.logs.newMessage}`, `\`\`\`${newMessage.content}\`\`\``, true);
		embed.addField(`<:zu_logs_channel:910218450415255593> ${idioma.logs.channel}`, `<#${newMessage.channel.id}> \`(${newMessage.channel.name} [${newMessage.channel.id}])\``);
		embed.addField(`<:zu_link:927212474573418517> ${idioma.logs.url}`, `${newMessage.jumpLink}`);
		embed.setColor('#FFFF00');
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
		try {
			await global.zuly.executeWebhook(webhook.id, webhook.token, {
				username: global.zuly.user.username,
				avatarURL: global.zuly.user.avatarURL,
				embeds: [embed.get()],
				components: [
					{
						type: 1,
						components: [
							{
								type: 2,
								label: idioma.logs.jump,
								style: 5,
								url: `${newMessage.jumpLink}`,
								disabled: false
							}
						]
					}
				]
			});
		}
		catch (e) {
			channel.createMessage({
				embeds: [embed.get()],
				components: [
					{
						type: 1,
						components: [
							{
								type: 2,
								label: idioma.logs.jump,
								style: 5,
								url: `${newMessage.jumpLink}`,
								disabled: false
							}
						]
					}
				]
			});
		}
	}
};
