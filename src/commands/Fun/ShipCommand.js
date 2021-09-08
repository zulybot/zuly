module.exports = class ShipCommand {
	constructor () {
		return {
			permissoes: {
				membro: [], // Permissoes que o usuario necessita
				bot: ['attachFiles'], // Permissoes que o bot necessita
				dono: true // Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'ship',
				categoria: '⭐ » Diversão',
				desc: 'Pegue seu dinheiro diário.'
			},
			en: {
				nome: 'ship',
				categoria: '⭐ » Fun',
				desc: 'Take your daily money.'
			},
			aliases: ['shippar', 'casal'],
			run: this.run
		};
	}

	async run (ctx) {
		let porcentagem;
		let user1 = ctx.message.author;
		let user2 = ctx.message.mentions[0] || await global.zuly.getRESTUser(ctx.args[0]);

		if (ctx.args[1]) {
			user1 = ctx.message.mentions[0] || await global.zuly.getRESTUser(ctx.args[0]);
			user2 = ctx.message.mentions[1] || await global.zuly.getRESTUser(ctx.args[1]);
		}

		if (!user2) return;

		const ship1 = await global.db.get(`ship-${user1.id}-${user2.id}`);
		const ship2 = await global.db.get(`ship-${user1.id}-${user2.id}`);

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
		foto.fillText(`${nome}`, 2000, 1600);

		ctx.message.channel.createMessage(`💖 ${ctx.message.author.mention} 💖`, {
			file: edit.toBuffer(),
			name: 'ship.png'
		}).then(async msg => {
			if (!ship1 && !ship2) {
				await global.db.set(`ship-${user1.id}-${user2.id}`, porcentagem);
				await global.db.set(`ship-${user2.id}-${user1.id}`, porcentagem);
			}
		});
	}
};
