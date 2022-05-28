module.exports = class UserCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'user',
				categoria: '🕰️ » Utilidades',
				desc: 'Comandos relacionados a usuários.'
			},
			en: {
				nome: 'user',
				categoria: '🕰️ » Utility',
				desc: 'User-related commands.'
			},
			fr: {
				nome: 'user',
				categoria: '🕰️ » Utilitaires',
				desc: 'Commandes liées à l\'utilisateur.'
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
					type: 1,
					name: 'info',
					description: 'Veja informações sobre um usuário.',
					required: false,
					name_localizations: {
						'pt-BR': 'info',
						'en-US': 'info',
						'fr': 'info'
					},
					description_localizations: {
						'pt-BR': 'Veja informações sobre um usuário.',
						'en-US': 'See user information.',
						'fr': 'Voir les informations de l\'utilisateur.'
					},
					options: [
						{
							type: 6,
							name: 'user',
							description: 'O usuário que você quer ver as informações.',
							require: false,
							name_localizations: {
								'pt-BR': 'user',
								'en-US': 'user',
								'fr': 'user'
							},
							description_localizations: {
								'pt-BR': 'The user you want to see information.',
								'en-US': 'The user you want to see information.',
								'fr': 'L\'utilisateur que vous souhaitez voir les informations.'
							}
						}
					]
				},
				{
					type: 1,
					name: 'avatar',
					description: 'Veja o avatar de um usuário.',
					required: false,
					name_localizations: {
						'pt-BR': 'avatar',
						'en-US': 'avatar',
						'fr': 'avatar'
					},
					description_localizations: {
						'pt-BR': 'Veja o avatar de um usuário.',
						'en-US': 'See the avatar of a user.',
						'fr': 'Voir l\'avatar d\'un utilisateur.'
					},
					options: [
						{
							type: 6,
							name: 'user',
							description: 'O usuário que você quer ver o avatar.',
							require: false,
							name_localizations: {
								'pt-BR': 'user',
								'en-US': 'user',
								'fr': 'user'
							},
							description_localizations: {
								'pt-BR': 'The user you want to see the avatar.',
								'en-US': 'The user you want to see the avatar.',
								'fr': 'L\'utilisateur que vous souhaitez voir l\'avatar.'
							}
						},
					]
				},
				{
					type: 1,
					name: 'banner',
					description: 'Veja o banner de um usuário.',
					required: false,
					name_localizations: {
						'pt-BR': 'banner',
						'en-US': 'banner',
						'fr': 'banner'
					},
					description_localizations: {
						'pt-BR': 'Veja o banner de um usuário.',
						'en-US': 'See the banner of a user.',
						'fr': 'Voir le banner d\'un utilisateur.'
					},
					options: [
						{
							type: 6,
							name: 'user',
							description: 'O usuário que você quer ver o banner.',
							require: false,
							name_localizations: {
								'pt-BR': 'user',
								'en-US': 'user',
								'fr': 'user'
							},
							description_localizations: {
								'pt-BR': 'The user you want to see the banner.',
								'en-US': 'The user you want to see the banner.',
								'fr': 'L\'utilisateur que vous souhaitez voir le banner.'
							}
						},
					]
				},
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const { MessageButton, MessageActionRow } = require('discord.js');
		let user;
		if (ctx.args[1]) {
			user = global.zuly.users.cache.get(ctx.args[1]) ? global.zuly.users.cache.get(ctx.args[1]) : await global.zuly.users.fetch(ctx.args[1], {
				force: true
			});
		}
		else {
			user = ctx.message.author;
		}
		if (ctx.args[0] === 'info') {
			const badges = await global.zuly.getUserBadges(user);
			const embed = new ctx.embed();
			embed.setTitle(user.tag);
			embed.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 }));
			embed.setColor('#ffcbdb');
			embed.addField(`🎖️ ${ctx.idioma.userinfo.badges} __${user.username}__`, `${user.avatar.startsWith('a_') ? `<:zu_nitro:885919779205029898> ${badges}` : `<:zu_basic:885925886837264384> ${badges}`}`, true);
			embed.addField(`📘 ${ctx.idioma.userinfo.tag} __${user.username}__`, `\`${user.username}#${user.discriminator}\``, true);
			embed.addField(`📚 ${ctx.idioma.userinfo.id} __${user.username}__`, `\`${user.id}\``, true);
			embed.addField(`<:zu_info:911303533859590144> ${ctx.idioma.userinfo.hash}`, `\`\`\`${user.avatar}\`\`\``, true);
			embed.addField(`📆 ${ctx.idioma.userinfo.create}`, `<t:${Math.floor(user.createdAt / 1000)}>`, true);
			if (user.banner) {
				embed.setImage(`https://cdn.discordapp.com/banners/${user.id}/${user.banner}?size=4096`);
			}
			const member = await ctx.message.guild.members.cache.get(user.id);
			if (member) {
				embed.addField('<:zu_join:979479063116804186> Entrou dia:', `<t:${Math.floor(member.joinedTimestamp / 1000)}>`, true);
				const row = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId('nextpage')
							.setEmoji('936975701322633256')
							.setLabel(ctx.idioma.userinfo.more)
							.setStyle('PRIMARY')
					);
				ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()],
					components: [row]
				}).then(async () => {
					const filter = i => i.customId === 'nextpage' && i.user.id === ctx.message.author.id;
					const collector = ctx.message.channel.createMessageComponentCollector({ filter, time: 180000 });
					collector.on('collect', async i => {
						collector.stop();
						const embed = new ctx.embed();
						embed.setTitle(member.nickname ? member.nickname : user.tag);
						embed.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 }));
						embed.setColor('#ffcbdb');
						embed.addField(`<:zu_roles:979865516720156672> ${ctx.idioma.userinfo.roles}`, `\`${member.roles.cache.map(r => r.name).join(', ')}\``);
						embed.addField(`<:zu_perms:979865807980990535> ${ctx.idioma.userinfo.perms}`, `\`${member.permissions.toArray().join(', ')}\``);
						i.reply({
							content: ctx.message.author.mention,
							embeds: [embed.get()]
						});
					});
				});
			}
			else {
				const row = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId('nextpage')
							.setEmoji('😔')
							.setLabel(ctx.idioma.userinfo.off)
							.setStyle('SECONDARY')
							.setDisabled(true)
					);
				ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()],
					components: [row]
				});
			}
		}
		if (ctx.args[0] === 'avatar') {
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setLabel(ctx.idioma.avatar.click)
						.setStyle('LINK')
						.setURL(user.displayAvatarURL({ dynamic: true, size: 4096 }))
				);
			const embed = new ctx.embed();
			embed.setTitle(`${ctx.idioma.avatar.title} __${user.username}#${user.discriminator}__`);
			embed.setColor('#ffcbdb');
			embed.setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }));
			embed.setFooter(ctx.message.author.id === user.id ? '⤷ ' + ctx.idioma.avatar.footer : '⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()],
				components: [row]
			});
		}
		if (ctx.args[0] === 'banner') {
			const hex = await global.zuly.userBannerColor(user.displayAvatarURL({ dynamic: false, format: 'png', size: 4096 }));
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setLabel(ctx.idioma.avatar.click)
						.setStyle('LINK')
						.setURL(user.banner ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}?size=4096` : `https://singlecolorimage.com/get/${hex.replace('#', '')}/600x240`)
				);
			const embed = new ctx.embed();
			embed.setTitle(`${ctx.idioma.avatar.title.replace('Avatar', 'Banner')} __${user.username}#${user.discriminator}__`);
			embed.setDescription(`> <:zu_download:890281922331291698> ${ctx.idioma.avatar.hex} **${hex}**`);
			embed.setColor('#ffcbdb');
			embed.setImage(user.banner ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}?size=4096` : `https://singlecolorimage.com/get/${hex.replace('#', '')}/600x240`);
			embed.setFooter(ctx.message.author.id === user.id ? '⤷ ' + ctx.idioma.avatar.footer : '⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			ctx.message.channel.slashReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()],
				components: [row]
			});
		}
	}
};