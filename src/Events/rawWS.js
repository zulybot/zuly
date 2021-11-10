module.exports = class rawWS {
	constructor () {
	  return {
			nome: 'rawWS',
			run: this.run
	  };
	}

	async run (packet) {
		const interaction = packet.d;
		global.zuly.music.updateVoiceState(packet);
		if (packet.t == 'INTERACTION_CREATE') {
			const { Collection, User, Message } = require('eris');
			const command = global.zuly.commands.get(packet.d.data.name);
			if (!command) return;
			interaction.mentions = [];
			interaction.mentions[0] = global.zuly.user;
			interaction.mention_everyone = false;
			interaction.mention_roles = new Collection();
			if (interaction.data && interaction.data.resolved && interaction.data.resolved.users) {
			  for (const membro in interaction.data.resolved.users) {
					interaction.data.resolved.users[membro].member =
							interaction.data.resolved.members[membro];
					interaction.mentions.push(interaction.data.resolved.users[membro]);
			  }
			}
			const args = interaction.data.options
				? interaction.data.options.map((i) => {
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
				})
				: [];

		  interaction.content = (interaction.data.name + ' ' + args.join(' ')).trim();
		  interaction.author = new User(interaction.member.user, global.zuly);
		  const msg = new Message(interaction, global.zuly);
		  let idioma = require('../Config/idiomas.js');
		  let lang = await global.db.get(`idioma-${msg.guildID}`) || 'pt_br';
		  lang = lang.replace(/-/g, '_');
		  idioma = idioma[lang];
			const prefix = await global.db.get(`prefix-${msg.channel.guild.id}`) ? global.db.get(`prefix-${msg.channel.guild.id}`) : '/';
			msg.channel.slashReply = function(txt) {
				return global.zuly.requestHandler.request('POST', `/interactions/${packet.d.id}/${packet.d.token}/callback`, false, {
					type: 4,
					data: {
						...txt
					}
				}).then((msg) => new Message(msg, global.zuly));
			};

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
					const moment = require('moment');
					const owner = await global.zuly.getRESTUser(msg.channel.guild.ownerID);
					const embed = new global.zuly.manager.Ebl();
					embed.setTitle('<:zu_slash:886681118470987967> Slash Commands');
					embed.setColor('#ffcbdb');
					embed.setDescription(`>>> 🌎 **Servidor:** \`${msg.channel.guild.name}\`\n🧭 **ID:** \`${msg.channel.guild.id}\`\n👑 **Dono:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n🔍 **Membros:** \`${msg.channel.guild.memberCount} members\`\n<a:zu_booster:880862453712429098> **Boosts:** \`${msg.channel.guild.premiumSubscriptionCount} boosts\`\n:calendar: **Criado em:** \`${moment(msg.channel.guild.createdAt).format('📆 DD/MM/YY')} | ${moment(msg.channel.guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Idioma:** \`${msg.channel.guild.preferredLocale}\`\n<:zu_slash:886681118470987967> **Comando:** \`${packet.d.data.name}\`\n💻 **Argumentos:** \`${args.slice(0, 1024) || 'Não Tem'}\``);
					embed.addField('<:zu_membros:885214377182109696> **Usuário:**', `>>> 📘 **Informações:** \`${msg.author.username}#${msg.author.discriminator} [${msg.author.id}]\`\n📆 **Criação da conta:** <t:${Math.floor(msg.author.createdAt / 1000)}>`);
					embed.setThumbnail(global.zuly.user.avatarURL);
					embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
					const canal = await global.zuly.getRESTChannel('886680915407962215');
					canal.createMessage({
						embeds: [embed.get()]
					});
				});
			}
			catch (e) {
				const errorMessage = e.stack.length > 1800 ? `${e.stack.slice(0, 1800)}...` : e.stack;
				const embed = new global.zuly.manager.Ebl();
				embed.setTitle(`<:zu_error:900785481283944500> ${idioma.message.e}`);
				embed.setColor('#ff0000');
				embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``);
				embed.addField(`<:zu_bughunter_1:885918998426951721> ${idioma.message.e2}`, idioma.message.e3);
				embed.setThumbnail(global.zuly.user.avatarURL);
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);

				msg.channel.createMessage({
					content: msg.author.mention,
					embeds: [embed.get()]
				});
				const moment = require('moment');
				const owner = await global.zuly.getRESTUser(msg.channel.guild.ownerID);
				const canal = await global.zuly.getRESTChannel('889930854929932288');
				const embed2 = new global.zuly.manager.Ebl();
				embed2.setTitle(`<:zu_error:900785481283944500> ${idioma.message.e}`);
				embed2.setDescription(`\`\`\`js\n${errorMessage}\`\`\``);
				embed2.addField('<:zu_bughunter_1:885918998426951721> Resolvam!', `>>> 🌎 **Servidor:** \`${msg.channel.guild.name}\`\n🧭 **ID:** \`${msg.channel.guild.id}\`\n👑 **Dono:** \`${owner.username}#${owner.discriminator} [${owner.id}]\`\n🔍 **Membros:** \`${msg.channel.guild.memberCount} members\`\n<a:zu_booster:880862453712429098> **Boosts:** \`${msg.channel.guild.premiumSubscriptionCount} boosts\`\n:calendar: **Criado em:** \`${moment(msg.channel.guild.createdAt).format('📆 DD/MM/YY')} | ${moment(msg.channel.guild.createdAt).format('⏰ HH:mm:ss')}\`\n🗺️ **Idioma:** \`${msg.channel.guild.preferredLocale}\`\n<:zu_slash:886681118470987967> **Comando:** \`${packet.d.data.name}\``);
				embed2.setColor('#ff0000');
				embed2.setThumbnail(global.zuly.user.avatarURL);
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
				canal.createMessage({
					content: '<@&886680759237226556>',
					embeds: [embed2.get()]
				});
			}
		}
	}
};
