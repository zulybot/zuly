module.exports = class CalcCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'encurtador',
				categoria: '🕰️ » Utilidades',
				desc: 'Encurta um link usando o bit.ly.'
			},
			en: {
				nome: 'shortener',
				categoria: '🕰️ » Utility',
				desc: 'Shorten a link using bit.ly.'
			},
			fr: {
				nome: 'raccourcisseur',
				categoria: '🕰️ » Utilitaires',
				desc: 'Raccourcir un lien en utilisant bit.ly.'
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
					name: 'link',
					description: 'The link to shorten.',
					required: true,
					name_localizations: {
						'pt-BR': 'link',
						'en-US': 'link',
						'fr': 'lien'
					},
					description_localizations: {
						'pt-BR': 'O link para encurtar.',
						'en-US': 'The link to shorten.',
						'fr': 'Le lien à raccourcir.'
					}
				}
			],
			aliases: ['av', 'user-avatar', 'ua', 'memberavatar', 'profileavatar'],
			run: this.run
		};
	}

	async run (ctx) {
		const api = require('../../API/keys');
		const { request } = require('axios');
		request({
			method: 'POST',
			url: 'https://api-ssl.bitly.com/v4/bitlinks',
			headers: {
				Authorization: `Bearer ${api.bit.ly}`,
				'Content-Type': 'application/json'
			},
			data: {
				domain: 'bit.ly',
				long_url: ctx.args[0]
			}
		}).then(async (response) => {
			ctx.message.channel.slashReply({
				content: `🔗 ${ctx.message.author.mention} **|** <${response.data.link}>`
			});
		});
	}
};
