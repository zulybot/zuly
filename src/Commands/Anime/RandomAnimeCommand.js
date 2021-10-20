/* eslint-disable new-cap */
module.exports = class RandomAnimeCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'random-anime',
				categoria: '📺 » Anime',
				desc: 'Anime aleatório'
			},
			en: {
				nome: 'random-anime',
				categoria: '📺 » Anime',
				desc: 'Random anime.'
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
			options: [],
			aliases: ['ra', 'r', 'randomanime', 'random', 'aleatorio'],
			run: this.run
		};
	}

	async run (ctx) {
		const { get } = require('axios');
		await get('https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=5').then(async response => {
			const translate = require('@vitalets/google-translate-api');
			const res = response.data;
			const rand = Math.floor(Math.random() * res.data.length);
			const anime = res.data[rand];

			translate(anime.attributes.synopsis, { to: 'pt' }).then(synopsis => {
				translate(anime.attributes.ageRatingGuide, { to: 'pt' }).then(ratinge => {
					let text;
					let rating;
					let age;
					let ager;

					if (ctx.idioma.lang === 'pt') {
						rating = 'Avaliação:';
					}
					else {
						rating = 'Rating:';
					}

					if (ctx.idioma.lang === 'pt') {
						age = 'Classificação etária:';
					}
					else {
						age = 'Age Rating:';
					}

					if (ctx.idioma.lang === 'pt') {
						text = synopsis.text;
					}
					else {
						text = anime.attributes.synopsis;
					}

					if (ctx.idioma.lang === 'pt') {
						ager = ratinge.text;
					}
					else {
						ager = anime.attributes.ageRatingGuide;
					}

					const embed = new ctx.embed();
					embed.setTitle('📺 Random-Anime | ' + anime.attributes.canonicalTitle);
					embed.setDescription('>>> ' + text);
					embed.addField(`⭐ ${rating}`, anime.attributes.averageRating);
					embed.addField(`⛔ ${age}`, ager);
					embed.setColor('#ffcbdb');
					embed.setThumbnail(anime.attributes.posterImage.large);
					embed.setFooter('⤷ zulybot.xyz');
					ctx.message.channel.slashReply({
						content: ctx.message.author.mention,
						embeds: [embed.get()]
					});
				});
			});
		});
	}
};
