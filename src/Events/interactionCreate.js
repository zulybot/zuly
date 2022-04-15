/* eslint-disable no-empty-pattern */
module.exports = class InteractionEvent {
	constructor () {
		return {
			nome: 'interactionCreate',
			run: this.run
		};
	}
	async run (interaction) {
		const { WebhookClient } = require('discord.js');
		if (!interaction.isCommand()) return;
		await interaction.deferReply();
		if (!interaction.guild) {
			return interaction.editReply({
				content: ':x: **|** Slash commands cannot be used via direct message.',
				ephemeral: true
			});
		};
		const blacklist = await global.zuly.db.get(`botban-${interaction.member.user.id}`);
		if (blacklist) {
			const msg = interaction;
			msg.author = msg.user;
			msg.author.mention = `<@${msg.author.id}>`;
			let idioma = require('../Config/idiomas.js');
			let lang = await global.zuly.db.get(`idioma-${msg.guild.id}`) || 'pt_br';
			lang = lang.replace(/-/g, '_');
			idioma = idioma[lang];
			const embed = new global.zuly.manager.Ebl();
			embed.setTitle(`<:zu_banCat:933106129871966228> ${idioma.botban.title} | ${global.zuly.user.username}`);
			embed.setDescription(`${idioma.botban.description.replace('%z', global.zuly.user.username).replace('%r', blacklist)}`);
			embed.setColor('#ff0000');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
			return interaction.editReply({
				content: `<@${interaction.member.user.id}>`,
				embeds: [embed.get()]
			});
		}
		try {
			const command = global.zuly.commands.get(interaction.commandName);
			if (!command) {
				const comando = await global.zuly.db.get(`custom-command-${interaction.commandName}-${interaction.guild.id}`);
				if (comando) {
					return interaction.editReply({
						content: comando.replace(/%author/g, `<@${interaction.member.user.id}>`),
					});
				}
			}
			const args = [];

			for (let option of interaction.options.data) {
				if (option.type === 'SUB_COMMAND') {
					if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.value) args.push(x.value);
					});
				}
				else if (option.value) {args.push(option.value);}
			}

			const msg = interaction;
			msg.author = msg.user;
			msg.author.mention = `<@${msg.author.id}>`;
			let idioma = require('../Config/idiomas.js');
			let lang = await global.zuly.db.get(`idioma-${msg.guild.id}`) || 'pt_br';
			lang = lang.replace(/-/g, '_');
			idioma = idioma[lang];
			const prefix = await global.zuly.db.get(`prefix-${msg.guild.id}`) ? global.zuly.db.get(`prefix-${msg.guild.id}`) : '/';

			msg.channel.slashReply = interaction.editReply.bind(interaction);

			if (command.permissoes) {
				if (command.permissoes.membro.length) {
					if (!command.permissoes.membro.every(p => msg.member.permissions.has(p))) {
						return msg.channel.slashReply({
							content: `:x: ${msg.author.mention} **|** ${idioma.message.user} \`${command.permissoes.membro}\`.`,
							ephemeral: true
						});
					}
				}
				if (command.permissoes.bot.length) {
					if (!command.permissoes.bot.every(p => msg.guild.me.permissionsIn(msg.channel).has(p) || msg.guild.me.permissions.has(p))) {
						return msg.channel.slashReply({
							content: `:x: ${msg.author.mention} **|** ${idioma.message.bot} \`${command.permissoes.bot}\`.`,
							ephemeral: true
						});
					}
				}
				if (command.permissoes.nsfw) {
					if (!msg.channel.nsfw) {
						return msg.channel.slashReply({
							content: `:x: ${msg.author.mention} **|** ${idioma.message.nsfw}`,
							ephemeral: true
						});
					}
				}
				if (command.permissoes.dono) {
					const developers = await global.zuly.db.get('devs');
					if (!developers) {
						await global.zuly.db.set('devs', ['717766639260532826', '726449359167684734', '452618703792766987', '630493603575103519']);
					}

					if (!developers.includes(msg.member.id)) {
						return msg.channel.slashReply({
							content: `:x: ${msg.author.mention} **|** ${idioma.message.dev}.`,
							ephemeral: true
						});
					}
				}
			}

			this.ctx = {
				id: msg.id,
				user: msg.author,
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
				react: function(emoji) {
					msg.react(emoji);
				},
				fetch: async function(url) {
					await global.zuly.manager.fetch(url);
				}
			};
			try {
				await command.run(this.ctx).then(async () => {
					const system = require('../Config/system');

					const moment = require('moment');

					const ownerA = await msg.guild.fetchOwner();
					const owner = ownerA.user;
					const embed = new global.zuly.manager.Ebl();

					embed.setTitle('<:zu_slash:886681118470987967> Slash Commands');
					embed.setColor('#ffcbdb');
					embed.setDescription(`>>> 🌎 **Servidor:** \`${msg.guild.name}\`\n🧭 **ID:** \`${msg.guild.id}\`\n👑 **Dono:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n🔍 **Membros:** \`${msg.guild.memberCount} members\`\n<a:zu_booster:880862453712429098> **Boosts:** \`${msg.guild.premiumSubscriptionCount} boosts\`\n:calendar: **Criado em:** \`${moment(msg.guild.createdAt).format('📆 DD/MM/YY')} | ${moment(msg.guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Idioma:** \`${msg.guild.preferredLocale}\`\n<:zu_slash:886681118470987967> **Comando:** \`${interaction.commandName}\`\n💻 **Argumentos:** \`${args.slice(0, 1024) || 'Não Tem'}\``);
					embed.addField('<:zu_membros:885214377182109696> **Usuário:**', `>>> 📘 **Informações:** \`${msg.author.username}#${msg.author.discriminator} [${msg.author.id}]\``);
					embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
					embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

					new WebhookClient({
						token: system.command.token,
						id: system.command.id,
					}).send({
						avatarURL: global.zuly.user.displayAvatarURL(),
						username: global.zuly.user.username,
						embeds: [embed.get()]
					});
				});
			}
			catch (e) {
				console.log(e);
				const system = require('../Config/system');
				const errorMessage = e.stack.length > 1800 ? `${e.stack.slice(0, 1800)}...` : e.stack;
				const embed = new global.zuly.manager.Ebl();
				embed.setTitle(`<:zu_error:900785481283944500> ${idioma.message.e}`);
				embed.setColor('#ff0000');
				embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``);
				embed.addField(`<:zu_bughunter_1:885918998426951721> ${idioma.message.e2}`, idioma.message.e3);
				embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

				msg.channel.slashReply({
					content: msg.author.mention,
					embeds: [embed.get()]
				});

				const moment = require('moment');
				const ownerA = await msg.guild.fetchOwner();
				const owner = ownerA.user;

				const embed2 = new global.zuly.manager.Ebl();
				embed2.setTitle(`<:zu_error:900785481283944500> ${idioma.message.e}`);
				embed2.setDescription(`\`\`\`js\n${errorMessage}\`\`\``);
				embed2.addField('<:zu_bughunter_1:885918998426951721> Resolvam!', `>>> 🌎 **Servidor:** \`${msg.guild.name}\`\n🧭 **ID:** \`${msg.guild.id}\`\n👑 **Dono:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n🔍 **Membros:** \`${msg.guild.memberCount} members\`\n<a:zu_booster:880862453712429098> **Boosts:** \`${msg.guild.premiumSubscriptionCount} boosts\`\n:calendar: **Criado em:** \`${moment(msg.guild.createdAt).format('📆 DD/MM/YY')} | ${moment(msg.guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Idioma:** \`${msg.guild.preferredLocale}\`\n<:zu_slash:886681118470987967> **Comando:** \`${interaction.commandName}\`\n💻 **Argumentos:** \`${args.slice(0, 1024) || 'Não Tem'}\``);
				embed2.setColor('#ff0000');
				embed2.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

				const hook2 = new WebhookClient({
					id: system.error.id,
					token: system.error.token
				});

				await hook2.send({
					avatarURL: global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }),
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
};
