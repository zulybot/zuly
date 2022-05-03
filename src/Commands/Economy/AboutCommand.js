module.exports = class DailyCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'sobremim',
				categoria: '💰 » Economia',
				desc: 'Altera o seu "Sobre Mim" para alguma frase legal.'
			},
			en: {
				nome: 'aboutme',
				categoria: '💰 » Economy',
				desc: 'Change your "About Me" to some cool phrase.'
			},
			fr: {
				nome: 'surmoi',
				categoria: '💰 » Économie',
				desc: 'Change votre "À Propos de Moi" pour une phrase super cool.'
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
					name: 'about',
					description: 'Write your about me',
					required: true,
					name_localizations: {
						'pt-BR': 'sobremim',
						'en-US': 'aboutme',
						'fr': 'surmoi'
					},
					description_localizations: {
						'pt-BR': 'Escreva o seu "Sobre Mim"',
						'en-US': 'Write your "About Me"',
						'fr': 'Écrivez votre "À Propos de Moi"'
					}
				}
			],
			aliases: ['about', 'sobre', 'sobremim'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.sobre.nada}`
			});
		}
		global.zuly.db.set(`about-${ctx.message.author.id}`, ctx.args.join(' '));
		ctx.message.channel.slashReply({
			content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.sobre.alt.replace('%t', ctx.args.join(' ').replace(/`/g, ''))}`
		});
	}
};
