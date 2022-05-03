module.exports = class GameCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'utbox',
				categoria: '⭐ » Diversão',
				desc: 'Cria uma caixa de diálogo igual ao do Undertale!'
			},
			en: {
				nome: 'utbox',
				categoria: '⭐ » Fun',
				desc: 'Creates a dialog just like Undertale!'
			},
			fr: {
				nome: 'utbox',
				categoria: '⭐ » Divertissement',
				desc: 'Créer une boîte de dialogue de type Undertale!'
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
			aliases: ['utbox', 'ubox', 'undertale', 'undertalechat'],
			run: this.run
		};
	}

	async run (ctx) {
		const { createCanvas, loadImage, registerFont } = require('canvas');
		const { greyscale } = require('../../Helpers/Canvas');

		registerFont('./assets/fonts/Minecraftia.ttf', { family: 'Minecraftia' });
		const base = await loadImage('./assets/images/memes/undertalebox.png');
		const avatar = await loadImage(ctx.message.author.displayAvatarURL({ format: 'png', size: 4096 }));
		const canvas = createCanvas(base.width, base.height);
		const foto = canvas.getContext('2d');
		const text = ctx.args.join(' ');
		foto.drawImage(base, 0, 0);
		foto.font = '17px Minecraftia';
		foto.drawImage(avatar, 15, 15, 120, 120);
		foto.fillStyle = '#ffffff';
		foto.fillText(`${text.slice(0, 300)}`.match(/.{1,35}/g).join('\n'), canvas.width / 3.4, canvas.height / 2.7, 655);
		greyscale(foto, 0, 0, base.width, base.height);

		const { MessageAttachment } = require('discord.js');
		const attachment = new MessageAttachment(canvas.toBuffer(), 'undertalebox.png');

		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			files: [attachment]
		});
	}
};
