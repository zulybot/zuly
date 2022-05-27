module.exports = class MessageUpdateEvent {
	constructor () {
		return {
			nome: 'messageUpdate',
			run: this.run
		};
	}
	async run (oldMessage, newMessage) {
		if (newMessage.author.bot) return;
		if (oldMessage.content === newMessage.content) return;

		const logs = await global.zuly.db.get(`logs-${oldMessage.guild.id}`);
		if (!logs) return;
		const channel = await global.zuly.channels.cache.get(logs);

		let webhook = await channel.fetchWebhooks();
		webhook = webhook.find((x) => x.name === `${global.zuly.user.username} | Logs`);

		if (!webhook) {
			webhook = await channel.createWebhook(`${global.zuly.user.username} | Logs`, {
				avatar: global.zuly.user.displayAvatarURL({ dynamic: true, size: 4096 })
			});
		}

		let idioma = require('../Config/idiomas');
		let lang = await global.zuly.db.get(`idioma-${oldMessage.guild.id}`) || 'pt_br';
		lang = lang.replace(/-/g, '_');
		idioma = idioma[lang];

		const embed = new global.zuly.manager.Ebl();
		embed.setTitle(`${newMessage.author.username}#${newMessage.author.discriminator} | ${idioma.logs.message.title} [Edited]`);
		embed.addField(`📝 ${idioma.logs.oldMessage}`, `\`\`\`${oldMessage.content}\`\`\``, true);
		embed.addField(`📝 ${idioma.logs.newMessage}`, `\`\`\`${newMessage.content}\`\`\``, true);
		embed.addField(`<:zu_logs_channel:910218450415255593> ${idioma.logs.channel}`, `<#${newMessage.channel.id}> \`(${newMessage.channel.name} [${newMessage.channel.id}])\``);
		embed.addField(`<:zu_link:927212474573418517> ${idioma.logs.url}`, `${newMessage.url}`);
		embed.setColor('#12D900');
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		webhook.send({
			embeds: [embed.get()],
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							label: idioma.logs.jump,
							style: 5,
							url: newMessage.url,
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
