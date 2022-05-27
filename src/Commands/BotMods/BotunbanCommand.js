module.exports = class BanCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				botmod: true,
			},
			pt: {
				nome: 'botunban',
				categoria: '💻 » Dev',
				desc: 'Desbane algum usuário de usar o bot.'
			},
			en: {
				nome: 'botunban',
				categoria: '💻 » Dev',
				desc: 'Unban some user from using the bot.'
			},
			fr: {
				nome: 'botunban',
				categoria: '💻 » Dev',
				desc: 'Débannir certains utilisateurs d\'utiliser le bot.'
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
					type: 6,
					name: 'user',
					description: 'The User Mention',
					required: true,
					name_localizations: {
						'pt-BR': 'usuário',
						'en-US': 'user',
						'fr': 'utilisateur'
					},
					description_localizations: {
						'pt-BR': 'Usuário que será desbanido.',
						'en-US': 'The user that will be unbanned.',
						'fr': 'L\'utilisateur qui sera débanni.'
					}
				},
				{
					type: 3,
					name: 'reason',
					description: 'The reason for the unban',
					required: false,
					name_localizations: {
						'pt-BR': 'motivo',
						'en-US': 'reason',
						'fr': 'raison'
					},
					description_localizations: {
						'pt-BR': 'Motivo do desbanimento.',
						'en-US': 'The reason for the unban.',
						'fr': 'Raison du débannissement.'
					}
				}
			],
			aliases: ['zulyunban'],
			run: this.run
		};
	}

	async run (ctx) {
		const member = global.zuly.users.cache.get(ctx.args[0]) ? global.zuly.users.cache.get(ctx.args[0]) : await global.zuly.users.fetch(ctx.args[0]);

		let banReason = ctx.args.splice(1).join(' ');
		if (!banReason) {
			banReason = `${ctx.idioma.ban.mot}`;
		}
		const motivo = `${ctx.idioma.ban.mot2} ${ctx.message.author.username}#${ctx.message.author.discriminator} - ${ctx.idioma.ban.mot3} ${banReason}`;

		await global.zuly.db.delete(`botban-${member.id}`);

		const channel = await global.zuly.channels.cache.get('964867847245426689');
		channel.send(`:white_check_mark: **|** O Usuário \`${member.tag}\` (\`${member.id}\`) foi desbanido do bot.\n> <:zu_info:911303533859590144> \`${motivo}\``);

		ctx.message.channel.slashReply({
			content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.the} **${member.username}** ${ctx.idioma.ban.foi}`
		});
	}
};
// ADG, Davi e LRD
