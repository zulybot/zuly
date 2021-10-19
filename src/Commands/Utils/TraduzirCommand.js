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
				nome: 'translator',
				categoria: '🕰️ » Utilidades',
				desc: 'Veja as mensagens de algum usuário'
			},
			en: {
				nome: 'translator',
				categoria: '🕰️ » Utility',
				desc: 'See a user messages'
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
					required: false,
				},
				{
					type: 3,
					name: 'message',
					description: 'The Message to be translated',
					required: false,
				}
			],
			aliases: ['traduzir', 'tradutor'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) return ctx.message.channel.createMessage({
			content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.tradutor.text.replace(/%/g, ctx.prefix)}`
		});
		if (!ctx.args[1]) {
			return ctx.message.channel.createMessage({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.tradutor.text.replace(/%/g, ctx.prefix)}`
			});
		}
		const translate = require('@vitalets/google-translate-api');
		translate(ctx.args.slice(1).join(' '), { to: ctx.args[0] }).then(res => {
			ctx.message.channel.createMessage({
				content: `🌎 ${ctx.message.author.mention} **|** ` + '`' + res.text.replace(/`/g, '').replace(/@/g, '') + '`'
			});
		});
	}
};
