module.exports = class DailyCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'daily',
				categoria: '💰 » Economia',
				desc: 'Pegue seu dinheiro diário.'
			},
			en: {
				nome: 'daily',
				categoria: '💰 » Economy',
				desc: 'Take your daily money.'
			},
			fr: {
				nome: 'daily',
				categoria: '💰 » Économie',
				desc: 'Prenez votre argent quotidien.'
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
			aliases: ['diario'],
			run: this.run
		};
	}

	async run (ctx) {
		const timeout = 86400000;
		const moment = require('moment');
		const quantia = Math.floor(Math.random() * 1500) + 500;
		let amount = quantia;
		const daily = await global.db.get(`daily-${ctx.message.author.id}`);
		const userPremium = await global.zuly.getPremium('doador', ctx.message.author.id);
		if (userPremium === true) {
			amount = Number(quantia) * 2;
		}
		if (daily !== null && timeout - (Date.now() - daily) > 0) {
			const tt = moment(timeout - (Date.now() - daily)).format('HH:mm:ss');
			ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.jacoletou} **${tt}**`
			});
		}
		else {
			ctx.message.channel.slashReply({
				content: `💸 ${ctx.message.author.mention} **|** ${ctx.idioma.economy.recebeu} **☕ ${amount} ryos**!`
			});
			const money = global.db.get(`ryos-${ctx.message.author.id}`);
			if (money) {
				await global.db.add(`ryos-${ctx.message.author.id}`, Number(money) + Number(amount));
			}
			else {
				await global.db.set(`ryos-${ctx.message.author.id}`, Number(amount));
			}
			await global.db.set(`daily-${ctx.message.author.id}`, Date.now());
		 }
	}
};
