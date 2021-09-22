module.exports = class EvalCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: true
			},
			pt: {
				nome: 'promocreate',
				categoria: '💻 » Dev',
				desc: 'dev'
			},
			en: {
				nome: 'promocreate',
				categoria: '💻 » Dev',
				desc: 'dev'
			},
			aliases: ['pcreate', 'promocode-create', 'criar-promocode', 'criar-promo', 'pcriar'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0] || !ctx.args[1]) return ctx.send(`:x: ${ctx.message.author.mention} **|** Insira os 2 campos, \`${ctx.prefix}pcreate <NOME> <VALOR EM RYOS>\``);
		if (isNaN(ctx.args[1])) return ctx.send(`:x: ${ctx.message.author.mention} **|** O Valor não é um número exato.`);

		const code = await global.db.get(ctx.args[0].toUpperCase());
		if (code) {
			return ctx.send(`:x: ${ctx.message.author.mention} **|** Esse código já existe`);
		}
		else {
			await global.db.set(ctx.args[0].toUpperCase(), Number(ctx.args[1]));
			return ctx.send(`✅ ${ctx.message.author.mention} **|** Promocode **${ctx.args[0].toUpperCase()}** criado com sucesso!`);
		}
	}
};
