module.exports = class BaninfoCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['BAN_MEMBERS'],
				bot: ['BAN_MEMBERS'],
				dono: false
			},
			pt: {
				nome: 'baninfo',
				categoria: '🛡️ » Moderação',
				desc: 'Veja a informação de algum ban.'
			},
			en: {
				nome: 'baninfo',
				categoria: '🛡️ » Moderation',
				desc: 'See some ban info.'
			},
			fr: {
				nome: 'baninfo',
				categoria: '🛡️ » Modération',
				desc: 'Voir les informations d\'un ban.'
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
					description: 'The User ID',
					required: true,
					name_localizations: {
						'pt-BR': 'usuario',
						'en-US': 'user',
						'fr': 'utilisateur'
					},
					description_localizations: {
						'pt-BR': 'ID do usuário.',
						'en-US': 'User ID.',
						'fr': 'ID de l\'utilisateur.'
					}
				}
			],
			aliases: ['checkban', 'infoban', 'informação-ban', 'ban-info'],
			run: this.run
		};
	}

	async run (ctx) {
		try {
			if (!ctx.args[0]) {
				return ctx.message.channel.slashReply({
					content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.noarg}`
				});
			}

			const member = await (!ctx.args[0] ? global.zuly.users.fetch(ctx.args[0]).then(info => info) : ctx.args[0]);

			let banReason = ctx.args.splice(1).join(' ');
			if (!banReason) {
				banReason = `${ctx.idioma.ban.mot}`;
			}

			const { MessageButton, MessageActionRow } = require('discord.js');
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('unban')
						.setEmoji('885193463111483412')
						.setLabel(ctx.idioma.labels.unban)
						.setStyle('DANGER')
				);

			const banInfo = await ctx.message.channel.guild.bans.fetch(member);

			const embed = new global.zuly.manager.Ebl();
			embed.setTitle(`🛡️ BanInfo • ${banInfo.user.username}#${banInfo.user.discriminator}`);
			embed.setColor('#ffcbdb');
			embed.addField(`${ctx.idioma.baninfo.user}`, `\`\`\`${banInfo.user.username}#${banInfo.user.discriminator} (${banInfo.user.id})\`\`\``);
			embed.addField(`${ctx.idioma.baninfo.reason}`, `\`\`\`${banInfo.reason}\`\`\``);
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			embed.setThumbnail(banInfo.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()],
				components: [row]
			}).then(async () => {
				const filter = i => i.customId === 'unban' && i.user.id === ctx.message.author.id;
				const collector = ctx.message.channel.createMessageComponentCollector({ filter, time: 180000 });
				collector.on('collect', async (i) => {
					const row = new MessageActionRow()
						.addComponents(
							new MessageButton()
								.setCustomId('unban')
								.setEmoji('885193463111483412')
								.setLabel(ctx.idioma.labels.unban)
								.setStyle('DANGER')
								.setDisabled(true)
						);

					const embed = new global.zuly.manager.Ebl();
					embed.setTitle(`🛡️ BanInfo | ${banInfo.user.username}#${banInfo.user.discriminator}`);
					embed.setColor('#ffcbdb');
					embed.addField(`${ctx.idioma.baninfo.user}`, `\`\`\`${banInfo.user.username}#${banInfo.user.discriminator} (${banInfo.user.id})\`\`\``);
					embed.addField(`${ctx.idioma.baninfo.reason}`, `\`\`\`${banInfo.reason || ctx.idioma.baninfo.noreason}\`\`\``);
					embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
					embed.setThumbnail(banInfo.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
					i.update({
						content: ctx.message.author.mention,
						embeds: [embed.get()],
						components: [row]
					}).then(async () => {
						const motivo = `${ctx.idioma.ban.mot2} ${ctx.message.author.username}#${ctx.message.author.discriminator} - ${ctx.idioma.ban.mot3} BanInfo.`;
						ctx.message.guild.members.unban(banInfo.user.id, motivo);
						await i.followUp(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.the} **${banInfo.user.username}** ${ctx.idioma.ban.foi}`);
					});
				});
			});
		}
		catch (e) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${e.message}`
			});
		}
	}
};

// ADG, Davi e LRD
