module.exports = class EvalCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: true
			},
			pt: {
				nome: 'promodelete',
				categoria: '💻 » Dev',
				desc: 'dev'
			},
			en: {
				nome: 'promodelete',
				categoria: '💻 » Dev',
				desc: 'dev'
			},
			aliases: ['pdelete', 'promocode-delete', 'deletar-promocode', 'deletar-promo', 'pdeletar'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** Insira os 2 campos, \`${ctx.prefix}pcreate <NOME>\``);

		const code = await global.db.get(ctx.args[0].toUpperCase());
		if (!code) {
			return ctx.send(`:x: ${ctx.message.author.mention} **|** Esse código não existe`);
		}
		else {
			await global.db.delete(ctx.args[0].toUpperCase());
			return ctx.send(`✅ ${ctx.message.author.mention} **|** Promocode **${ctx.args[0].toUpperCase()}** deletado com sucesso!`);
		}
	}
};
