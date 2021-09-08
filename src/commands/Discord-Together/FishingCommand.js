module.exports = class FishingCommand {
	constructor () {
		return {
			permissoes: {
				membro: [], // Permissoes que o usuario necessita
				bot: [], // Permissoes que o bot necessita
				dono: false // Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'fishing',
				categoria: '<:zu_discord:882305685650558996> » Discord-Together',
				desc: 'Jogue betrayal no discord'
			},
			en: {
				nome: 'fishing',
				categoria: '<:zu_discord:882305685650558996> » Discord-Together',
				desc: 'Play fishing on discord'
			},
			aliases: ['fishingtogether', 'fishing-together'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.message.member.voiceState.channelID) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.together.channel}`);
		global.zuly.discordTogether.createTogetherCode(ctx.message.member.voiceState.channelID, 'fishing').then(async invite => {
			return ctx.message.channel.createMessage(`🐟 ${ctx.message.author.mention} **|** ${ctx.idioma.together.done} ${invite.code} ${ctx.idioma.together.done2}`);
		});
	}
};

// ADG, Davi e LRD
