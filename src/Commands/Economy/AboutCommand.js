module.exports = class DailyCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'sobremim',
				categoria: '💰 » Economia',
				desc: 'Veja seu perfil'
			},
			en: {
				nome: 'aboutme',
				categoria: '💰 » Economy',
				desc: 'See you profile'
			},
			aliases: ['about', 'sobre'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.sobre.nada}`);
		global.db.set(`about-${ctx.message.author.id}`, ctx.args.join(' '));
		ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.sobre.alt.replace('%t', ctx.args.join(' ').replace(/`/g, ''))}`);
	}
};