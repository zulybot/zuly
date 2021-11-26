module.exports = class GuildCreate {
	constructor () {
		return {
			nome: 'guildDelete',
			run: this.run
		};
	}

	async run (guild) {
		if (!guild.name) return;
		const system = require('../Config/system.js');
		const ch = await global.zuly.getRESTChannel('880863493472022539');
		const ch2 = await global.zuly.getRESTChannel('902632703160094752');

		ch.edit({
			name: `🧭 → Servers [${global.zuly.guilds.size}]`
		});
		ch2.edit({
			name: `👤 → Users [${global.zuly.guilds.reduce((acc, guild) => acc + guild.memberCount, 0).toLocaleString()}]`
		});

		const moment = require('moment');
		const owner = await global.zuly.getRESTUser(guild.ownerID);

		const embed = new global.zuly.manager.Ebl();
		embed.setTitle(`<:zu_info:880812942713573396> GuildDelete | ${global.zuly.user.username}`),
		embed.setDescription('😭 Fui removida de um servidor, ah :(');
		embed.addField(`🌎 GuildInfo | ${guild.name}`, `🧭 **ID:** \`${guild.id} [${guild.shard.id}]\`\n👑 **Owner:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n🔍 **Members:** \`${guild.memberCount} members\`\n<a:zu_booster:880862453712429098> **Boosts:** \`${guild.premiumSubscriptionCount} boosts\`\n:calendar: **Created at:** \`${moment(guild.createdAt).format('📆 DD/MM/YY')} | ${moment(guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Lang:** \`${guild.preferredLocale}\``);
		embed.setColor('#ffcbdb');
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
		embed.setThumbnail(global.zuly.user.avatarURL);

		await global.zuly.executeWebhook(system.gdelete.id, system.gdelete.token, {
			avatarURL: global.zuly.user.avatarURL,
			username: global.zuly.user.username,
			embeds: [embed.get()]
		});

	}
};
