module.exports = class ResgatarCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'resgatar',
				categoria: '💰 » Economia',
				desc: 'Resgatar algum código válido na economia.'
			},
			en: {
				nome: 'resgatar',
				categoria: '💰 » Economy',
				desc: 'Redeem some valid code in the economy.'
			},
			fr: {
				nome: 'resgatar',
				categoria: '💰 » Économie',
				desc: 'Récupérer un code valide dans l\'économie.'
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
			options: [
				{
					type: 3,
					name: 'promo',
					description: 'The Promocode that will be redeemed',
					required: false
				}
			],
			aliases: ['reedem', 'promocode', 'resgatar-promocode', 'reedem-promocode', 'promocode-resgatar', 'pclaim', 'presgatar'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.noarg.replace('%p', ctx.prefix)}`
			});
		}
		const codigo = ctx.args[0].toUpperCase();
		const valor = await global.zuly.db.get(codigo);
		if (!valor) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.nocode}`
			});
		}
		else {
			const resgatado = await global.zuly.db.get(`${codigo}-${ctx.message.author.id}`);
			if (resgatado) {
				return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.resgatado}`);
			}
			else {
				const ryos = await global.zuly.db.get(`money-${ctx.message.author.id}`);
				await (!ryos ? global.zuly.db.set(`money-${ctx.message.author.id}`, Number(valor)) : global.zuly.db.add(`money-${ctx.message.author.id}`, Number(ryos) + Number(valor)));
				await global.zuly.db.set(`${codigo}-${ctx.message.author.id}`, true);
				const embed = new ctx.embed();
				embed.setTitle(`🎟️ Promocodes | ${global.zuly.user.username}`);
				embed.setDescription(`> ${ctx.idioma.economy.sucesso.replace('%p', codigo).replace('%v', valor)}`);
				embed.setColor('#ffcbdb');
				embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				return ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()]
				});
			}
		}
	}
};
