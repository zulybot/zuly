module.exports = class DailyCommand {
	constructor () {
		return {
			permissoes: {
				membro: [], // Permissoes que o usuario necessita
				bot: [], // Permissoes que o bot necessita
				dono: true // Se apenas nos devs podem usar o comando
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
		const daily = Math.floor(Math.random() * 80) + 18;

		const date = Date.now();

		const moneyUser = await global.db.get(`money-${ctx.id}`);

		const dailyTime = await global.db.get(`dailytime-${ctx.id}`);

		const timeout = 86400000;

		if (!moneyUser || !dailyTime) {
			global.db.set(`money-${ctx.id}`, daily);
			global.db.set(`dailytime-${ctx.id}`, date);

			ctx.message.channel.createMessage(`Você ganhou ${daily}`);
		}
		else if (dailyTime !== null && timeout - (date - dailyTime) > 0) {
			ctx.message.channel.createMessage('Você já pegou seu daily');
		}
		else {
			const totalMoney = await global.db.get(`money-${ctx.id}`);
			global.db.set(`money-${ctx.id}`, totalMoney + daily);
			global.db.set(`dailytime-${ctx.id}`, date);
		}
	}
};
