module.exports = class GivawayStart {
	constructor () {
		return {
			permissoes: {
				membro: ['manageGuild'],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'giveaway-end',
				categoria: '🎁 » Giveaway',
				desc: 'Finaliza um sorteio'
			},
			en: {
				nome: 'giveaway-end',
				categoria: '🎁 » Giveaway',
				desc: 'End a giveaway'
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
					name: 'id',
					description: 'The ID of the giveaway.',
					required: true
				},
			],
			aliases: ['gstart', 'gsetup', 'sorteio-start', 'sorteio-iniciar'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.giveaway.end.replace('%p', ctx.prefix)}`
			});
		}
		ctx.message.channel.slashReply({
			content: `🎁 ${ctx.message.author.mention} **|** Sucess!`
		});
		global.zuly.giveawaysManager.end(ctx.args[0]);
	}
};