module.exports = class AchievmentCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['ATTACH_FILES'],
				dono: false
			},
			pt: {
				nome: 'enfim',
				categoria: '⭐ » Diversão',
				desc: 'Cria um meme do enfim.'
			},
			en: {
				nome: 'enfim',
				categoria: '⭐ » Fun',
				desc: 'Create an enfim meme.'
			},
			fr: {
				nome: 'enfim',
				categoria: '⭐ » Divertissement',
				desc: 'Créer un mème enfim.'
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
		const { createCanvas, loadImage } = require('canvas');
		const canvas = createCanvas(685, 494);
		const foto = canvas.getContext('2d');

		const background = await loadImage('./assets/images/memes/enfim.jpg');
		foto.drawImage(background, 0, 0, canvas.width, canvas.height);

		foto.font = '30px sans-serif';
		foto.fillStyle = '#ffffff';
		foto.fillText(`${ctx.args.join(' ')}`.match(/.{1,50}/g).join('\n'), canvas.width / 50.9, canvas.height / 15.9, 655);

		const { MessageAttachment } = require('discord.js');
		const attachment = new MessageAttachment(canvas.toBuffer(), 'enfim.png');

		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			files: [attachment]
		});
	}
};
