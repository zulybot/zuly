module.exports = class CalcCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'afk',
				categoria: '🕰️ » Utilidades',
				desc: 'Veja o avatar de algum usuário.'
			},
			en: {
				nome: 'afk',
				categoria: '🕰️ » Utility',
				desc: 'See a user\'s avatar.'
			},
			fr: {
				nome: 'afk',
				categoria: '🕰️ » Utilitaires',
				desc: 'Voir l\'avatar d\'un utilisateur.'
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
					type: 1,
					name: 'set',
					description: 'Set your AFK status.',
					required: false,
					name_localizations: {
						'pt-BR': 'set',
						'en-US': 'set',
						'fr': 'set'
					},
					description_localizations: {
						'pt-BR': 'Set your AFK status.',
						'en-US': 'Set your AFK status.',
						'fr': 'Set your AFK status.'
					},
					options: [
						{
							type: 3,
							name: 'status',
							description: 'The status you want to set.',
							required: true,
							name_localizations: {
								'pt-BR': 'status',
								'en-US': 'status',
								'fr': 'status'
							},
							description_localizations: {
								'pt-BR': 'The status you want to set.',
								'en-US': 'The status you want to set.',
								'fr': 'The status you want to set.'
							}
						}
					]
				},
				{
					type: 1,
					name: 'remove',
					description: 'Remove your AFK status.',
					required: false,
					name_localizations: {
						'pt-BR': 'remove',
						'en-US': 'remove',
						'fr': 'remove'
					},
					description_localizations: {
						'pt-BR': 'Remove your AFK status.',
						'en-US': 'Remove your AFK status.',
						'fr': 'Remove your AFK status.'
					},
				}
			],
			aliases: ['av', 'user-avatar', 'ua', 'memberavatar', 'profileavatar'],
			run: this.run
		};
	}

	async run (ctx) {
		if (ctx.args[0] === 'set') {
			const afk = await global.zuly.db.get(`afk-${ctx.message.author.id}`);
			if (afk) {
				return ctx.message.channel.slashReply(ctx.idioma.afk.set.replace(
					'{{user}}',
					ctx.message.author.mention
				).replace(
					'{{status}}',
					afk.status
				));
			}
			else {
				await global.zuly.db.set(`afk-${ctx.message.author.id}`, {
					status: ctx.args[1],
					time: parseInt(Date.now() / 1000)
				});
				return ctx.message.channel.slashReply(ctx.idioma.afk.set.replace(
					'{{user}}',
					ctx.message.author.mention
				).replace(
					'{{status}}',
					ctx.args[1].replace(/`/g, '')
				));
			}
		}
		else {
			const afk = await global.zuly.db.get(`afk-${ctx.message.author.id}`);
			if (afk) {
				await global.zuly.db.delete(`afk-${ctx.message.author.id}`);
				return ctx.message.channel.slashReply(ctx.idioma.afk.remove.replace(
					'{{user}}',
					ctx.message.author.mention
				).replace(
					'{{status}}',
					afk.status.replace(/`/g, '')
				));
			}
			else {
				ctx.message.channel.slashReply(ctx.idioma.afk.remove.replace(
					'{{user}}',
					ctx.message.author.mention
				).replace(
					'{{status}}',
					afk.replace(/`/g, '')
				));
			}
		}
	}
};
