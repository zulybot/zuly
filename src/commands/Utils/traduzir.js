/* eslint-disable */

module.exports = class PingCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'translator',
				categoria: '🕰️ » Utilidades',
				desc: 'Veja as mensagens de algum usuário'
			},
			en: {
				nome: 'translator',
				categoria: '🕰️ » Utility',
				desc: 'See a user messages'
			},
			aliases: ['traduzir', 'tradutor'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.tradutor.text.replace('%', ctx.prefix)}`);
		if (!ctx.args[1]) {
			return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.tradutor.text.replace('%', ctx.prefix)}`);
		}
		const translate = require('@vitalets/google-translate-api');
		translate(ctx.args.slice(1).join(' '), { to: ctx.args[0] }).then(res => {
			ctx.send(`🌎 ${ctx.message.author.mention} **|** ` + '`' + res.text.replace(/`/g, '').replace(/@/g, '') + '`');
		});
	}
};
