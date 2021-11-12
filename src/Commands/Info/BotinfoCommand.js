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

		const desenvolvedores = await global.db.get('devs');
		for (const desenvolvedor of desenvolvedores) {
			const dev = await global.zuly.getRESTUser(desenvolvedor);
			devs.push(dev.username);
		}

		const space = global.zuly.music.nodes.get('space');
		const galaxy = global.zuly.music.nodes.get('galaxy');

		cpuUsage(function(v) {
			const embed = new ctx.embed();
			embed.setTitle(`🤖 Botinfo | ${global.zuly.user.username}`);
			embed.setThumbnail(global.zuly.user.avatarURL);
			embed.setDescription(ctx.idioma.botinfo.texto.replace('%bot', global.zuly.user.username).replace('%g', global.zuly.guilds.size).replace('%devs', devs.join(', ')).replace('%u', global.zuly.guilds.reduce((acc, guild) => acc + guild.memberCount, 0).toLocaleString()));
			embed.addField(`<:zu_ram:889942152736555108> ${ctx.idioma.botinfo.recursos}`, `**Ram:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0) + 'mb'} / ${(os.totalmem() / 1024 / 1024).toFixed(0) + 'mb'}\n**CPU:** ${v.toFixed(2)}%\n**Uptime:** ${uptime}`);
			embed.addField('🎵 Lavalink:', `> **Space:**\n- **Ram:** ${global.zuly.bytes(space.stats.memory.used).value || 0}${global.zuly.bytes(space.stats.memory.used).unit || 'mb'}\n- **Uptime:** ${global.zuly.time2(space.stats.uptime) || 'Offline'}\n> **Galaxy:**\n- **Ram:** ${global.zuly.bytes(galaxy.stats.memory.used).value || 0}${global.zuly.bytes(galaxy.stats.memory.used).unit || 'mb'}\n- **Uptime:** ${global.zuly.time2(galaxy.stats.uptime || 'Offline')}`);
			embed.setColor('#ffcbdb');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			});
		});
	}
};
