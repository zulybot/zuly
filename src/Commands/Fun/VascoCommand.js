module.exports = class MrincredibleCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'vasco',
				categoria: '⭐ » Diversão',
				desc: 'Foi jogar no vasco.'
			},
			en: {
				nome: 'vasco',
				categoria: '⭐ » Fun',
				desc: 'Went to play in Basque.'
			},
			fr: {
				nome: 'vasco',
				categoria: '⭐ » Divertissement',
				desc: 'Je suis allé jouer en basque.'
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
					name: 'userid',
					description: 'The User ID',
					required: false
				},
				{
					type: 6,
					name: 'usermention',
					description: 'The User Mention',
					required: false
				}
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const { createCanvas, loadImage } = require('canvas');
		const vasco = await loadImage('./assets/images/memes/vascomeme.png');
		const canvas = createCanvas(vasco.width, vasco.height);
		const foto = canvas.getContext('2d');

		const user = ctx.args[0] ? ctx.messages[0] || await global.zuly.users.fetch(ctx.args[0]).catch(() => ctx.message.author) : ctx.message.author;
		const avatar = await loadImage(user.avatarURL);

		foto.drawImage(avatar, 460, 250, 150, 160);
		foto.drawImage(vasco, 0, 0, canvas.width, canvas.height);

		foto.font = 'bold 30px sans-serif';
		foto.fillStyle = '#000000';
		if (user.username.length < 5) {
			foto.fillText(user.username.slice(0, 6).replace(/ /g, ''), 130, 120);
		}
		else {
			foto.fillText(user.username.slice(0, 8).replace(/ /g, ''), 110, 120);
		}
		foto.font = 'bold 30px sans-serif';

		const gender = await global.zuly.db.get(`gender-${user.id}`);
		if (!gender) {
			foto.fillText('vivo', 390, 120);
		}
		else if (gender === 'female') {
			foto.fillText('viva', 390, 120);
		}
		else if (gender === 'male') {
			foto.fillText('vivo', 390, 120);
		}
		else if (gender === 'lgbt') {
			foto.fillText('vivu', 390, 120);
		}

		ctx.message.channel.slashReply(ctx.message.author, {
			file: canvas.toBuffer(),
			name: 'vasco.png'
		});
	}
};

// 𝖽