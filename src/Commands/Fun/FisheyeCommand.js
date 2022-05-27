module.exports = class FisheyeCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['ATTACH_FILES'],
				dono: false
			},
			pt: {
				nome: 'olhodepeixe',
				categoria: '⭐ » Diversão',
				desc: 'Faz montagem da foto de alguem como se fosse um peixe vendo.'
			},
			en: {
				nome: 'fisheye',
				categoria: '⭐ » Fun',
				desc: 'Make a montage of someone\'s photo as if it were a seeing fish.'
			},
			fr: {
				nome: 'fisheye',
				categoria: '⭐ » Divertissement',
				desc: 'Faites un montage de la photo de quelqu\'un comme s\'il s\'agissait d\'un poisson voyant.'
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
						'pt-BR': 'Usuário para fazer o olho de peixe.',
						'en-US': 'User to make the fisheye of.',
						'fr': 'Utilisateur à qui faire l\'olho de poisson.'
					}
				}
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const { createCanvas, loadImage } = require('canvas');
		const { fishEye } = require('../../Helpers/Canvas');

		const user = global.zuly.users.cache.get(ctx.args[0]) ? global.zuly.users.cache.get(ctx.args[0]) : await global.zuly.users.fetch(ctx.args[0]);

		const background = await loadImage(user.displayAvatarURL({ dynamic: false, size: 4096, format: 'png' }));
		const canvas = createCanvas(background.width, background.height);
		const foto = canvas.getContext('2d');

		foto.drawImage(background, 0, 0, canvas.width, canvas.height);
		const avatar = await loadImage(user.displayAvatarURL({ dynamic: false, size: 4096, format: 'png' }));
		foto.drawImage(avatar, 50, 100, 150, 150);
		fishEye(foto, 10, 0, 0, background.width, background.height);

		const { MessageAttachment } = require('discord.js');
		const attachment = new MessageAttachment(canvas.toBuffer(), 'fisheye.png');

		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			files: [attachment]
		});
	}
};
