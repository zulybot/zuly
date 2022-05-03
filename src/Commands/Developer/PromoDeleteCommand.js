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
				desc: 'Deleta um promocode da economia'
			},
			en: {
				nome: 'promodelete',
				categoria: '💻 » Dev',
				desc: 'Delete an economy promocode'
			},
			fr: {
				nome: 'promodelete',
				categoria: '💻 » Dev',
				desc: 'Supprimer un code promotionnel économique.'
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
					required: true,
					name_localizations: {
						'pt-BR': 'nome',
						'en-US': 'name',
						'fr': 'nom'
					},
					description_localizations: {
						'pt-BR': 'Nome do PROMOCODE',
						'en-US': 'Name of the PROMOCODE',
						'fr': 'Nom du PROMOCODE'
					}
				}
			],
			aliases: ['pdelete', 'promocode-delete', 'deletar-promocode', 'deletar-promo', 'pdeletar'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** Insira os 2 campos, \`${ctx.prefix}pcreate <NOME>\``);

		const code = await global.zuly.db.get(ctx.args[0].toUpperCase());
		if (!code) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** Esse código não existe`,
				ephemeral: true
			});
		}
		else {
			await global.zuly.db.delete(ctx.args[0].toUpperCase());
			const channel = await global.zuly.channels.cache.get('894981159119896576');
			channel.send(`<:zu_ticket:890950181120507935> <@&894983704554930247> **|** Promocode: **${ctx.args[0].toUpperCase()}** ficou invalido.`);
			return ctx.message.channel.slashReply({
				content: `✅ ${ctx.message.author.mention} **|** Promocode **${ctx.args[0].toUpperCase()}** deletado com sucesso!`,
				ephemeral: true
			});
		}
	}
};
