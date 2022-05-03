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
				nome: 'anime',
				categoria: '📺 » Anime',
				desc: 'Procura um anime.'
			},
			en: {
				nome: 'anime',
				categoria: '📺 » Anime',
				desc: 'Look for an anime.'
			},
			fr: {
				nome: 'animé',
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
						'fr': 'animé'
					},
					description_localizations: {
						'pt-BR': 'O nome do anime.',
						'en-US': 'The name of the anime.',
						'fr': 'Le nom de l\'animé.'
					}
				}
			],
			aliases: ['anime'],
			run: this.run
		};
	}

	async run (ctx) {
		const { search } = require('mal-scraper');
		await search.search('anime', {
			term: ctx.args[0]
		}).then(async (anim) => {
			const anime = anim[0];
			const embed = new ctx.embed();
			embed.setTitle(anime.title);
			embed.setUrl(anime.url);
			embed.setColor('#ffcbdb');
			embed.setDescription(anime.shortDescription);
			embed.setThumbnail(anime.thumbnail);
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			});
		});
	}
};
