module.exports = class GivawayStart {
	constructor () {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD'],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'giveaway-start',
				categoria: '🎁 » Giveaway',
				desc: 'Inicia um sorteio'
			},
			en: {
				nome: 'giveaway-start',
				categoria: '🎁 » Giveaway',
				desc: 'Start a giveaway'
			},
			fr: {
				nome: 'giveaway-start',
				categoria: '🎁 » Giveaway',
				desc: 'Démarrer un giveaway'
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
					name: 'time',
					description: 'Duration of the giveaway. (1d, 1h, 1m, 1s)',
					required: true,
					name_localizations: {
						'pt-BR': 'tempo',
						'en-US': 'time',
						'fr': 'durée'
					},
					description_localizations: {
						'pt-BR': 'Duração do sorteio. (1d, 1h, 1m, 1s)',
						'en-US': 'Duration of the giveaway. (1d, 1h, 1m, 1s)',
						'fr': 'Durée du giveaway. (1d, 1h, 1m, 1s)'
					}
				},
				{
					type: 3,
					name: 'winners',
					description: 'Giveaway winners. (1w, 2w/1, 2)',
					required: true,
					name_localizations: {
						'pt-BR': 'ganhadores',
						'en-US': 'winners',
						'fr': 'gagnants'
					},
					description_localizations: {
						'pt-BR': 'Quantidade de ganhadores. (1w, 2w/1, 2)',
						'en-US': 'Giveaway winners. (1w, 2w/1, 2)',
						'fr': 'Gagnants du giveaway. (1w, 2w/1, 2)'
					}
				},
				{
					type: 3,
					name: 'prize',
					description: 'The prize of the giveaway.',
					required: true,
					name_localizations: {
						'pt-BR': 'prêmio',
						'en-US': 'prize',
						'fr': 'prix'
					}
				}
			],
			aliases: ['gstart', 'gsetup', 'sorteio-start', 'sorteio-iniciar'],
			run: this.run
		};
	}

	async run (ctx) {
		const ms = require('ms');
		if (!ctx.args[0] || !ctx.args[1] || !ctx.args[2]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.giveaway.start.replace('%p', ctx.prefix)}`
			});
		}
		ctx.message.channel.slashReply({
			content: `🎁 ${ctx.message.author.mention} **|** Sucess!`
		});
		global.zuly.giveawaysManager.start(ctx.message.channel, {
			dmWinner: true,
			duration: ms(ctx.args[0]),
			winnerCount: parseInt(ctx.args[1]),
			prize: ctx.args.slice(2).join(' '),
			messages: {
				inviteToParticipate: ctx.idioma.giveaway.react,
				drawing: `${ctx.idioma.giveaway.restante} **{timestamp}**`,
				winMessage: '🎁 ' + ctx.idioma.giveaway.wins,
				noWinner: ctx.idioma.giveaway.no,
				winners: ctx.idioma.giveaway.win,
				endedAt: ctx.idioma.giveaway.term,
				hostedBy: ctx.idioma.giveaway.host,
				units: {
					seconds: ctx.idioma.giveaway.sec,
					minutes: ctx.idioma.giveaway.min,
					hours: ctx.idioma.giveaway.hrs,
					days: ctx.idioma.giveaway.day
				}
			}
		});
	}
};