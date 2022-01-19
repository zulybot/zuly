module.exports = class BetrayalCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'betrayal',
				categoria: '<:zu_discord:882305685650558996> » Discord-Together',
				desc: 'Jogue betrayal no discord'
			},
			en: {
				nome: 'betrayal',
				categoria: '<:zu_discord:882305685650558996> » Discord-Together',
				desc: 'Play betrayal on discord'
			},
			fr: {
				nome: 'betrayal',
				categoria: '<:zu_discord:882305685650558996> » Discord-Together',
				desc: 'Jouer betrayal sur discord'
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
			options: [],
			aliases: ['betrayaltogether', 'betrayal-together'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.message.member.voiceState.channelID) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.together.channel}`
			});
		}
		global.zuly.discordTogether.createTogetherCode(ctx.message.member.voiceState.channelID, 'betrayal').then(async invite => {
			return ctx.message.channel.slashReply({
				content: `🔫 ${ctx.message.author.mention} **|** ${ctx.idioma.together.done} ${invite.code} ${ctx.idioma.together.done2}`
			});
		});
	}
};

// ADG, Davi e LRD
