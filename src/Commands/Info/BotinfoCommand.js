module.exports = class BotinfoCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'botinfo',
				categoria: '📖 » Informação',
				desc: 'Veja as informações do bot.'
			},
			en: {
				nome: 'botinfo',
				categoria: '📖 » Information',
				desc: 'See bot information.'
			},
			fr: {
				nome: 'botinfo',
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
			options: [],
			aliases: ['bi', 'info', 'about'],
			run: this.run
		};
	}

	async run (ctx) {
		// eslint-disable-next-line new-cap
		const os = require('os');
		const { cpuUsage } = require('../../CustomPackages/osUtils');
		const uptime = global.zuly.getBotUptime(ctx.idioma.lang);

		const devs = [];

		const desenvolvedores = await global.zuly.db.get('devs');
		for (const desenvolvedor of desenvolvedores) {
			const dev = await global.zuly.getRESTUser(desenvolvedor);
			devs.push(dev.username + '#' + dev.discriminator);
		}

		const totalUsers = global.zuly.guilds.reduce((acc, guild) => acc + guild.memberCount, 0);
		const totalGuilds = global.zuly.guilds.size;

		cpuUsage(function(v) {
			const embed = new ctx.embed();
			embed.setTitle(`🤖 Botinfo | ${global.zuly.user.username}`);
			embed.setThumbnail(global.zuly.user.avatarURL);
			embed.setDescription(ctx.idioma.botinfo.texto.replace('%bot', global.zuly.user.username).replace('%g', totalGuilds).replace('%devs', devs.join(', ')).replace('%u', totalUsers.toLocaleString().replace('.', ',')));
			embed.addField(`<:zu_ram:889942152736555108> ${ctx.idioma.botinfo.recursos}`, `**Ram:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0) + 'mb'} / ${(os.totalmem() / 1024 / 1024).toFixed(0) + 'mb'}\n**CPU:** ${v.toFixed(2)}%\n**Uptime:** ${uptime}`);
			embed.setColor('#ffcbdb');
			embed.setFooter(`⤷ zulybot.xyz, ${ctx.idioma.botinfo.mem.replace('%m', (process.memoryUsage().rss / 1024 / 1024 / totalGuilds).toFixed(2) + 'kb')}`, global.zuly.user.avatarURL);
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
								url: 'https://discord.gg/pyyyJpw5QW'
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
};
