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
				desc: 'Veja as informações do bot'
			},
			en: {
				nome: 'botinfo',
				categoria: '📖 » Information',
				desc: 'see bot info'
			},
			aliases: ['bi', 'info', 'about'],
			run: this.run
		};
	}

	async run (ctx) {
		// eslint-disable-next-line new-cap
		const os = require('os');
		const { cpuUsage } = require('os-utils');
		cpuUsage(function(v) {
			const embed = new ctx.embed();
			embed.title(`🤖 Botinfo | ${global.zuly.user.username}`);
			embed.thumbnail(global.zuly.user.avatarURL);
			embed.description(ctx.idioma.botinfo.texto.replace('%bot', global.zuly.user.username).replace('%g', global.zuly.guilds.size).replace('%u', global.zuly.guilds.reduce((acc, guild) => acc + guild.memberCount, 0)));
			embed.field('<:zu_ram:889942152736555108> Recursos:', `**Ram:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0) + 'mb'} / ${(os.totalmem() / 1024 / 1024).toFixed(0) + 'mb'}\n**CPU:** ${v}%`);
			embed.color('#ffcbdb');
			ctx.send(embed.create);
		});
	}
};
