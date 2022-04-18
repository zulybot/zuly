module.exports = class ReadyEvent {
	constructor () {
		return {
			nome: 'ready',
			run: this.run
		};
	}
	async run () {
		// Carregando Handler
		require('../Client/Handler/comandos');
		// Mostrando que o bot está ligado.
		console.log(`[ZULY] ${global.zuly.user.username}#${global.zuly.user.discriminator} Ligada`.green);
		global.zuly.user.setActivity(global.zuly.user.username, {
			game: global.zuly.user.username,
			type: 5
		});

		const adg = await global.zuly.users.fetch('726449359167684734');
		const status = [`zulybot.xyz | ${global.zuly.user.username} [v${global.zuly.version}]`, `I'm on ${global.zuly.guilds.cache.size} servers | ${global.zuly.user.username} [v$global.zuly.version]`, `Follow me on twitter @ZulyBot | ${global.zuly.user.username} [v$global.zuly.version]`, `/help | ${global.zuly.user.username} [v$global.zuly.version]`, `/upvote | ${global.zuly.user.username} [v$global.zuly.version]`, `/invite | ${global.zuly.user.username} [v$global.zuly.version]`, `Join in my support server discord.gg/pyyyJpw5QW | ${global.zuly.user.username} [v$global.zuly.version]`, `I was created by: ${adg.username}#${adg.discriminator}`];
		const presence = ['online', 'idle', 'dnd'];

		setInterval(async () => {
			global.zuly.user.setStatus(presence[Math.floor(Math.random() * presence.length)]);
			global.zuly.user.setActivity(status[Math.floor(Math.random() * status.length)], {
				game: status[Math.floor(Math.random() * status.length)],
				type: 5
			});
		}, 1000 * 180);

		const guilds = await global.zuly.db.get('guilds');
		guilds.forEach(async (guildid) => {
			const system = require('../Config/system');
			const { WebhookClient } = require('discord.js');
			const hook = new WebhookClient({
				token: system.gcreate.token,
				id: system.gcreate.id,
			});
			const guild = await global.zuly.guilds.cache.get(guildid);
			if (guild) {
				const guilda = await global.zuly.db.get(`guildban-${guild.id}`);
				await hook.send({
					avatarURL: global.zuly.user.displayAvatarURL(),
					username: global.zuly.user.username,
					content: `✅ **|** Fui adicionada no servidor \`${guild.name}\` (\`${guild.id}\`) porém o servidor está banido.\n>>> <:zu_info:911303533859590144> **Motivo:** ${guilda}`
				});
				const canal = await guild.channels.cache.random();
				canal.send(`✅ **|** Fui adicionada no servidor \`${guild.name}\` porém o servidor está banido.\n↳ Caso ache que seja um erro, entre em meu suporte: https://discord.gg/pyyyJpw5QW\n>>> <:zu_info:911303533859590144> **Motivo:** ${guilda}`).then(async () => {
					await guild.leave();
				});
			}
		});

		require('../Integrations/app');
	}
};
