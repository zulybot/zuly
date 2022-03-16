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
					description: 'See the bot information.'
				},
				{
					type: 1,
					name: 'ping',
					description: 'See the bot ping.'
				},
				{
					type: 1,
					name: 'dashboard',
					description: 'See the bot dashboard.'
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
				const dev = await global.zuly.users.fetch(desenvolvedor);
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
									label: `${ctx.idioma.labels.support}`,
									style: 5,
									url: 'https://discord.gg/pyyyJpw5QW'
								},
								{
									type: 2,
									label: `${ctx.idioma.labels.invite}`,
									style: 5,
									url: 'https://discord.com/oauth2/authorize?client_id=' + global.zuly.user.id + '&scope=bot%20applications.commands&permissions=268823622'
								},
								{
									type: 2,
									label: `${ctx.idioma.labels.website}`,
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
			const mongoose = require('mongoose');
			const date = Date.now();
			const pingDB = new Promise((r) =>
				mongoose.connection.db.admin().ping(() => r(Date.now() - date))
			);
			return ctx.message.channel.slashReply({
				content: `🏓 **|** ${ctx.message.author.mention} Pong!\n- **API Ping:** \`${global.zuly.ws.ping}ms\`\n- **Database:** \`${await pingDB}ms\`\n- **Cluster:** \`(${cluster.id} ${cluster.nome})\``,
			});
		}
		else if (ctx.args[0] === 'dashboard') {
			return ctx.message.channel.slashReply({
				content: `<:zu_download:890281922331291698> ${ctx.message.author.mention} **|** ${ctx.idioma.dashboard.replace('%g', ctx.message.guild.id)}`,
			});
		}
	}
};
