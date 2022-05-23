module.exports = class CalcCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'imgur',
				categoria: '🕰️ » Utilidades',
				desc: 'Encurta uma imagem usando o imgur.'
			},
			en: {
				nome: 'imgur',
				categoria: '🕰️ » Utility',
				desc: 'Shorten a link using imgur.'
			},
			fr: {
				nome: 'imgur',
				categoria: '🕰️ » Utilitaires',
				desc: 'Raccourcir un image en utilisant imgur.'
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
					name: 'image',
					description: 'The Image Link',
					required: true,
					name_localizations: {
						'pt-BR': 'imagem',
						'en-US': 'image',
						'fr': 'image'
					},
					description_localizations: {
						'pt-BR': 'Link da imagem.',
						'en-US': 'The image link.',
						'fr': 'Lien de l\'image.'
					}
				}
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		await global.zuly.imgur.upload({
			image: ctx.args[0]
		}).then(async (imgur) => {
			ctx.message.channel.slashReply({
				content: `🔗 ${ctx.message.author.mention} **|** <${imgur.data.link}>`
			});
		});
	}
};
