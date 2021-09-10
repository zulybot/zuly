module.exports = class GiveawayEnd {
	constructor () {
		return {
			permissoes: {
				membro: ['manageGuild'],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'giveaway-end',
				categoria: '<a:zu_wumpus:885918334183419945> » Giveaway',
				desc: 'Colocou o tempo errado? Encerre o sorteio com esse comando :)'
			},
			en: {
				nome: 'giveaway-end',
				categoria: '<a:zu_wumpus:885918334183419945> » Giveaway',
				desc: 'Did you put the wrong time? End the giveaway with this command :)'
			},
			aliases: ['gend', 'gstop', 'sorteio-end', 'sorteio-encerrar'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.giveaway.end.replace('%p', ctx.prefix)}`);
		global.zuly.giveawaysManager.end(ctx.args[0]);
	}
};
