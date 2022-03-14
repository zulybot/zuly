/* eslint-disable no-empty-pattern */
module.exports = class InteractionEvent {
	constructor () {
		return {
			nome: 'interactionCreate',
			run: this.run
		};
	}
	async run (interaction) {
		if (!interaction.isCommand()) return;
		await interaction.deferReply();
		const blacklist = await global.zuly.db.get(`botban-${interaction.member.user.id}`);
		if (blacklist) {
			const msg = interaction;
			let idioma = require('../Config/idiomas.js');
			let lang = await global.zuly.db.get(`idioma-${msg.guild.id}`) || 'pt_br';
			lang = lang.replace(/-/g, '_');
			idioma = idioma[lang];
			const embed = new global.zuly.manager.Ebl();
			embed.setTitle(`<:zu_banCat:933106129871966228> ${idioma.botban.title} | ${global.zuly.user.username}`);
			embed.setDescription(`${idioma.botban.description.replace('%z', global.zuly.user.username).replace('%r', blacklist)}`);
			embed.setColor('#ff0000');
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			embed.setThumbnail(global.zuly.user.avatarURL);
			return interaction.createMessage({
				content: `<@${interaction.member.user.id}>`,
				embeds: [embed.get()]
			});
		}
		try {
			const command = global.zuly.commands.get(interaction.commandName);
			if (!command) {
				const comando = await global.zuly.db.get(`custom-command-${interaction.commandName}-${interaction.guild.id}`);
				if (comando) {
					return interaction.createMessage({
						content: comando.replace(/%author/g, `<@${interaction.member.user.id}>`),
						allowedMentions: {
							everyone: false,
							users: true,
							roles: false,
						}
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
							content: `:x: ${msg.author} **|** ${idioma.message.user} \`${command.permissoes.membro}\`.`,
							flags: 64
						});
					}
				}
				if (command.permissoes.bot.length) {
					if (!command.permissoes.bot.every(p => msg.guild.me.permissionsIn(msg.channel).has(p) || msg.guild.me.permissions.has(p))) {
						return msg.channel.slashReply({
							content: `:x: ${msg.author} **|** ${idioma.message.bot} \`${command.permissoes.bot}\`.`,
							flags: 64
						});
					}
				}
				if (command.permissoes.nsfw) {
					if (!msg.channel.nsfw) {
						return msg.channel.slashReply({
							content: `:x: ${msg.author} **|** ${idioma.message.nsfw}`,
							flags: 64
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
							content: `:x: ${msg.author} **|** ${idioma.message.dev}.`,
							flags: 64
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
					const owner = await global.zuly.users.fetch(msg.guild.ownerID);
					const embed = new global.zuly.manager.Ebl();

					embed.setTitle('<:zu_slash:886681118470987967> Slash Commands');
					embed.setColor('#ffcbdb');
					embed.setDescription(`>>> 🌎 **Servidor:** \`${msg.guild.name}\`\n🧭 **ID:** \`${msg.guild.id}\`\n👑 **Dono:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n🔍 **Membros:** \`${msg.guild.memberCount} members\`\n<a:zu_booster:880862453712429098> **Boosts:** \`${msg.guild.premiumSubscriptionCount} boosts\`\n:calendar: **Criado em:** \`${moment(msg.guild.createdAt).format('📆 DD/MM/YY')} | ${moment(msg.guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Idioma:** \`${msg.guild.preferredLocale}\`\n<:zu_slash:886681118470987967> **Comando:** \`${interaction.commandName}\`\n💻 **Argumentos:** \`${args.slice(0, 1024) || 'Não Tem'}\``);
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
				const { domain } = require('../Config/config');
				const dominio = domain.replace('http://', '').replace('/', '');
				const errorMessage = e.stack.length > 1800 ? `${e.stack.slice(0, 1800)}...` : e.stack;
				const embed = new global.zuly.manager.Ebl();
				embed.setTitle(`<:zu_error:900785481283944500> ${idioma.message.e}`);
				embed.setColor('#ff0000');
				embed.setDescription(`\`\`\`js\n${errorMessage.replace(dominio, '127.0.0.1:3000')}\`\`\``);
				embed.addField(`<:zu_bughunter_1:885918998426951721> ${idioma.message.e2}`, idioma.message.e3);
				embed.setThumbnail(global.zuly.user.avatarURL);
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);

				msg.channel.slashReply({
					content: msg.author,
					embeds: [embed.get()]
				});

				const moment = require('moment');
				const owner = await msg.guild.fetchOwner();

				const embed2 = new global.zuly.manager.Ebl();
				embed2.setTitle(`<:zu_error:900785481283944500> ${idioma.message.e}`);
				embed2.setDescription(`\`\`\`js\n${errorMessage.replace(dominio, '127.0.0.1:3000')}\`\`\``);
				embed2.addField('<:zu_bughunter_1:885918998426951721> Resolvam!', `>>> 🌎 **Servidor:** \`${msg.guild.name}\`\n🧭 **ID:** \`${msg.guild.id}\`\n👑 **Dono:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n🔍 **Membros:** \`${msg.guild.memberCount} members\`\n<a:zu_booster:880862453712429098> **Boosts:** \`${msg.guild.premiumSubscriptionCount} boosts\`\n:calendar: **Criado em:** \`${moment(msg.guild.createdAt).format('📆 DD/MM/YY')} | ${moment(msg.guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Idioma:** \`${msg.guild.preferredLocale}\`\n<:zu_slash:886681118470987967> **Comando:** \`${interaction.commandName}\`\n💻 **Argumentos:** \`${args.slice(0, 1024) || 'Não Tem'}\``);
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
};