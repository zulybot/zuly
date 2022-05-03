module.exports = class GameCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'bolamagica',
				categoria: '⭐ » Diversão',
				desc: 'Joga a bola magica!'
			},
			en: {
				nome: 'magicball',
				categoria: '⭐ » Fun',
				desc: 'Play the magic ball!'
			},
			fr: {
				nome: 'ballemagique',
				categoria: '⭐ » Divertissement',
				desc: 'Jouer à la boule magique!'
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
					name: 'ask',
					description: 'Ask the magic ball a question!',
					required: true,
					name_localizations: {
						'pt-BR': 'pergunta',
						'en-US': 'question',
						'fr': 'question'
					},
					description_localizations: {
						'pt-BR': 'Pergunta a ser respondida!',
						'en-US': 'The question to be answered!',
						'fr': 'La question à répondre!'
					}
				},
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const respostas = {};
		respostas.pt = [
			'Sim',
			'Não',
			'Talvez',
			'Provavelmente',
			'Com certeza',
			'Boa sorte',
			'Não me pergunte isso'
		];
		respostas.en = [
			'Yes',
			'No',
			'Perhaps',
			'Probably',
			'Certainly',
			'Good luck',
			'Don\'t ask me that'
		];
		respostas.fr = [
			'Oui',
			'Non',
			'Peut-être',
			'Probablement',
			'Certainement',
			'Bonne chance',
			'Ne me posez pas cette question'
		];
		const pt = respostas.pt[Math.floor(Math.random() * respostas.pt.length)];
		const en = respostas.en[Math.floor(Math.random() * respostas.en.length)];
		const fr = respostas.en[Math.floor(Math.random() * respostas.fr.length)];

		const embed = new ctx.embed();
		embed.setTitle(ctx.idioma.ball.title);
		embed.addField(ctx.idioma.ball.field1, ctx.args.join(' '), true);
		if (ctx.idioma.lang === 'pt') {
			embed.addField(ctx.idioma.ball.field2, pt, true);
		}
		else if (ctx.idioma.lang === 'en') {
			embed.addField(ctx.idioma.ball.field2, en, true);
		}
		else if (ctx.idioma.lang === 'fr') {
			embed.addField(ctx.idioma.ball.field2, fr, true);
		}
		embed.setColor('#ffcbdb');
		embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			embeds: [embed.get()]
		});
	}
};
