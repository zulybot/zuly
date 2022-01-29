'use strict';
module.exports = class GuildBanCommand {
	constructor () {
		return {
			nome: 'guildBanAdd',
			run: this.run
		};
	}
	async run (guild, user) {
		const channelDB = await global.db.get(`logs-${guild.id}`) || '927209681754132530';
		const channel = await global.zuly.getRESTChannel(channelDB);

		const auditLog = await guild.getAuditLog({
			type: 22,
			limit: 1
		});

		const reason = auditLog.entries[0].reason;
		const target = auditLog.users[0];

		let idioma = require('../Config/idiomas');
		let lang = await global.db.get(`idioma-${guild.id}`) || 'pt_br';
		lang = lang.replace(/-/g, '_');
		idioma = idioma[lang];

		const embed = new global.zuly.manager.Ebl();
		embed.setTitle(`${guild.name} | ${idioma.logs.bans.title} [${idioma.logs.bani}]`);
		embed.addField(`📝 ${idioma.logs.reason}`, `\`\`\`${reason}\`\`\``, true);
		embed.addField(`<:zu_banCat:933106129871966228> ${idioma.logs.user}`, `<@${user.id}> \`(${user.username}#${user.discriminator} [${user.id}])\``);
		embed.addField(`<:zu_members:936975701322633256> ${idioma.logs.mod}`, `<@${target.id}> \`(${target.username}#${target.discriminator} [${target.id}])\``);
		embed.setColor('#E74C3C');
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
		channel.createMessage({
			embeds: [embed.get()]
		});
	}
};
