module.exports = class ShipCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['ATTACH_FILES'],
				dono: false
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
			options: [
				{
					type: 6,
					name: 'user1',
					description: 'The first ship user.',
					required: true,
					name_localizations: {
						'pt-BR': 'usuario1',
						'en-US': 'user1',
						'fr': 'utilisateur1'
					},
					description_localizations: {
						'pt-BR': 'O primeiro usuário.',
						'en-US': 'The first ship user.',
						'fr': 'Le premier utilisateur.'
					}
				},
				{
					type: 6,
					name: 'user2',
					description: 'The second ship user.',
					required: true,
					name_localizations: {
						'pt-BR': 'usuario2',
						'en-US': 'user2',
						'fr': 'utilisateur2'
					},
					description_localizations: {
						'pt-BR': 'O segundo usuário.',
						'en-US': 'The second ship user.',
						'fr': 'Le second utilisateur.'
					}
				}
			],
			aliases: ['shippar', 'casal'],
			run: this.run
		};
	}

	async run (ctx) {
		let porcentagem;
		let user1 = ctx.message.author;
		let user2 = global.zuly.users.cache.get(ctx.args[0]) ? global.zuly.users.cache.get(ctx.args[0]) : await global.zuly.users.fetch(ctx.args[0]);

		if (ctx.args[1]) {
			user1 = global.zuly.users.cache.get(ctx.args[0]) ? global.zuly.users.cache.get(ctx.args[0]) : await global.zuly.users.fetch(ctx.args[0]);
			user2 = global.zuly.users.cache.get(ctx.args[1]) ? global.zuly.users.cache.get(ctx.args[1]) : await global.zuly.users.fetch(ctx.args[1]);
		}

		if (!user2) {
			user2 = global.zuly.users.random();
		}

		const ship1 = await global.zuly.db.get(`ship-${user1.id}-${user2.id}`);
		const ship2 = await global.zuly.db.get(`ship-${user1.id}-${user2.id}`);

		const nome = user1.username.slice(0, 3) + user2.username.slice(0, 3);

		porcentagem = !ship1 && !ship2 ? Math.floor(Math.random() * 101) : ship1;

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

		const base = await loadImage('./assets/images/profile/ship.png');

		const edit = createCanvas(base.width, base.height);
		const foto = edit.getContext('2d');

		const avatar1 = user1.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });
		const avatar2 = user2.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });

		const img1 = await loadImage(avatar1);
		const img2 = await loadImage(avatar2);

		foto.drawImage(base, 0, 0);
		foto.drawImage(img1, 390, 480, 1200, 1200);
		foto.drawImage(img2, 2440, 480, 1200, 1200);
		foto.drawImage(base, 0, 0);

		foto.font = '430px Lemon-Brownies';
		foto.fillStyle = '#7149cd';
		foto.fillText(`${porcentagem}%`, 1650, 1300);
		foto.font = '200px Lemon-Brownies';
		foto.fillStyle = '#ffffff';
		foto.fillText(`${nome}`, 1650, 2100);

		const { MessageAttachment } = require('discord.js');
		const attachment = new MessageAttachment(edit.toBuffer(), 'ship.png');

		let description;

		if (porcentagem <= 23) {
			description = `${ctx.idioma.ship.d1}`;
		  }

		  if (porcentagem > 23 && porcentagem <= 47) {
			description = `${ctx.idioma.ship.d2}`;
		  }

		  if (porcentagem > 47 && porcentagem <= 80) {
			description = `${ctx.idioma.ship.d3}`;
		  }

		  if (porcentagem > 80) {
			description = `${ctx.idioma.ship.d4}`;
		  }

		ctx.message.channel.slashReply({
			content: `💖 ${ctx.message.author.mention} 💖\n<:zu_yay:892019273323663420> \`${user1.username}\` + \`${user2.username}\` = \`${nome}\`\n<:zu_sad_cat_joinha:890676282487095316> ${description}`,
			files: [attachment],
		}).then(async () => {
			if (!ship1 && !ship2) {
				await global.zuly.db.set(`ship-${user1.id}-${user2.id}`, porcentagem);
				await global.zuly.db.set(`ship-${user2.id}-${user1.id}`, porcentagem);
			}
		});
	}
};
