module.exports = class GuildDeleteEvent {
	constructor () {
		return {
			nome: 'guildDelete',
			run: this.run
		};
	}
	async run (guild) {
		const config = require('../Config/config');

		const system = require('../Config/system');

		const moment = require('moment');

		if (guild.preferredLocale !== 'pt-BR') {
			await global.zuly.db.set(`idioma-${guild.id}`, 'en-us');
		}

		const embed = new global.zuly.manager.Ebl();
		
		embed.addField(`🌎 GuildInfo | ${guild.name}`, `🧭 **ID:** \`${guild.id} [${guild.shard.id}]\`\n🔍 **Members:** \`${guild.memberCount} members\`\n<a:zu_booster:880862453712429098> **Boosts:** \`${guild.premiumSubscriptionCount} boosts\`\n:calendar: **Created at:** \`${moment(guild.createdAt).format('📆 DD/MM/YY')} | ${moment(guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Lang:** \`${guild.preferredLocale}\``);
		embed.setColor('#ff0000');
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

		const { WebhookClient } = require('discord.js');

		const hook = new WebhookClient({
			token: system.gdelete.token,
			id: system.gdelete.id,
		});

		await hook.send({
			avatarURL: global.zuly.user.displayAvatarURL(),
			username: global.zuly.user.username,
			embeds: [embed.get()]
		});
	}
};
