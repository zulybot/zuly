module.exports = class FisheyeCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['ATTACH_FILES'],
				dono: false
			},
			pt: {
				nome: 'perfeito',
				categoria: '⭐ » Diversão',
				desc: 'Quando alguém diz nada é perfeito.'
			},
			en: {
				nome: 'perfect',
				categoria: '⭐ » Fun',
				desc: 'When someone says nothing is perfect.'
			},
			fr: {
				nome: 'parfait',
				categoria: '⭐ » Divertissement',
				desc: 'Quand quelqu\'un dit que rien n\'est parfait.'
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
					type: 6,
					name: 'user',
					description: 'User to make the fisheye of.',
					required: true,
					name_localizations: {
						'pt-BR': 'usuário',
						'en-US': 'user',
						'fr': 'utilisateur'
					},
					description_localizations: {
						'pt-BR': 'Usuário para dizer que é perfeito.',
						'en-US': 'User to say that it is perfect.',
						'fr': 'Utilisateur pour dire qu\'il est parfait.'
					}
				}
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const { createCanvas, loadImage } = require('canvas');

		const user = await global.zuly.users.fetch(ctx.args[0]);

		const background = await loadImage('./assets/images/memes/perfeito.png');
		const canvas = createCanvas(background.width, background.height);
		const avatar = await loadImage(user.displayAvatarURL({ dynamic: false, size: 4096, format: 'png' }));
		const redondo = await loadImage('./assets/images/utils/mask.png');
		const foto = canvas.getContext('2d');

		foto.drawImage(background, 0, 0, canvas.width, canvas.height);
		foto.drawImage(avatar, 250, 60, 200, 200);
		foto.drawImage(redondo, 250, 60, 200, 200);

		const { MessageAttachment } = require('discord.js');
		const attachment = new MessageAttachment(canvas.toBuffer(), 'fisheye.png');

		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			files: [attachment]
		});
	}
};
