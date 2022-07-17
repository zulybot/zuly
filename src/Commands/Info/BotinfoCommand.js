module.exports = class BotinfoCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'bot',
				categoria: '📖 » Informação',
				desc: 'Veja as informações do bot.'
			},
			en: {
				nome: 'bot',
				categoria: '📖 » Information',
				desc: 'See bot information.'
			},
			fr: {
				nome: 'bot',
				categoria: '📖 » Information',
				desc: 'Voir les informations du bot.'
			},
			/*
			SUB_COMMAND	1 = SubCommand
			SUB_COMMAND_GROUP: 2 = SubCommandGroup
			STRING: 3 = String
			INTEGER: 4 = Any integer between -2^53 and 2^53
			BOOLEAN: 5 = True or False
			USER: 6 = User Mention
			CHANNEL: 7 = Includes all channel types + categories
			ROLE: 8 = Role Mention
			MENTIONABLE: 9 = Includes users and roles
			NUMBER: 10 = Any double between -2^53 and 2^53
			*/
			options: [
				{
					type: 1,
					name: 'info',
					description: 'See the bot information.',
					name_localizations: {
						'pt-BR': 'info',
						'en-US': 'info',
						'fr': 'info'
					},
					description_localizations: {
						'pt-BR': 'Veja as informações do bot.',
						'en-US': 'See the bot information.',
						'fr': 'Voir les informations du bot.'
					}
				},
				{
					type: 1,
					name: 'ping',
					description: 'See the bot ping.',
					name_localizations: {
						'pt-BR': 'ping',
						'en-US': 'ping',
						'fr': 'ping'
					},
					description_localizations: {
						'pt-BR': 'Veja o ping do bot.',
						'en-US': 'See the bot ping.',
						'fr': 'Voir le ping du bot.'
					}
				},
				{
					type: 1,
					name: 'dashboard',
					description: 'See the bot dashboard.',
					name_localizations: {
						'pt-BR': 'dashboard',
						'en-US': 'dashboard',
						'fr': 'dashboard'
					},
					description_localizations: {
						'pt-BR': 'Veja o dashboard do bot.',
						'en-US': 'See the bot dashboard.',
						'fr': 'Voir le dashboard du bot.'
					}
				}
			],
			aliases: ['bi', 'info', 'about'],
			run: this.run
		};
	}

	async run (ctx) {
		if (ctx.args[0] === 'info') {
			const os = require('os');
			const { cpuUsage } = require('../../CustomPackages/osUtils');
			const uptime = global.zuly.getBotUptime(ctx.idioma.lang);

			const devs = [];

			const desenvolvedores = await global.zuly.db.get('devs');
			for (const desenvolvedor of desenvolvedores) {
				const dev = global.zuly.users.cache.get(desenvolvedor) ? global.zuly.users.cache.get(desenvolvedor) : await global.zuly.users.fetch(desenvolvedor);
				devs.push(dev.username + '#' + dev.discriminator);
			}

			const totalUsers = global.zuly.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
			const totalGuilds = global.zuly.guilds.cache.size;

			cpuUsage(function(v) {
				const embed = new ctx.embed();
				embed.setTitle(`🤖 Botinfo | ${global.zuly.user.username}`);
				embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				embed.setDescription(ctx.idioma.botinfo.texto.replace('%bot', global.zuly.user.username).replace('%g', totalGuilds).replace('%devs', devs.join(', ')).replace('%u', totalUsers.toLocaleString().replace('.', ',')));
				embed.addField(`<:zu_ram:889942152736555108> ${ctx.idioma.botinfo.recursos}`, `**Ram:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0) + 'mb'} / ${(os.totalmem() / 1024 / 1024).toFixed(0) + 'mb'}\n**CPU:** ${v.toFixed(2)}%\n**Uptime:** ${uptime}`);
				embed.setColor('#ffcbdb');
				embed.setFooter(`⤷ zulybot.xyz, ${ctx.idioma.botinfo.mem.replace('%m', (process.memoryUsage().rss / 1024 / 1024 / totalGuilds).toFixed(2) + 'kb')}`, global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()],
					components: [
						{
							type: 1,
							components: [
								{
									type: 2,
									label: `${ctx.idioma.mention.labels.support}`,
									style: 5,
									url: 'https://discord.gg/8SA5sfyR7g'
								},
								{
									type: 2,
									label: `${ctx.idioma.mention.labels.invite}`,
									style: 5,
									url: 'https://discord.com/oauth2/authorize?client_id=' + global.zuly.user.id + '&scope=bot%20applications.commands&permissions=268823622'
								},
								{
									type: 2,
									label: `${ctx.idioma.mention.labels.website}`,
									style: 5,
									url: 'https://zulybot.xyz/'
								}
							]
						}
					]
				});
			});
		}
		else if (ctx.args[0] === 'ping') {
			const { cluster } = require('../../Config/config');
			const date = Date.now();
			await global.zuly.db.set('ping', Date.now()).then(async () => {
				await global.zuly.db.delete('ping');
				return ctx.message.channel.slashReply({
					content: `🏓 **|** ${ctx.message.author.mention} Pong!\n- **API Ping:** \`${global.zuly.ws.ping}ms\`\n- **Database:** \`${require('pretty-ms')(Date.now() - date)}\`\n- **Cluster:** \`(${cluster.id} ${cluster.nome})\``,
				});
			});
		}
		else if (ctx.args[0] === 'dashboard') {
			return ctx.message.channel.slashReply({
				content: `<:zu_download:890281922331291698> ${ctx.message.author.mention} **|** ${ctx.idioma.dashboard.replace('%g', ctx.message.guild.id)}`,
			});
		}
	}
};
