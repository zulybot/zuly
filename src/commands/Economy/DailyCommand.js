module.exports = class DailyCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: true
			},
			pt: {
				nome: 'daily',
				categoria: '💰 » Economia',
				desc: 'Pegue seu dinheiro diário.'
			},
			en: {
				nome: 'daily',
				categoria: '💰 » Economy',
				desc: 'take your daily money.'
			},
			aliases: ['diario'],
			run: this.run
		};
	}

	async run (ctx) {
		const timeout = 86400000;
		const moment = require('moment');
		const amount = Math.floor(Math.random() * 1500) + 500;
		const daily = await global.db.get(`daily-${ctx.message.author.id}`);
		if (daily !== null && timeout - (Date.now() - daily) > 0) {
			const tt = moment(timeout - (Date.now() - daily)).format('HH:mm:ss');
			ctx.send(`:x: ${ctx.message.author.mention} **|** Você já coletou sua recompensa diária hoje! Tente novamente em **${tt}**`);
		}
		else {
			ctx.send(`💸 ${ctx.message.author.mention} **|** Você recebeu **☕ ${amount} ryos**!`);
			const money = global.db.get(`ryos-${ctx.message.author.id}`);
			global.db.set(`ryos-${ctx.message.author.id}`, money + amount);
			global.db.set(`daily-${ctx.message.author.id}`, Date.now());
		 }
	}
};
