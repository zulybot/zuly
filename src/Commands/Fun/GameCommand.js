module.exports = class GameCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['ATTACH_FILES', 'EMBED_LINKS', 'ADD_REACTIONS'],
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
					description: 'Play the snake game!'
				},
				{
					type: 1,
					name: 'akinator',
					description: 'Play the akinator game!'
				}
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		if (ctx.args[0] === 'akinator') {
			const akinator = require('discord.js-akinator');
			ctx.message.channel.slashReply({
				content: `<:zu_aki:913754145385754675> ${ctx.message.author.mention} **|** ${ctx.idioma.aki.i}`,
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
