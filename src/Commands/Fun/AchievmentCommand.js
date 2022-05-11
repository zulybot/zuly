module.exports = class AchievmentCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['ATTACH_FILES'],
				dono: false
			},
			pt: {
				nome: 'conquista',
				categoria: '⭐ » Diversão',
				desc: 'Cria uma conquista do minecraft.'
			},
			en: {
				nome: 'achievement',
				categoria: '⭐ » Fun',
				desc: 'Create a minecraft achievement.'
			},
			fr: {
				nome: 'réussite',
				categoria: '⭐ » Divertissement',
				desc: 'Créer une réalisation minecraft.'
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
					name: 'text',
					description: 'The text in image!',
					required: true,
					name_localizations: {
						'pt-BR': 'texto',
						'en-US': 'text',
						'fr': 'texte'
					},
					description_localizations: {
						'pt-BR': 'O texto que será exibido na imagem!',
						'en-US': 'The text that will be displayed in the image!',
						'fr': 'Le texte qui sera affiché dans l\'image!'
					}
				},
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const { createCanvas, loadImage, registerFont } = require('canvas');
		const { shortenText } = require('../../Helpers/Canvas');
		registerFont('./assets/fonts/Minecraftia.ttf', { family: 'Minecraftia' });

		const text = ctx.args.join(' ');

		const base = await loadImage('./assets/images/memes/conquista.png');
		const canvas = createCanvas(base.width, base.height);
		const foto = canvas.getContext('2d');
		foto.drawImage(base, 0, 0);
		foto.font = '17px Minecraftia';
		foto.fillStyle = '#ffff00';
		foto.fillText(`${ctx.idioma.image.achivment}`, 60, 40);
		foto.fillStyle = '#ffffff';
		foto.fillText(shortenText(foto, text, 230), 60, 60);

		const { MessageAttachment } = require('discord.js');
		const attachment = new MessageAttachment(canvas.toBuffer(), 'fisheye.png');

		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			files: [attachment]
		});
	}
};
