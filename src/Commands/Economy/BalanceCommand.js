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
				desc: 'Mostra a quantia de dinheiro que você tem.'
			},
			en: {
				nome: 'balance',
				categoria: '💰 » Economy',
				desc: 'Shows the amount of money you have.'
			},
			fr: {
				nome: 'balance',
				categoria: '💰 » Économie',
				desc: 'Affiche le montant de l\'argent que vous avez.'
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
			aliases: ['bal', 'money'],
			run: this.run
		};
	}

	async run (ctx) {
		const user = ctx.args[0] ? ctx.message.mentions[0] || await global.zuly.getRESTUser(ctx.args[0]) : ctx.message.author;
		const ryos = await global.db.get(`ryos-${ctx.message.author.id}`) || 0;
		const embed = new ctx.embed();
		embed.setTitle(`💰 Balance | ${global.zuly.user.username}`);
		embed.addField(`<:zu_anime:882668160480849970> Ryos: __${user.username}#${user.discriminator}__`, `${ryos}`);
		embed.setColor('#ffcbdb');
		embed.setThumbnail(global.zuly.user.avatarURL);
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			embeds: [embed.get()]
		});
	}
};
