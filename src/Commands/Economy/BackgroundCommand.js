module.exports = class BackgroundCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'background',
				categoria: '💰 » Economia',
				desc: 'Troca o plano de fundo de seu perfil.'
			},
			en: {
				nome: 'background',
				categoria: '💰 » Economy',
				desc: 'Change your profile background.'
			},
			fr: {
				nome: 'contexte',
				categoria: '💰 » Économie',
				desc: 'Modifiez l\'arrière-plan de votre profil.'
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
					name: 'link',
					description: 'Write your about me',
					required: false
				}
			],
			aliases: ['about', 'sobre', 'sobremim'],
			run: this.run
		};
	}

	async run (ctx) {
		if (ctx.args[0]) {
			const premium = await global.zuly.getPremium('doador', ctx.message.author.id);
			if (!premium) {
				return ctx.message.channel.slashReply({
					content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.premium}`
				});
			};
			await global.zuly.db.set(`background-${ctx.message.author.id}`, ctx.args[0]);
			ctx.message.channel.slashReply({
				content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.perfil.sep}`
			});
		}
		else {
			const background = require('../../Config/backgrounds');
			const rand = Math.floor(Math.random() * background.backgrounds.length);
			const tema = background.backgrounds[rand];

			const embed = new ctx.embed();
			embed.setDescription(ctx.idioma.perfil.comp + ` ** | ⭐ ${tema.value}**`);
			embed.setImage(tema.url);
			embed.setColor('#ffcbdb');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			}).then((msg) => {
				msg.react('🛒');
				const { ReactionCollector } = require('discord.js');
				const collector = new ReactionCollector(msg, (reaction, user) => reaction.emoji.name === '🛒' && user.id === ctx.message.author.id, { time: 30000 });
				collector.on('collect', async (reaction, user) => {
					if (reaction.emoji.name === '🛒' && user.id === ctx.message.author.id) {
						const money = await global.zuly.db.get(`money-${ctx.message.author.id}`);
						if (!money) return ctx.message.channel.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.perfil.no}`);
						if (Number(money) < Number(tema.value)) return ctx.message.channel.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.perfil.no}`);
						await global.zuly.db.set(`background-${ctx.message.author.id}`, tema.url);
						ctx.message.channel.send(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.perfil.succ}`);
						collector.stop();
					}
				});
			});
		}
	}
};
