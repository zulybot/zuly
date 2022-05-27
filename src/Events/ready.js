module.exports = class ReadyEvent {
	constructor () {
		return {
			nome: 'ready',
			run: this.run
		};
	}
	async run () {
		// COMMAND HANDLER

		require('../Client/Handler/comandos');

		// FIRST STATUS UPDATE

		console.log(`[ZULY] ${global.zuly.user.username}#${global.zuly.user.discriminator} Ligada`.green);
		global.zuly.user.setActivity(`Starting | [v${global.zuly.version}]`, {
			game: global.zuly.user.username,
			type: 'STREAMING',
			url: 'https://www.twitch.tv/adg_ofc'
		});

		const adg = global.zuly.users.cache.get('717766639260532826') ? global.zuly.users.cache.get('717766639260532826') : await global.zuly.users.fetch('717766639260532826');
		const status = [`zulybot.xyz | ${global.zuly.user.username} [v${global.zuly.version}]`, `I'm on ${global.zuly.guilds.cache.size} servers | ${global.zuly.user.username} [v${global.zuly.version}]`, `Follow me on twitter @ZulyBot | ${global.zuly.user.username} [v${global.zuly.version}]`, `/help | ${global.zuly.user.username} [v${global.zuly.version}]`, `/upvote | ${global.zuly.user.username} [v${global.zuly.version}]`, `/invite | ${global.zuly.user.username} [v${global.zuly.version}]`, `Join in my support server discord.gg/pyyyJpw5QW | ${global.zuly.user.username} [v${global.zuly.version}]`, `I was created by: ${adg.username}#${adg.discriminator}`];
		// const presence = ['online', 'idle', 'dnd'];

		// STATUS UPDATE

		setInterval(() => {
			global.zuly.user.setActivity(status[Math.floor(Math.random() * status.length)], {
				game: status[Math.floor(Math.random() * status.length)],
				type: 'STREAMING',
				url: 'https://www.twitch.tv/adg_ofc'
			});
			global.gc();
		}, 30000);

		// GUILD BAN CHECK

		const guilds = await global.zuly.db.get('guilds');
		if (!guilds) {
			return global.zuly.db.set('guilds', []);
		}

		guilds.forEach(async (guildid) => {
			const system = require('../Config/system');
			const { WebhookClient } = require('discord.js');
			const hook = new WebhookClient({
				token: system.gcreate.token,
				id: system.gcreate.id,
			});
			const guild = await global.zuly.guilds.cache.get(guildid);
			if (guild) {
				try {
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
				catch (e) {
					await guild.leave();
					console.log(e);
				}
			}
		});

		// WEBSERVICES

		require('../Integrations/app');
	}
};
