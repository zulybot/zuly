/* eslint-disable no-empty-pattern */
module.exports = class InteractionEvent {
	constructor () {
		return {
			nome: 'interactionCreate',
			run: this.run
		};
	}
	async run (interaction) {
		const Eris = require('eris');
		try {
			if (interaction instanceof Eris.ComponentInteraction) {

				let idioma = require('../Config/idiomas.js');
				let lang = await global.db.get(`idioma-${interaction.channel.guild.id}`) || 'pt_br';
				lang = lang.replace(/-/g, '_');
				idioma = idioma[lang];

				const axios = require('axios');
				if (interaction.data.custom_id == 'open-ticket') {

					let allChannels = interaction.channel.guild.channels.filter(m => [0].includes(m.type) && m.name.includes('ticket-')).map(m => m.name.split('ticket-')[1]);
					let already = allChannels.some(v => interaction.member.user.id == v);

					console.log(allChannels);

					if (already === true) {
						return interaction.createMessage({
							content: `:x: <@${interaction.member.user.id}> **|** ${idioma.ticket.already}`,
							flags: 64
						});
					}

					const GuildID = interaction.channel.guild.id;
					global.zuly.createChannel(GuildID, `ticket-${interaction.member.user.id}`, 0, {
						permissionOverwrites: [{
							id: interaction.member.user.id,
							type: 1,
							allow: 3072
						},
						{
							id: GuildID,
							type: 0,
							deny: 1024
						}
						],
						type: 'text',
					}).then(async (channel) => {

						await interaction.createMessage({
							content: `✅ <@${interaction.member.user.id}> **|** ${idioma.ticket.created} <#${channel.id}>`,
							flags: 64
						});

						return global.zuly.createMessage(channel.id, {
							embed: {
								title: `<:zu_ticket:890950181120507935> Ticket | ${global.zuly.user.username}`,
								description: `> ${idioma.ticket.await}`,
								color: 0x7289DA,
							},
							content: `<@${interaction.member.user.id}>`,
							components: [{
								type: 1,
								components: [{
									type: 2,
									emoji: {
										name: '🔒'
									},
									label: idioma.ticket.labels.delete,
									style: 2,
									custom_id: 'close-ticket'
								}]
							}]
						});
					});
				}
				else if (interaction.data.custom_id == 'close-ticket') {
					axios.post(`https://discord.com/api/v8/interactions/${interaction.id}/${interaction.token}/callback`, {
						type: 7,
						data: {
							components: []
						}
					});

					setTimeout(() => {
						global.zuly.deleteChannel(interaction.channel.id, 'Closed-ticket');
					}, 10000);

					global.zuly.createMessage(interaction.channel.id, {
						embed: {
							title: `<:zu_ticket:890950181120507935> Ticket | ${global.zuly.user.username}`,
							description: `> ${idioma.ticket.delete}`,
							color: 0x7289DA,
						},
						content: `<@${interaction.member.user.id}>`
					});
				}
			}
		}
		catch (e) {
			console.log(e);
		}
		if (interaction instanceof Eris.CommandInteraction) {
			try {
				const command = global.zuly.commands.get(interaction.data.name);
				interaction.mentions = [];
				interaction.mention_everyone = false;
				if (interaction.data && interaction.data.resolved && interaction.data.resolved.roles) {
					interaction.mention_roles = interaction.data.resolved.roles;
				}
				if (interaction.data && interaction.data.resolved && interaction.data.resolved.users) {
					for (const {} in interaction.data.resolved.users) {
						interaction.data.resolved.users.map(async (user) => {
							interaction.mentions.push(user);
						});
					}
				  }
				const args = interaction.data.options ?
					interaction.data.options.map((i) => {
						switch (i.type) {
							case 8:
								return `<@&${i.value}>`;
							case 6:
								return `<@!${i.value}>`;
							case 7:
								return `<#${i.value}>`;
							default:
								return i.value;
						}
					}) : [];

				interaction.content = (interaction.data.name + ' ' + args.join(' ')).trim();
				interaction.author = interaction.member.user;

				const msg = interaction;
				let idioma = require('../Config/idiomas.js');
				let lang = await global.db.get(`idioma-${msg.guildID}`) || 'pt_br';
				lang = lang.replace(/-/g, '_');
				idioma = idioma[lang];

				const prefix = await global.db.get(`prefix-${msg.channel.guild.id}`) ? global.db.get(`prefix-${msg.channel.guild.id}`) : '/';
				msg.channel.slashReply = interaction.createMessage.bind(interaction);
				global.zuly.statcord.postCommand(interaction.data.name, msg.author.id);

				if (command.permissoes) {
					if (command.permissoes.membro.length) {
						if (!command.permissoes.membro.every(p => msg.channel.guild.members.get(msg.author.id).permissions.has(p))) {
							return msg.channel.slashReply({
								content: `:x: ${msg.author.mention} **|** ${idioma.message.user} \`${command.permissoes.membro}\`.`,
								flags: 64
							});
						}
					}
					if (command.permissoes.bot.length) {
						if (!command.permissoes.bot.every(p => msg.channel.guild.members.get(global.zuly.user.id).permissions.has(p))) {
							return msg.channel.slashReply({
								content: `:x: ${msg.author.mention} **|** ${idioma.message.bot} \`${command.permissoes.bot}\`.`,
								flags: 64
							});
						}
					}
					if (command.permissoes.nsfw) {
						if (!msg.channel.nsfw) {
							return msg.channel.slashReply({
								content: `:x: ${msg.author.mention} **|** ${idioma.message.nsfw}`,
								flags: 64
							});
						}
					}
					if (command.permissoes.dono) {
						const developers = await global.db.get('devs');
						if (!developers) {
							await global.db.set('devs', ['726449359167684734', '392087996821667841', '699416429338034268']);
						}

						if (!developers.includes(msg.member.id)) {
							return msg.channel.slashReply({
								content: `:x: ${msg.author.mention} **|** ${idioma.message.dev}.`,
								flags: 64
							});
						}
					}
				}
				this.ctx = {
					id: msg.id,
					user: msg.author,
					userTag: msg.author.tag,
					userId: msg.author.id,
					member: msg.member,
					memberTag: msg.member.tag,
					memberId: msg.member.id,
					idioma: idioma,
					prefix: prefix,
					args: args,
					message: msg,
					ephemeral: 64,
					embed: require('../Client/EmbedBuilder').Embed,
					// Functions
					send: function(texto) {
						msg.channel.slashReply(...texto);
					},
					reply: function(texto) {
						msg.channel.slashReply(...texto);
					},
					addReaction: function(emoji) {
						msg.addReaction(emoji);
					},
					fetch: async function(url) {
						await global.zuly.manager.fetch(url);
					}
				};
				try {
					await command.run(this.ctx).then(async () => {
						const system = require('../Config/system');

						const moment = require('moment');
						const owner = await global.zuly.getRESTUser(msg.channel.guild.ownerID);
						const embed = new global.zuly.manager.Ebl();

						embed.setTitle('<:zu_slash:886681118470987967> Slash Commands');
						embed.setColor('#ffcbdb');
						embed.setDescription(`>>> 🌎 **Servidor:** \`${msg.channel.guild.name}\`\n🧭 **ID:** \`${msg.channel.guild.id}\`\n👑 **Dono:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n🔍 **Membros:** \`${msg.channel.guild.memberCount} members\`\n<a:zu_booster:880862453712429098> **Boosts:** \`${msg.channel.guild.premiumSubscriptionCount} boosts\`\n:calendar: **Criado em:** \`${moment(msg.channel.guild.createdAt).format('📆 DD/MM/YY')} | ${moment(msg.channel.guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Idioma:** \`${msg.channel.guild.preferredLocale}\`\n<:zu_slash:886681118470987967> **Comando:** \`${interaction.data.name}\`\n💻 **Argumentos:** \`${args.slice(0, 1024) || 'Não Tem'}\``);
						embed.addField('<:zu_membros:885214377182109696> **Usuário:**', `>>> 📘 **Informações:** \`${msg.author.username}#${msg.author.discriminator} [${msg.author.id}]\`\n📆 **Criação da conta:** <t:${Math.floor(msg.author.createdAt / 1000)}>`);
						embed.setThumbnail(global.zuly.user.avatarURL);
						embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);

						await global.zuly.executeWebhook(system.command.id, system.command.token, {
							avatarURL: global.zuly.user.avatarURL,
							username: global.zuly.user.username,
							embeds: [embed.get()]
						});
					});
				}
				catch (e) {
					const system = require('../Config/system');

					const errorMessage = e.stack.length > 1800 ? `${e.stack.slice(0, 1800)}...` : e.stack;
					const embed = new global.zuly.manager.Ebl();
					embed.setTitle(`<:zu_error:900785481283944500> ${idioma.message.e}`);
					embed.setColor('#ff0000');
					embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``);
					embed.addField(`<:zu_bughunter_1:885918998426951721> ${idioma.message.e2}`, idioma.message.e3);
					embed.setThumbnail(global.zuly.user.avatarURL);
					embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);

					msg.channel.slashReply({
						content: msg.author.mention,
						embeds: [embed.get()]
					});

					const moment = require('moment');
					const owner = await global.zuly.getRESTUser(msg.channel.guild.ownerID);

					const embed2 = new global.zuly.manager.Ebl();
					embed2.setTitle(`<:zu_error:900785481283944500> ${idioma.message.e}`);
					embed2.setDescription(`\`\`\`js\n${errorMessage}\`\`\``);
					embed2.addField('<:zu_bughunter_1:885918998426951721> Resolvam!', `>>> 🌎 **Servidor:** \`${msg.channel.guild.name}\`\n🧭 **ID:** \`${msg.channel.guild.id}\`\n👑 **Dono:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n🔍 **Membros:** \`${msg.channel.guild.memberCount} members\`\n<a:zu_booster:880862453712429098> **Boosts:** \`${msg.channel.guild.premiumSubscriptionCount} boosts\`\n:calendar: **Criado em:** \`${moment(msg.channel.guild.createdAt).format('📆 DD/MM/YY')} | ${moment(msg.channel.guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Idioma:** \`${msg.channel.guild.preferredLocale}\`\n<:zu_slash:886681118470987967> **Comando:** \`${interaction.data.name}\`\n💻 **Argumentos:** \`${args.slice(0, 1024) || 'Não Tem'}\``);
					embed2.setColor('#ff0000');
					embed2.setThumbnail(global.zuly.user.avatarURL);
					embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);

					await global.zuly.executeWebhook(system.error.id, system.error.token, {
						avatarURL: global.zuly.user.avatarURL,
						username: global.zuly.user.username,
						content: '<@&886680759237226556>',
						embeds: [embed2.get()]
					});
				}
			}
			catch (e) {
				console.log(e);
			}
		}
	}
};