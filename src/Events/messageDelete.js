module.exports = class MessageUpdateEvent {
	constructor () {
		return {
			nome: 'messageDelete',
			run: this.run
		};
	}
	async run (message) {
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

		const embed = new global.zuly.manager.Ebl();
		embed.setTitle(`${message.author.username}#${message.author.discriminator} | ${idioma.logs.message.title}`);
		embed.addField(`📝 ${idioma.logs.deleted}`, `\`\`\`${message.content}\`\`\``, true);
		embed.addField(`<:zu_logs_channel:910218450415255593> ${idioma.logs.channel}`, `<#${message.channel.id}> \`(${message.channel.name} [${message.channel.id}])\``);
		embed.addField(`<:zu_link:927212474573418517> ${idioma.logs.url}`, `${message.url}`);
		embed.setColor('#FF0000');
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
							url: message.url,
							disabled: true
						}
					]
				}
			],
			username: global.zuly.user.username,
			avatarURL: global.zuly.user.displayAvatarURL({ dynamic: true, size: 4096 })
		});
	}
};
