/* eslint-disable new-cap */
module.exports = class PingCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'messages',
				categoria: '🕰️ » Utilidades',
				desc: 'Veja as mensagens de algum usuário'
			},
			en: {
				nome: 'messages',
				categoria: '🕰️ » Utility',
				desc: 'See a user messages'
			},
			aliases: ['msg', 'msgs', 'mensagens'],
			run: this.run
		};
	}

	async run (ctx) {
		const user = ctx.args[0] ? ctx.message.mentions[0] || await global.zuly.getRESTUser(ctx.args[0]) : ctx.message.author;
		let valor;
		const mensagens = await global.db.get(`messages-${ctx.message.guildID}-${user.id}`);
		if (mensagens) {
			valor = mensagens;
		}
		else {
			valor = 0;
		}
		const embed = new ctx.embed();
		embed.title(`💬 ${ctx.idioma.messages.title}`);
		embed.color('#ffcbdb');
		embed.description(`**${user.username}** ${ctx.idioma.messages.tem} **${valor} ${ctx.idioma.messages.msg}**`);
		ctx.send(embed.create);
	}
};

// ADG, Davi e LRD
