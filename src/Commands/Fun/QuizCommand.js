module.exports = class QuizCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'quiz',
				categoria: '⭐ » Diversão',
				desc: 'Joga o jogo de gênio quiz!'
			},
			en: {
				nome: 'quiz',
				categoria: '⭐ » Fun',
				desc: 'Play the quiz genius game!'
			},
			fr: {
				nome: 'quiz',
				categoria: '⭐ » Divertissement',
				desc: 'Jouez au jeu de génie du quiz!'
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
					name: 'start',
					description: 'Start a quiz.'
				}
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const game = require('../../../genioQuiz.json');
		global.zuly.userGame = new Set();
		global.zuly.userFase = new Set();
		if (global.zuly.userGame.has(ctx.message.author.id)) {
			return ctx.message.reply(':x: **|** Você já está em uma partida!');
		}
		else {
			global.zuly.userGame.add(ctx.message.author.id);
			global.zuly.userFase.add(`${ctx.message.author.id}-0`);
			const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
			const embed = new MessageEmbed();
			embed.setTitle(`${global.zuly.user.username} | ${ctx.message.author.username}`);
			embed.setDescription(`> ${game[0].question}`);
			embed.setColor('#0099ff');
			embed.setThumbnail(global.zuly.user.displayAvatarURL());
			embed.setFooter({
				text: '⤷ Fase 0',
				iconURL: global.zuly.user.displayAvatarURL()
			});
			const row = new MessageActionRow();
			game[0].alternatives.forEach((alternative) => {
				row.addComponents(
					new MessageButton()
						.setCustomId(alternative.id)
						.setEmoji(alternative.emoji)
						.setStyle('PRIMARY')
				);
			});
			await ctx.message.channel.slashReply({ embeds: [embed], components: [row] });
		}
	}
};
