module.exports = class ReadyEvent {
	constructor () {
		return {
			nome: 'ready',
			run: this.run
		};
	}
	async run () {
		const { CronJob } = require('cron');

		// COMMAND HANDLER

		require('../Client/Handler/comandos');

		// FIRST STATUS UPDATE

		console.log(`[ZULY] ${global.zuly.user.username}#${global.zuly.user.discriminator} Ligada`.green);
		global.zuly.user.setActivity(`Starting | [v${global.zuly.version}]`, {
			game: global.zuly.user.username,
			type: 'STREAMING',
			url: 'https://www.twitch.tv/adg_ofc'
		});

		const adg = await global.zuly.users.fetch('717766639260532826');
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

		new CronJob('0 */5 * * * *', async () => {
			const { get } = require('axios');
			await get('https://meme-api.herokuapp.com/gimme/dankmemes').then(async (res) => {
				const channel = global.zuly.channels.cache.get('968204686765211668');

				let idioma = require('../Config/idiomas');
				let lang = await global.zuly.db.get(`idioma-${channel.guild.id}`) || 'pt_br';
				lang = lang.replace(/-/g, '_');
				idioma = idioma[lang];

				const data = res.data;

				const embed = new global.zuly.manager.Ebl();

				if (idioma.lang === 'en') {
					embed.setTitle(data.title);
					embed.setUrl(data.postLink);
					embed.setImage(data.url);
				}
				else if (idioma.lang === 'pt') {
					const translate = require('@vitalets/google-translate-api');
					const title = await translate(data.title, { to: 'pt' });
					embed.setTitle(title.text);
					embed.setUrl(data.postLink);
					embed.setImage(data.url);
				}
				else if (idioma.lang === 'fr') {
					const translate = require('@vitalets/google-translate-api');
					const title = await translate(data.title, { to: 'fr' });
					embed.setTitle(title.text);
					embed.setUrl(data.postLink);
					embed.setImage(data.url);
				}
				embed.setColor('#ffcbdb');
				embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				channel.send({
					embeds: [embed.get()]
				});
			});
		}).start();

		// WEBSERVICES

		require('../Integrations/app');
	}
};
