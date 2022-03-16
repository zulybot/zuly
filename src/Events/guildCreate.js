module.exports = class GuildCreateEvent {
	constructor () {
		return {
			nome: 'guildCreate',
			run: this.run
		};
	}
	async run (guild) {
		const config = require('../Config/config');

		const system = require('../Config/system');

		const moment = require('moment');
		const ownerA = await guild.fetchOwner();
		const owner = ownerA.user;

		if (guild.preferredLocale !== 'pt-BR') {
			await global.zuly.db.set(`idioma-${guild.id}`, 'en-us');
		}

		const embed = new global.zuly.manager.Ebl();
		embed.setTitle(`<:zu_info:880812942713573396> GuildCreate | ${global.zuly.user.username}`),
		embed.setDescription(`> 😎 Fui adicionado a um servidor, yay! \`(Cluster ${config.cluster.id} (${config.cluster.nome}) | Shard ${guild.shard.id})\``);
		embed.addField(`🌎 GuildInfo | ${guild.name}`, `🧭 **ID:** \`${guild.id} [${guild.shard.id}]\`\n👑 **Owner:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n🔍 **Members:** \`${guild.memberCount} members\`\n<a:zu_booster:880862453712429098> **Boosts:** \`${guild.premiumSubscriptionCount} boosts\`\n:calendar: **Created at:** \`${moment(guild.createdAt).format('📆 DD/MM/YY')} | ${moment(guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Lang:** \`${guild.preferredLocale}\``);
		embed.setColor('#2ECC71');
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

		const { WebhookClient } = require('discord.js');

		const hook = new WebhookClient({
			token: system.gcreate.token,
			id: system.gcreate.id,
		});

		await hook.send({
			avatarURL: global.zuly.user.displayAvatarURL(),
			username: global.zuly.user.username,
			embeds: [embed.get()]
		});
	}
};
