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
				}
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const { MessageButton, MessageActionRow } = require('discord.js');
		if (ctx.args[0] === 'info') {
			let user;
			if (ctx.args[1]) {
				user = global.zuly.users.cache.get(ctx.args[1]) ? global.zuly.users.cache.get(ctx.args[1]) : await global.zuly.users.fetch(ctx.args[1], {
					force: true
				});
			}
			else {
				user = ctx.message.author;
			}
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
	}
};