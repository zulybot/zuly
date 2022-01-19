module.exports = class PruneCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['manageMessages'],
				bot: ['manageMessages'],
				dono: false
			},
			pt: {
				nome: 'prune',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderação',
				desc: 'Limpe as mensagens de algum canal.'
			},
			en: {
				nome: 'prune',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderation',
				desc: 'Clear messages from any channel.'
			},
			fr: {
				nome: 'prune',
				categoria: '<:zu_certifiedmod:885193463111483412> » Modération',
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
					required: false
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
		if (Number(ctx.args[0]) > 2000 || Number(ctx.args[0]) < 2) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.clear.num}.`
			});
		}
		const ids = [];
		const messages = await ctx.message.channel.getMessages(Number(ctx.args[0]) + 1);

		messages.forEach((m) => {
			ids.push(m.id);
		});

		ctx.message.channel.deleteMessages(ids);
		ctx.message.channel.slashReply({
			content: `:white_check_mark: ${ctx.message.author.mention} **|** **${ctx.args[0]} ${ctx.idioma.clear.msg}.`
		});
	}
};

// ADG, Davi e LRD
