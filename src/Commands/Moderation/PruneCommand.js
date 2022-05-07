module.exports = class PruneCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['MANAGE_MESSAGES'],
				bot: ['MANAGE_MESSAGES'],
				dono: false
			},
			pt: {
				nome: 'prune',
				categoria: '🛡️ » Moderação',
				desc: 'Limpe as mensagens de algum canal.'
			},
			en: {
				nome: 'prune',
				categoria: '🛡️ » Moderation',
				desc: 'Clear messages from any channel.'
			},
			fr: {
				nome: 'prune',
				categoria: '🛡️ » Modération',
				desc: 'Nettoyer les messages d\'un canal.'
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
					name: 'messages',
					description: 'The Number of messages to be cleared',
					required: true,
					name_localizations: {
						'pt-BR': 'mensagens',
						'en-US': 'messages',
						'fr': 'messages'
					},
					description_localizations: {
						'pt-BR': 'Número de mensagens a serem limpas',
						'en-US': 'The Number of messages to be cleared',
						'fr': 'Le nombre de messages à nettoyer'
					}
				}
			],
			aliases: ['clear', 'c', 'purge', 'clean', 'limpar', 'bulkdelete'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.clear.no}.`
			});
		}
		// ctx.message.delete()
		if (Number(ctx.args[0]) > 100 || Number(ctx.args[0]) < 2) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.clear.num}.`
			});
		}
		const ids = [];

		const messages = await ctx.message.channel.messages.fetch({
			limit: Number(ctx.args[0])
		});

		messages.forEach((m) => {
			ids.push(m.id);
		});

		ctx.message.channel.slashReply({
			content: `:white_check_mark: ${ctx.message.author.mention} **|** **${ctx.args[0]} ${ctx.idioma.clear.msg}.`
		}).then(() => {
			ctx.message.channel.bulkDelete(ids).catch(async (e) => {
				console.log(e);
			});
		});
	}
};

// ADG, Davi e LRD
