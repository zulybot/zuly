module.exports = class DailyCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'balance',
				categoria: '💰 » Economia',
				desc: 'Pegue seu dinheiro diário.'
			},
			en: {
				nome: 'balance',
				categoria: '💰 » Economy',
				desc: 'take your daily money.'
			},
			aliases: ['bal', 'money'],
			run: this.run
		};
	}

	async run (ctx) {
		const user = ctx.args[0] ? ctx.message.mentions[0] || await global.zuly.getRESTUser(ctx.args[0]) : ctx.message.author;
		const ryos = await global.db.get(`ryos-${ctx.message.author.id}`) || 0;

		const embed = new ctx.embed();
		embed.title(`💰 Balance | ${global.zuly.user.username}`);
		embed.field(`<:zu_anime:882668160480849970> Ryos: __${user.username}#${user.discriminator}__`, `${ryos}`);
		embed.color('#ffcbdb');
		embed.thumbnail(global.zuly.user.avatarURL);
		ctx.send(embed.create);
	}
};
