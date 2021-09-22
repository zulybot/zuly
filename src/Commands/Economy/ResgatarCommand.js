module.exports = class ResgatarCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'resgatar',
				categoria: '💰 » Economia',
				desc: 'Pegue seu dinheiro diário.'
			},
			en: {
				nome: 'resgatar',
				categoria: '💰 » Economy',
				desc: 'Take your daily money.'
			},
			aliases: ['reedem', 'promocode', 'resgatar-promocode', 'reedem-promocode', 'promocode-resgatar', 'pclaim', 'presgatar'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.noarg.replace('%p', ctx.prefix)}`);
		const codigo = ctx.args[0].toUpperCase();
		const valor = await global.db.get(codigo);
		if (!codigo) {
			return ctx.send();
		}
		else {
			const resgatado = await global.db.get(`${codigo}-${ctx.message.author.id}`);
			if (resgatado) {
				return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.resgatado}`);
			}
			else {
				const ryos = await global.db.get(`ryos-${ctx.message.author.id}`);
				if (!ryos) {
					await global.db.set(`ryos-${ctx.message.author.id}`, Number(valor));
				}
				else {
					await global.db.set(`ryos-${ctx.message.author.id}`, eval(Number(ryos) + Number(valor)));
				}
				await global.db.set(`${codigo}-${ctx.message.author.id}`, true);
				const embed = new ctx.embed();
				embed.title(`🎟️ Promocodes | ${global.zuly.user.username}`);
				embed.description(`> ${ctx.idioma.economy.sucesso.replace('%p', codigo).replace('%v', valor)}`);
				embed.color('#ffcbdb');
				embed.thumbnail(global.zuly.user.avatarURL);
				return ctx.send(embed.create);
			}
		}
	}
};
