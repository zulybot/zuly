/* eslint-disable new-cap */
module.exports = class AnimeCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'malprofile',
				categoria: '📺 » Anime',
				desc: 'Procura um anime.'
			},
			en: {
				nome: 'malprofile',
				categoria: '📺 » Anime',
				desc: 'Look for an anime.'
			},
			fr: {
				nome: 'malprofile',
				categoria: '📺 » Animé',
				desc: 'Cherchez un animé.'
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
					name: 'anime',
					description: 'The name of the anime.',
					required: true,
					name_localizations: {
						'pt-BR': 'anime',
						'en-US': 'anime',
						'fr': 'anime'
					},
					description_localizations: {
						'pt-BR': 'O nome do anime.',
						'en-US': 'The name of the anime.',
						'fr': 'Le nom de l\'anime.'
					}
				}
			],
			aliases: ['anime'],
			run: this.run
		};
	}

	async run (ctx) {
		const { getWatchListFromUser } = require('mal-scraper');

		const username = ctx.args[0];

		const animeList = await getWatchListFromUser(username, 'anime');

		if (!animeList.length) {
			return ctx.message.channel.slashReply({
				content: ':x: **|** Não foi possível encontrar o perfil.'
			});
		}
		else {
			const embed = new ctx.embed();
			embed.setTitle(`${username} | My Anime List`);
			embed.setColor('#ffcbdb');
			embed.setDescription(`↳ ${animeList.length} animes.`);
			embed.addField('_ _', animeList.map(anime => `[${anime.animeTitle}](https://myanimelist.net${anime.animeURL})`).join('\n').slice(0, 1024), true);
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			});
		}
	}
};
