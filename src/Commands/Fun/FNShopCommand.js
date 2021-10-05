module.exports = class Nitro {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['attachFiles'],
				dono: false
			},
			pt: {
				nome: 'fnshop',
				categoria: '⭐ » Diversão',
				desc: 'Mostra a loja diária do fortnite'
			},
			en: {
				nome: 'fnshop',
				categoria: '⭐ » Fun',
				desc: 'Shows the Fortnite Daily Store'
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
			aliases: ['fnstore'],
			run: this.run
		};
	}

	async run (ctx) {
		const embed = new ctx.embed();
		embed.setColor('#ffcbdb');
		embed.setImage('https://fn.zulybot.xyz/shop-now.png');
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
		ctx.message.channel.createMessage({
			content: ctx.message.author.mention,
			embeds: [embed.get()]
		});
	}
};
// 𝖽