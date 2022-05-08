module.exports = class BackgroundCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'banner',
				categoria: '💰 » Economia',
				desc: 'Troca o plano de fundo de seu perfil.'
			},
			en: {
				nome: 'background',
				categoria: '💰 » Economy',
				desc: 'Change your profile background.'
			},
			fr: {
				nome: 'bannière',
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
					description: 'Your profile picture link.',
					required: false,
					name_localizations: {
						'pt-BR': 'link',
						'en-US': 'link',
						'fr': 'lien'
					},
					description_localizations: {
						'pt-BR': 'Link da sua foto de perfil.',
						'en-US': 'Your profile picture link.',
						'fr': 'Lien de votre photo de profil.'
					}
				}
			],
			aliases: ['about', 'sobre', 'sobremim'],
			run: this.run
		};
	}

	async run (ctx) {
		if (ctx.args[0]) {
			console.log(ctx.args[0]);
			const premium = await global.zuly.getPremium('doador', ctx.message.author.id);
			setTimeout(async () => {
				if (premium === false) {
					return ctx.message.channel.slashReply({
						content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.premium}`
					});
				}
				else {
					await global.zuly.db.set(`background-${ctx.message.author.id}`, ctx.args[0]);
					ctx.message.channel.slashReply({
						content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.perfil.sep}`
					});
				}
			}, 1000);
		}
		else {
			const background = require('../../Config/backgrounds');
			const rand = Math.floor(Math.random() * background.backgrounds.length);
			const tema = background.backgrounds[rand];

			const { MessageButton, MessageActionRow } = require('discord.js');
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('buy')
						.setEmoji('💰')
						.setLabel(ctx.idioma.labels.buy)
						.setStyle('SUCCESS')
				);

			const embed = new ctx.embed();
			embed.setDescription(ctx.idioma.perfil.comp + ` ** | ${Number(tema.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}**`);
			embed.setImage(tema.url);
			embed.setColor('#ffcbdb');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()],
				components: [row]
			}).then(() => {
				const filter = i => i.customId === 'buy' && i.user.id === ctx.message.author.id;
				const collector = ctx.message.channel.createMessageComponentCollector({ filter, time: 180000 });
				collector.on('collect', async (i) => {
					const money = await global.zuly.db.get(`money-${ctx.message.author.id}`);
					if (!money) return ctx.message.channel.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.perfil.no}`);
					if (Number(money) < Number(tema.value)) return ctx.message.channel.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.perfil.no}`);
					await global.zuly.db.set(`background-${ctx.message.author.id}`, tema.url);
					await global.zuly.db.set(`money-${ctx.message.author.id}`, Number(money) - tema.value);

					const { MessageButton, MessageActionRow } = require('discord.js');
					const row = new MessageActionRow()
						.addComponents(
							new MessageButton()
								.setCustomId('buy')
								.setEmoji('💰')
								.setLabel(ctx.idioma.labels.buy)
								.setStyle('SUCCESS')
								.setDisabled(true)
						);

					const embed = new ctx.embed();
					embed.setDescription(ctx.idioma.perfil.comp + ` ** | ${Number(tema.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}**`);
					embed.setImage(tema.url);
					embed.setColor('#ffcbdb');
					embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
					i.update({
						content: ctx.message.author.mention,
						embeds: [embed.get()],
						components: [row]
					}).then(async () => {
						await i.followUp(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.perfil.succ}`);
					});
				});
			});
		}
	}
};
