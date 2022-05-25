/* eslint-disable */
module.exports = class DashboardCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD'],
				bot: []
			},
			pt: {
				nome: 'dashboard',
				categoria: '⚙️ » Configuração',
				desc: 'Configure o pelo conforto do seu servidor!'
			},
			en: {
				nome: 'dashboard',
				categoria: '⚙️ » Configuration',
				desc: 'Set it up from the comfort of your server!'
			},
			fr: {
				nome: 'dashboard',
				categoria: '⚙️ » Configuration',
				desc: 'Configurez-le depuis le confort de votre serveur!'
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
			aliases: [],
			run: this.run
		};
	}
	async run (ctx) {
		const {
			MessageActionRow,
			MessageButton
		} = require('discord.js');
		const firstRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('geral')
					.setEmoji('979025660834119690')
					.setLabel(ctx.idioma.discboard.labels.config)
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('logs')
					.setEmoji('📋')
					.setLabel(ctx.idioma.discboard.labels.logs)
					.setStyle('PRIMARY'),
			);
		const embed = new ctx.embed();
		embed.setTitle(ctx.idioma.discboard.title.replace('{{bot}}', global.zuly.user.username));
		embed.setDescription(ctx.idioma.discboard.description);
		embed.setColor('#ffcbdb');
		embed.setThumbnail(global.zuly.user.displayAvatarURL({
			dynamic: true,
			format: 'png',
			size: 4096
		}));
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({
			dynamic: true,
			format: 'png',
			size: 4096
		}));
		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			embeds: [embed.get()],
			components: [firstRow]
		}).then(async () => {
			const geralFilter = i => i.customId === 'geral' && i.user.id === ctx.message.author.id;
			const geralCollector = ctx.message.channel.createMessageComponentCollector({
				geralFilter,
				time: 180000
			});

			const logsFilter = i => i.customId === 'geral' && i.user.id === ctx.message.author.id;
			const logsCollector = ctx.message.channel.createMessageComponentCollector({
				geralFilter,
				time: 180000
			});

			geralCollector.on('collect', async (i) => {
				geralCollector.stop();
				const secondRow = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId('autorole')
							.setEmoji('933096931197071380')
							.setLabel(ctx.idioma.discboard.geral.fields.autorole.label)
							.setStyle('DANGER'),
						new MessageButton()
							.setCustomId('idioma')
							.setEmoji('🌎')
							.setLabel(ctx.idioma.discboard.geral.fields.idioma.label)
							.setStyle('DANGER'),
						new MessageButton()
							.setCustomId('automod')
							.setEmoji('885193463111483412')
							.setLabel(ctx.idioma.discboard.geral.fields.automod.label)
							.setStyle('DANGER'),
						new MessageButton()
							.setCustomId('nqn')
							.setEmoji('885919779205029898')
							.setLabel(ctx.idioma.discboard.geral.fields.notquitenitro.label)
							.setStyle('DANGER'),
					);
				const embed = new ctx.embed();
				embed.setTitle(ctx.idioma.discboard.title.replace('{{bot}}', global.zuly.user.username));
				embed.setDescription(ctx.idioma.discboard.description);
				embed.setColor('#ffcbdb');
				embed.addField('<:zu_staffdc:933096931197071380> ' + ctx.idioma.discboard.geral.fields.autorole.label, ctx.idioma.discboard.geral.fields.autorole.description, true);
				embed.addField('🌎 ' + ctx.idioma.discboard.geral.fields.idioma.label, ctx.idioma.discboard.geral.fields.idioma.description, true);
				embed.addField('_ _', '_ _', true);
				embed.addField('<:zu_certifiedmod:885193463111483412> ' + ctx.idioma.discboard.geral.fields.automod.label, ctx.idioma.discboard.geral.fields.automod.description, true);
				embed.addField('<:zu_nitro:885919779205029898> ' + ctx.idioma.discboard.geral.fields.notquitenitro.label, ctx.idioma.discboard.geral.fields.notquitenitro.description, true);
				embed.setThumbnail(global.zuly.user.displayAvatarURL({
					dynamic: true,
					format: 'png',
					size: 4096
				}));
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({
					dynamic: true,
					format: 'png',
					size: 4096
				}));
				i.update({
					content: ctx.message.author.mention,
					embeds: [embed.get()],
					components: [secondRow]
				}).then(async () => {
					const autoroleFilter = i => i.customId === 'autorole' && i.user.id === ctx.message.author.id;
					const autoroleCollector = ctx.message.channel.createMessageComponentCollector({
						autoroleFilter,
						time: 180000
					});

					const idiomaFilter = i => i.customId === 'idioma' && i.user.id === ctx.message.author.id;
					const idiomaCollector = ctx.message.channel.createMessageComponentCollector({
						idiomaFilter,
						time: 180000
					});

					const automodFilter = i => i.customId === 'automod' && i.user.id === ctx.message.author.id;
					const automodCollector = ctx.message.channel.createMessageComponentCollector({
						automodFilter,
						time: 180000
					});

					const nqnFilter = i => i.customId === 'nqn' && i.user.id === ctx.message.author.id;
					const nqnCollector = ctx.message.channel.createMessageComponentCollector({
						nqnFilter,
						time: 180000
					});

					autoroleCollector.on('collect', async (i) => {
						autoroleCollector.stop();
						const thirdRow = new MessageActionRow()
							.addComponents(
								new MessageButton()
									.setCustomId('autorole_bot')
									.setEmoji('979034461939318804')
									.setLabel(ctx.idioma.discboard.geral.fields.autorolebot.label)
									.setStyle('DANGER'),
								new MessageButton()
									.setCustomId('autorole_user')
									.setEmoji('936975701322633256')
									.setLabel(ctx.idioma.discboard.geral.fields.autoroleuser.label)
									.setStyle('DANGER'),
								new MessageButton()
									.setCustomId('autoroledelete')
									.setEmoji('🗑️')
									.setLabel(ctx.idioma.discboard.geral.fields.autoroledelete.label)
									.setStyle('DANGER')
							);
						const embed = new ctx.embed();
						embed.setTitle(ctx.idioma.discboard.title.replace('{{bot}}', global.zuly.user.username));
						embed.setDescription(ctx.idioma.discboard.geral.fields.autorole.description);
						embed.setColor('#ffcbdb');
						embed.setThumbnail(global.zuly.user.displayAvatarURL({
							dynamic: true,
							format: 'png',
							size: 4096
						}));
						embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({
							dynamic: true,
							format: 'png',
							size: 4096
						}));
						i.update({
							content: ctx.message.author.mention,
							embeds: [embed.get()],
							components: [thirdRow]
						}).then(async () => {
							const autorolebotFilter = i => i.customId === 'autorole_bot' && i.user.id === ctx.message.author.id;
							const autorolebotCollector = await ctx.message.channel.createMessageComponentCollector({
								autorolebotFilter,
								time: 180000
							});

							const autoroleuserFilter = i => i.customId === 'autorole_user' && i.user.id === ctx.message.author.id;
							const autoroleuserCollector = await ctx.message.channel.createMessageComponentCollector({
								autoroleuserFilter,
								time: 180000
							});

							autorolebotCollector.on('collect', async (i) => {
								autorolebotCollector.stop();
								const embed = new ctx.embed();
								embed.setTitle(ctx.idioma.discboard.title.replace('{{bot}}', global.zuly.user.username));
								embed.setDescription(ctx.idioma.discboard.geral.fields.autorolebot.collector);
								embed.setColor('#ffcbdb');
								embed.setThumbnail(global.zuly.user.displayAvatarURL({
									dynamic: true,
									format: 'png',
									size: 4096
								}));
								embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({
									dynamic: true,
									format: 'png',
									size: 4096
								}));
								await i.update({
									content: ctx.message.author.mention,
									embeds: [embed.get()],
									components: []
								}).then(async () => {
									const filter = m => m.author.id === ctx.message.author.id;
									const messageCollector = ctx.message.channel.createMessageCollector({
										filter,
										time: 180000
									});
									messageCollector.on('collect', async (message) => {
										messageCollector.stop();
										message.delete();
										const botRoles = [];
										message.mentions.roles.forEach(async (role) => {
											botRoles.push(role.id);
										});
										const embed = new ctx.embed();
										embed.setTitle(ctx.idioma.discboard.title.replace('{{bot}}', global.zuly.user.username));
										embed.setDescription(ctx.idioma.discboard.geral.fields.autorolebot.set.replace('{{roles}}', botRoles.map(i => `<@&${i}>`).join(', ')));
										embed.setColor('#ffcbdb');
										embed.setThumbnail(global.zuly.user.displayAvatarURL({
											dynamic: true,
											format: 'png',
											size: 4096
										}));
										embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({
											dynamic: true,
											format: 'png',
											size: 4096
										}));
										await ctx.message.channel.slashReply({
											content: ctx.message.author.mention,
											embeds: [embed.get()],
											components: []
										}).then(async (msg) => {
											await global.zuly.db.set(`autorolebot-${ctx.message.guild.id}`, botRoles);
											msg.react('✅');
										});
									});
								});
							});

							autoroleuserCollector.on('collect', async (i) => {
								autoroleuserCollector.stop();
								const embed = new ctx.embed();
								embed.setTitle(ctx.idioma.discboard.title.replace('{{bot}}', global.zuly.user.username));
								embed.setDescription(ctx.idioma.discboard.geral.fields.autoroleuser.collector);
								embed.setColor('#ffcbdb');
								embed.setThumbnail(global.zuly.user.displayAvatarURL({
									dynamic: true,
									format: 'png',
									size: 4096
								}));
								embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({
									dynamic: true,
									format: 'png',
									size: 4096
								}));
								await i.update({
									content: ctx.message.author.mention,
									embeds: [embed.get()],
									components: []
								}).then(async () => {
									const filter = m => m.author.id === ctx.message.author.id;
									const messageCollector = ctx.message.channel.createMessageCollector({
										filter,
										time: 180000
									});
									messageCollector.on('collect', async (message) => {
										messageCollector.stop();
										message.delete();
										const botRoles = [];
										message.mentions.roles.forEach(async (role) => {
											botRoles.push(role.id);
										});
										const embed = new ctx.embed();
										embed.setTitle(ctx.idioma.discboard.title.replace('{{bot}}', global.zuly.user.username));
										embed.setDescription(ctx.idioma.discboard.geral.fields.autoroleuser.set.replace('{{roles}}', botRoles.map(i => `<@&${i}>`).join(', ')));
										embed.setColor('#ffcbdb');
										embed.setThumbnail(global.zuly.user.displayAvatarURL({
											dynamic: true,
											format: 'png',
											size: 4096
										}));
										embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({
											dynamic: true,
											format: 'png',
											size: 4096
										}));
										await ctx.message.channel.slashReply({
											content: ctx.message.author.mention,
											embeds: [embed.get()],
											components: []
										}).then(async (msg) => {
											await global.zuly.db.set(`autoroleuser-${ctx.message.guild.id}`, botRoles);
											msg.react('✅');
										});
									});
								});
							});
						});
					});
				});
			});
		});
	}
};