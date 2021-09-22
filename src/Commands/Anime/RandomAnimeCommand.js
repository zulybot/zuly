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
					embed.title('📺 Random-Anime | ' + anime.attributes.canonicalTitle);
					embed.description('>>> ' + text);
					embed.field(`⭐ ${rating}`, anime.attributes.averageRating);
					embed.field(`⛔ ${age}`, ager);
					embed.color('#ffcbdb');
					embed.thumbnail(anime.attributes.posterImage.large);
					ctx.send(embed.create);
				});
			});
		});
	}
};
