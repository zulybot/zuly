module.exports = class MessageCreateEvent {
	constructor () {
		return {
			nome: 'messageCreate',
			run: this.run
		};
	}
	async run (message) {
		const config = require('../Config/config.js');

		if (message.author.bot) return;
		if (!message.guild) return;

		const nqn = await global.zuly.db.get(`nqn-${message.guild.id}`);
		if (nqn) {
			await global.zuly.nqn(message);
		}

		let idioma = require('../Config/idiomas');
		let lang = await global.zuly.db.get(`idioma-${message.guild.id}`) || 'pt_br';
		lang = lang.replace(/-/g, '_');
		idioma = idioma[lang];

		const wait = require('node:timers/promises').setTimeout;

		if (message.mentions.members.size) {
			message.mentions.members.forEach(async (m) => {
				const afk = await global.zuly.db.get(`afk-${m.id}`);
				if (afk) {
					return message.channel.send(idioma.afk.mention.replace(
						'{{user}}', '**' + m.user.username + '**',
					).replace(
						'{{time}}',
						`<t:${afk.time}:R>`
					).replace(
						'{{status}}',
						afk.status
					)).then(async (m) => {
						await wait(3000);
						m.delete();
					});
				}
			});
		}

		const userAFK = await global.zuly.db.get(`afk-${message.author.id}`);
		if (userAFK) {
			return message.channel.send(idioma.afk.remove.replace(
				'{{user}}', '**' + message.author.username + '**',
			)).then(async (m) => {
				await global.zuly.db.delete(`afk-${message.author.id}`);
				await wait(3000);
				m.delete();
			});
		}

		const {
			get
		} = require('axios');
		await get('https://bad-domains.walshy.dev/domains.json').then(async (response) => {
			const domains = response.data;

			domains.push('https://dicsordgifts.ru.com/');
			domains.push('https://discorclgift.com/');

			for (const domain of domains) {
				if (message.content.includes(domain)) {
					if (message.content.includes('twitch.tv') || message.content.includes('discord.gift')) return;
					message.channel.send(`:x: ${message.author} **|** Este domínio foi bloqueado por ser suspeito de spam/phishing, caso acesse este site, você corre o risco de perder sua conta.`).then((msg) => {
						setTimeout(() => {
							msg.delete();
						}, 3000);
						message.delete();
					});
					break;
				}
			}
		});

		const mensagens = await global.zuly.db.get(`messages-${message.guild.id}-${message.author.id}`);
		await global.zuly.db.set(`messages-${message.guild.id}-${message.author.id}`, mensagens ? mensagens + 1 : 1);

		if (message.content === `<@${global.zuly.user.id}>` || message.content === `<@!${global.zuly.user.id}>`) {
			const embed = new global.zuly.manager.Ebl();
			embed.setAuthor(global.zuly.user.username, '', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			embed.setDescription(`👋 ${idioma.mention.hello.replace('%user', message.author)}\n> <:zu_info:911303533859590144> ${idioma.mention.about}\n> <:zu_slash:886681118470987967> ${idioma.mention.help}`);
			embed.setColor('#ffcbdb');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			message.channel.send({
				content: message.author.mention,
				embeds: [embed.get()],
				components: [
					{
						type: 1,
						components: [
							{
								type: 2,
								label: `${idioma.mention.labels.support}`,
								style: 5,
								url: 'https://discord.gg/pyyyJpw5QW'
							},
							{
								type: 2,
								label: `${idioma.mention.labels.invite}`,
								style: 5,
								url: 'https://discord.com/oauth2/authorize?client_id=' + global.zuly.user.id + '&scope=bot%20applications.commands&permissions=268823622'
							},
							{
								type: 2,
								label: `${idioma.mention.labels.website}`,
								style: 5,
								url: 'https://zulybot.xyz/'
							}
						]
					}
				]
			}).catch((e) => console.log(e));
		}

		const regexPrefix = new RegExp(`^(${config.prefix.map(prefix => prefix.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('|')}|<@!?${global.zuly.user.id}>)( )*`, 'gi');
		if (!message.content.match(regexPrefix)) return;
		const args = message.content.replace(regexPrefix, '').trim().split(/ +/g);
		const commandName = args.shift().toLowerCase();
		if (commandName === 'aprovar') {
			if (message.author.id !== '717766639260532826') return;
			if (!args[0]) return message.channel.send('Cadê o id do form?');
			const g = await global.zuly.db.get(args[0]);
			if (g) {
			  message.react('✅');
			  const user = await global.zuly.users.fetch(g);
			  const dm = await global.zuly.users.fetch(user.id);
			  dm.send(`✅ Sua denúncia com id: ||${args[0]}|| foi aprovada pela equipe da zulybot, obrigado e parabéns 🥳`).then(async () => {
					global.zuly.db.del(args[0]);
					const ch = await global.zuly.channels.cache.get('970320554550779974');
					ch.send(`__**✅ Denúncia Aprovada!**__\n\n- Autor: **${message.author.username}#${message.author.discriminator} (${message.author.id})**\n- ID do formulário: **${args[0]}**`);
			  });
			}
			else {
			  return message.channel.send(':x: Formulário não encontrado.');
			}
		  }
		const commandFile = global.zuly.commands.get(commandName) || global.zuly.aliases.get(commandName);
		if (!commandFile) return;

		const command = commandFile;

		if (!command || command) {
			const embed = new global.zuly.manager.Ebl();
			embed.setTitle(`<:zu_slash:886288977668243566> SlashCommands | ${global.zuly.user.username}`);
			embed.setDescription(`${message.author}, ${idioma.slash}`);
			embed.setColor('#ffcbdb');
			embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			message.channel.send({
				content: message.author.mention,
				embeds: [embed.get()]
			});
		}
	}
};
