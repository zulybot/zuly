module.exports = class GameCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'game',
				categoria: '⭐ » Diversão',
				desc: 'Uma variedade de jogos para você jogar!'
			},
			en: {
				nome: 'game',
				categoria: '⭐ » Fun',
				desc: 'A variety of games for you to play!'
			},
			fr: {
				nome: 'game',
				categoria: '⭐ » Divertissement',
				desc: 'Une variété de jeux pour vous de jouer!'
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
					name: 'snake',
					description: 'Play the snake game!',
					name_localizations: {
						'pt-BR': 'snake',
						'en-US': 'snake',
						'fr': 'serpent'
					},
					description_localizations: {
						'pt-BR': 'Jogue o jogo da cobra!',
						'en-US': 'Play the snake game!',
						'fr': 'Jouer le jeu du serpent!'
					}
				},
				{
					type: 1,
					name: 'akinator',
					description: 'Play the akinator game!',
					name_localizations: {
						'pt-BR': 'akinator',
						'en-US': 'akinator',
						'fr': 'akinator'
					},
					description_localizations: {
						'pt-BR': 'Jogue o jogo do akinator!',
						'en-US': 'Play the akinator game!',
						'fr': 'Jouer le jeu de akinator!'
					}
				}
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		if (ctx.args[0] === 'akinator') {
			const akinator = require('../../Helpers/Akinator/index');
			ctx.message.channel.slashReply({
				content: `<:zu_aki:913754145385754675> ${ctx.message.author.mention} **|** ${ctx.idioma.aki.i}.`,
			});
			return akinator(ctx.message, {
				language: ctx.idioma.lang,
				childMode: false,
				gameType: 'character',
				useButtons: true,
				embedColor: '#ffcbdb'
			});
		}
		else if (ctx.args[0] === 'snake') {
			return global.zuly.snakecord.newGame(ctx.message);
		}
	}
};
