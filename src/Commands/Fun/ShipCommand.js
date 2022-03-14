module.exports = class ShipCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['attachFiles'],
				dono: true
			},
			pt: {
				nome: 'ship',
				categoria: '⭐ » Diversão',
				desc: 'Shippa você com outra pessoa.'
			},
			en: {
				nome: 'ship',
				categoria: '⭐ » Fun',
				desc: 'Ship you with someone else.'
			},
			fr: {
				nome: 'ship',
				categoria: '⭐ » Divertissement',
				desc: 'Shippe avec quelqu\'un d\'autre.'
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
			options: [],
			aliases: ['shippar', 'casal'],
			run: this.run
		};
	}

	async run (ctx) {
		let porcentagem;
		let user1 = ctx.message.author;
		let user2 = ctx.messages[0] || await global.zuly.users.fetch(ctx.args[0]);

		if (ctx.args[1]) {
			user1 = ctx.messages[0] || await global.zuly.users.fetch(ctx.args[0]);
			user2 = ctx.messages[0] || await global.zuly.users.fetch(ctx.args[1]);
		}

		if (!user2) {
			user2 = global.zuly.users.random();
		}

		const ship1 = await global.zuly.db.get(`ship-${user1.id}-${user2.id}`);
		const ship2 = await global.zuly.db.get(`ship-${user1.id}-${user2.id}`);

		const nome = user1.username.slice(0, 3) + user2.username.slice(0, 3);

		if (!ship1 && !ship2) {
			porcentagem = Math.floor(Math.random() * 101);
		}
		else {
			porcentagem = ship1;
		}

		if (user1.id === user2.id) {
			porcentagem = 50;
		}

		const {
			createCanvas,
			loadImage,
			registerFont
		} = require('canvas');

		registerFont('./assets/fonts/Lemon-Brownies.ttf', {
			family: 'Lemon-Brownies'
		});

		const base = await loadImage('./assets/images/ship.png');

		const edit = createCanvas(base.width, base.height);
		const foto = edit.getContext('2d');

		const avatar1 = user1.avatarURL;
		const avatar2 = user2.avatarURL;

		const img1 = await loadImage(avatar1);
		const img2 = await loadImage(avatar2);

		foto.drawImage(base, 0, 0);
		foto.drawImage(img1, 390, 480, 1200, 1200);
		foto.drawImage(img2, 2440, 480, 1200, 1200);
		foto.drawImage(base, 0, 0);

		foto.font = '430px Lemon-Brownies';
		foto.fillStyle = '#ffffff';
		foto.fillText(`${porcentagem}%`, 1630, 1300);
		foto.font = '300px Lemon-Brownies';
		foto.fillText(`${nome}`, 2000, 2000);

		ctx.message.channel.slashReply(`💖 ${ctx.message.author} 💖`, {
			file: edit.toBuffer(),
			name: 'ship.png'
		}).then(async () => {
			if (!ship1 && !ship2) {
				await global.zuly.db.set(`ship-${user1.id}-${user2.id}`, porcentagem);
				await global.zuly.db.set(`ship-${user2.id}-${user1.id}`, porcentagem);
			}
		});
	}
};
