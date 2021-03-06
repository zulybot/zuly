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
				desc: 'Cria um promocode da economia.'
			},
			en: {
				nome: 'promocreate',
				categoria: '💻 » Dev',
				desc: 'Create an economy promocode.'
			},
			fr: {
				nome: 'promocreate',
				categoria: '💻 » Dev',
				desc: 'Créez un code promotionnel économique.'
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
					description: 'Name of the PROMOCODE',
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
				},
				{
					type: 3,
					name: 'valor',
					description: 'Valor do PROMOCODE',
					required: true,
					name_localizations: {
						'pt-BR': 'valor',
						'en-US': 'valor',
						'fr': 'valeur'
					},
					description_localizations: {
						'pt-BR': 'Valor do PROMOCODE',
						'en-US': 'Valor do PROMOCODE',
						'fr': 'Valeur du PROMOCODE'
					}
				}
			],
			aliases: ['pcreate', 'promocode-create', 'criar-promocode', 'criar-promo', 'pcriar'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0] || !ctx.args[1]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** Insira os 2 campos, \`${ctx.prefix}pcreate <NOME> <VALOR EM RYOS>\``,
				ephemeral: true
			});
		}
		if (isNaN(ctx.args[1])) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** O Valor não é um número exato.`,
				ephemeral: true
			});
		}

		const code = await global.zuly.db.get(ctx.args[0].toUpperCase());
		if (code) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** Esse código já existe`,
				ephemeral: true
			});
		}
		else {
			await global.zuly.db.set(ctx.args[0].toUpperCase(), Number(ctx.args[1]));
			const channel = await global.zuly.channels.cache.get('894981159119896576');
			channel.send(`<:zu_ticket:890950181120507935> <@&894983704554930247> **|** Novo promocode: **${ctx.args[0].toUpperCase()}** valendo **${Number(ctx.args[1])} ryos.**`);
			return ctx.message.channel.slashReply({
				content: `✅ ${ctx.message.author.mention} **|** Promocode **${ctx.args[0].toUpperCase()}** criado com sucesso!`,
				ephemeral: true
			});
		}
	}
};
