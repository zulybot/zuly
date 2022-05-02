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

		const money = await global.zuly.db.get(`money-${user.id}`) || Number(0);

		const num1 = Number(money).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

		const embed = new ctx.embed();
		embed.setTitle(`💸 Banco | ${global.zuly.user.username}`);
		embed.setDescription(`>>> <:zu_info:911303533859590144> **${user.tag}**\n⤷ <:zu_cartera:970726859891417178> \`${user.id}\``);
		embed.addField(`❯ ${ctx.idioma.economy.carteira}`, `⤷ **${num1.toLocaleString()}**`, true);
		embed.setColor('#ffcbdb');
		embed.setThumbnail('https://i.imgur.com/VW4x1en.png');
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		ctx.message.channel.slashReply({
			embeds: [embed.get()]
		});
	}
};
