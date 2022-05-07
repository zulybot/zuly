/* eslint-disable */

module.exports = class PingCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'traduzir',
				categoria: '🕰️ » Utilidades',
				desc: 'Traduza mensagens para algum idioma.'
			},
			en: {
				nome: 'translator',
				categoria: '🕰️ » Utility',
				desc: 'Translate messages to any language.'
			},
			fr: {
				nome: 'traducteur',
				categoria: '🕰️ » Utilitaires',
				desc: 'Traduire des messages dans n\'importe quel langage.'
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
					name: 'language',
					description: 'The language you want to translate',
					required: true,
					name_localizations: {
						'pt-BR': 'idioma',
						'en-US': 'language',
						'fr': 'langue'
					},
					description_localizations: {
						'pt-BR': 'O idioma que você quer traduzir',
						'en-US': 'The language you want to translate',
						'fr': 'La langue que vous souhaitez traduire'
					}
				},
				{
					type: 3,
					name: 'message',
					description: 'The Message to be translated',
					required: true,
					name_localizations: {
						'pt-BR': 'mensagem',
						'en-US': 'message',
						'fr': 'message'
					},
					description_localizations: {
						'pt-BR': 'A mensagem que você quer traduzir',
						'en-US': 'The Message to be translated',
						'fr': 'Le message que vous souhaitez traduire'
					}
				}
			],
			aliases: ['traduzir', 'tradutor'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) return ctx.message.channel.slashReply({
			content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.tradutor.text.replace(/%/g, ctx.prefix)}`
		});
		if (!ctx.args[1]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.tradutor.text.replace(/%/g, ctx.prefix)}`
			});
		}
		const translate = require('@vitalets/google-translate-api');
		translate(ctx.args.slice(1).join(' '), { to: ctx.args[0] }).then(res => {
			ctx.message.channel.slashReply({
				content: `🌎 ${ctx.message.author.mention} **|** ` + '`' + res.text.replace(/`/g, '').replace(/@/g, '') + '`'
			});
		});
	}
};
