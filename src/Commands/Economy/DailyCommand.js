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
		const timeout = Number(86400000);
		const moment = require('moment');
		const daily = Number(Math.floor(Math.random() * 6500) + 1000);
		const dailytime = await global.zuly.db.get(`dailytime-${ctx.message.author.id}`);

		if (!dailytime) {
		  await global.zuly.db.set(`money-${ctx.message.author.id}`, Number(daily));
		  await global.zuly.db.set(`dailytime-${ctx.message.author.id}`, Number(Date.now()));

		  const embed = new ctx.embed();
		  embed.setTitle(`💸 Daily | ${global.zuly.user.username}`);
		  embed.setDescription(`🌟 **${ctx.message.author.username}** ${ctx.idioma.daily.coletado.replace('%m', Number(daily))}`);
		  embed.setColor('#ffcbdb');
		  embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		  embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

		  ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			});
		}
		else if (dailytime != null && timeout - (Date.now() - dailytime) > 0) {
			const tt = moment(timeout - (Date.now() - dailytime)).format('HH:mm:ss');

			const embed = new ctx.embed();
			embed.setTitle(`💸 Daily | ${global.zuly.user.username}`);
			embed.setDescription(`<:zu_info:911303533859590144> **${ctx.message.author.username}** ${ctx.idioma.daily.coletou.replace('%time', tt)}.`);
			embed.setColor('#ffcbdb');
			embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			});
		  }
		else {
			const q = await global.zuly.db.get(`money-${ctx.message.author.id}`);
			await global.zuly.db.set(`money-${ctx.message.author.id}`, Number(daily + q));
			await global.zuly.db.set(`dailytime-${ctx.message.author.id}`, Number(Date.now()));
			await global.zuly.db.set(`banco-${ctx.message.author.id}`, Number(0));

			const embed = new ctx.embed();
			embed.setTitle(`💸 Daily | ${global.zuly.user.username}`);
			embed.setDescription(`🌟 **${ctx.message.author.username}** ${ctx.idioma.daily.coletado.replace('%m', Number(daily))}`);
			embed.setColor('#ffcbdb');
			embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			});
		  }
	}
};
