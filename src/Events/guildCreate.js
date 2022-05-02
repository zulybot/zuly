module.exports = class GuildCreateEvent {
	constructor () {
		return {
			nome: 'guildCreate',
			run: this.run
		};
	}
	async run (guild) {
		await global.zuly.db.set(`cache-${guild.id}`, {
			id: guild.id,
			name: guild.name,
			icon: guild.iconURL(),
			owner: guild.ownerID,
			members: guild.memberCount,
			boosts: guild.premiumSubscriptionCount,
		});
		const config = require('../Config/config');

		const system = require('../Config/system');

		const moment = require('moment');
		const ownerA = await guild.fetchOwner();
		const owner = ownerA.user;

		if (guild.preferredLocale !== 'pt-BR') {
			await global.zuly.db.set(`idioma-${guild.id}`, 'en-us');
		}

		const embed = new global.zuly.manager.Ebl();
		
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

		const guilda = await global.zuly.db.get(`guildban-${guild.id}`);

		if (guilda) {
			try {
				await hook.send({
					avatarURL: global.zuly.user.displayAvatarURL(),
					username: global.zuly.user.username,
					content: `✅ **|** Fui adicionada no servidor \`${guild.name}\` (\`${guild.id}\`) porém o servidor está banido.\n>>> <:zu_info:911303533859590144> **Motivo:** ${guilda}`
				});
				try {
					const canal = await guild.channels.cache.random();
					canal.send(`✅ **|** Fui adicionada no servidor \`${guild.name}\` porém o servidor está banido.\n↳ Caso ache que seja um erro, entre em meu suporte: https://discord.gg/pyyyJpw5QW\n>>> <:zu_info:911303533859590144> **Motivo:** ${guilda}`).then(async () => {
						await guild.leave();
					});
				}
				catch (e) {
					await guild.leave();
					console.log(e);
				}
			}
			catch (e) {
				console.log(e);
			}
		}
	}
};
