module.exports = class GivawayStart {
	constructor () {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD'],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'giveaway-reroll',
				categoria: '🎁 » Giveaway',
				desc: 'Resorteia um sorteio'
			},
			en: {
				nome: 'giveaway-reroll',
				categoria: '🎁 » Giveaway',
				desc: 'Reroll a giveaway'
			},
			fr: {
				nome: 'giveaway-reroll',
				categoria: '🎁 » Giveaway',
				desc: 'Relance un giveaway'
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
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.giveaway.reroll.replace('%p', ctx.prefix)}`
			});
		}
		ctx.message.channel.slashReply({
			content: `🎁 ${ctx.message.author.mention} **|** Sucess!`
		});
		global.zuly.giveawaysManager.reroll(ctx.args[0], {
			messages: {
				congrat: '🎁 ' + ctx.idioma.giveaway.reroll,
				error: ctx.idioma.giveaway.err
			}
		});
	}
};