module.exports = class MrincredibleCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'mrincredible',
				categoria: '⭐ » Diversão',
				desc: 'Faça um meme do senhor incrivel.'
			},
			en: {
				nome: 'mrincredible',
				categoria: '⭐ » Fun',
				desc: 'Make an incredible sir meme.'
			},
			fr: {
				nome: 'mrincredible',
				categoria: '⭐ » Divertissement',
				desc: 'Faire un meme du sénéral incroyable.'
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
					name: 'text1',
					description: 'The first text.',
					required: true
				},
				{
					type: 3,
					name: 'text2',
					description: 'The second text.',
					required: true
				}
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const { createCanvas, loadImage } = require('canvas');
		const incriveis = await loadImage('./assets/images/memes/incriveis.png');
		const canvas = createCanvas(incriveis.width, incriveis.height);
		const foto = canvas.getContext('2d');

		foto.drawImage(incriveis, 0, 0, canvas.width, canvas.height);

		foto.font = '30px sans-serif';
		foto.fillStyle = '#ffffff';

		foto.fillText(ctx.args[0].match(/.{1,23}/g).join('\n'), canvas.width / 50.9, canvas.height / 15.9, 655);
		foto.fillText(ctx.args[1].match(/.{1,23}/g).join('\n'), canvas.width / 1.9, canvas.height / 15.9, 655);

		ctx.message.channel.slashReply(ctx.message.author.mention, {
			file: canvas.toBuffer(),
			name: 'incriveis.png'
		});
	}
};

// 𝖽