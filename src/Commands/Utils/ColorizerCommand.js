module.exports = class CalcCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'colorizer',
				categoria: '🕰️ » Utilidades',
				desc: 'Colore alguma imagem.'
			},
			en: {
				nome: 'colorizer',
				categoria: '🕰️ » Utility',
				desc: 'Color any image.'
			},
			fr: {
				nome: 'colorizer',
				categoria: '🕰️ » Utilitaires',
				desc: 'Colorer une image.'
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
					name: 'image',
					description: 'The Image Link',
					required: true,
					name_localizations: {
						'pt-BR': 'imagem',
						'en-US': 'image',
						'fr': 'image'
					},
					description_localizations: {
						'pt-BR': 'Link da imagem.',
						'en-US': 'The image link.',
						'fr': 'Lien de l\'image.'
					}
				}
			],
			aliases: ['av', 'user-avatar', 'ua', 'memberavatar', 'profileavatar'],
			run: this.run
		};
	}

	async run (ctx) {
		const { MessageAttachment } = require('discord.js');
		const result = await global.zuly.deepai.callStandardApi('colorizer', {
			image: ctx.args[0]
		});
		const image = result.output_url;
		const attachment = new MessageAttachment(image);
		if (!ctx.message.channel.nsfw) {
			ctx.message.channel.slashReply({
				content: `📸 ${ctx.message.author.mention}`,
				files: [attachment],
				ephemeral: true
			});
		}
		else {
			ctx.message.channel.slashReply({
				content: `📸 ${ctx.message.author.mention}`,
				files: [attachment],
			});
		}
	}
};
