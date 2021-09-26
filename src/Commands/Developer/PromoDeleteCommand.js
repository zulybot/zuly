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
					type: 3,
					name: 'name',
					description: 'Nome do PROMOCODE',
					required: false,
				},
			],
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
