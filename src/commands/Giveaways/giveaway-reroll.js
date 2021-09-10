module.exports = class GiveawayReroll {
	constructor () {
		return {
			permissoes: {
				membro: ['manageGuild'],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'giveaway-reroll',
				categoria: '<a:zu_wumpus:885918334183419945> » Giveaway',
				desc: 'Colocou o tempo errado? Encerre o sorteio com esse comando :)'
			},
			en: {
				nome: 'giveaway-reroll',
				categoria: '<a:zu_wumpus:885918334183419945> » Giveaway',
				desc: 'Did you put the wrong time? End the giveaway with this command :)'
			},
			aliases: ['greroll', 'gresortear', 'sorteio-reroll'],
			run: this.run
		};
	}
	async run (ctx) {
		if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.giveaway.reroll.replace('%p', ctx.prefix)}`);
		global.zuly.giveawaysManager.reroll(ctx.args[0], {
			messages: {
				congrat: '🎁 ' + ctx.idioma.giveaway.reroll,
				error: ctx.idioma.giveaway.err
			}
		});
	}
};
