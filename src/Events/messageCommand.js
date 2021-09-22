'use strict';
module.exports = class MessageEventCommand {
	constructor () {
		return {
			nome: 'messageCreate',
			run: this.run
		};
	}

	async run (message) {
		const config = require('../Config/config.js');
		const system = require('../Config/system');

		global.zuly.users.map(g => global.zuly.users.delete(g.id));

		if (message.channel.type === 1) return;

		const mensagens = await global.db.get(`messages-${message.guildID}-${message.author.id}`);

		await global.db.set(`messages-${message.guildID}-${message.author.id}`, mensagens ? mensagens + 1 : 1);

		let idioma = require('../Config/idiomas');
		let lang = await global.db.get(`idioma-${message.guildID}`) || 'pt_br';
		lang = lang.replace(/-/g, '_');
		idioma = idioma[lang];

		const channel_id = '880880678017826917';

		if(message.channel.id == channel_id) {
			const footer = message.embeds[0].footer.text;

			if (!footer) return;

			const footext = footer.split(' ');

			const user = await global.zuly.getRESTUser(footext[0]);
			const embed = new global.zuly.manager.Ebl();
			embed.title(`<:zu_bestlist:885218274080596038> BestList | ${global.zuly.user.username}`);
			embed.url('https://bestlist.online/bots/880173509077266483');
			embed.description(`⬆️ \`${user.username}#${user.discriminator}\` votou em mim na **[bestlist.online](https://bestlist.online)** e recebeu **2400 ryos** vote você também!\n🔗 **Link:** https://bestlist.online/bots/880173509077266483`);
			embed.color('#ffcbdb');
			embed.thumbnail(user.avatarURL);
			const ch = await global.zuly.getRESTChannel('890316877031698464');
			const money = await global.db.get(`ryos-${user.id}`);
			if (money) {
				await global.db.set(`ryos-${user.id}`, Number(money) + 2400);
			}
			else {
				await global.db.set(`ryos-${user.id}`, 2400);
			}
			const embed2 = new global.zuly.manager.Ebl();
			embed2.title(`<:zu_bestlist:885218274080596038> BestList | ${global.zuly.user.username}`);
			embed2.url('https://bestlist.online/bots/880173509077266483');
			embed2.description(`**${user.username}** Obrigado pelo seu voto, como recompensa você recebeu **2400 ryos**, continue votando e sendo uma pessoa incrivel <:zu_yay:890317605318058035>`);
			embed2.color('#ffcbdb');
			embed2.thumbnail(global.zuly.user.avatarURL);
			const dm = await global.zuly.getDMChannel(user.id);
			dm.createMessage(embed2.create).catch(() => {
				console.log('DM Fechada');
			});
			return ch.createMessage(embed.create).then(b => {
				b.addReaction('⬆️');
			});
		}

		if (message.author.bot) return;

		const regexPrefix = new RegExp(`^(${config.prefix.map(prefix => prefix.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('|')}|<@!?${global.zuly.user.id}>)( )*`, 'gi');

		if (!message.content.match(regexPrefix)) return;

		if (message.content === `<@${global.zuly.user.id}>` || message.content === `<@!${global.zuly.user.id}>`) {
			const mention = new global.zuly.manager.Ebl();
			mention.title(idioma.message.P);
			mention.description(idioma.mention.response.replace('%u', message.author.username).replace('s!', 'z!').replace('star', 'zuly'));
			mention.thumbnail(global.zuly.user.avatarURL);
			mention.color('#ffcbdb');
			message.channel.createMessage(mention.create);
		}

		const args = message.content.replace(regexPrefix, '').trim().split(/ +/g);
		const commandName = args.shift().toLowerCase();
		const commandFile = global.zuly.commands.get(commandName) || global.zuly.aliases.get(commandName);

		if (!commandFile) return;

		const command = commandFile;

		if (!message.channel.guild.members.get(global.zuly.user.id).permissions.has('readMessageHistory')) {
			return message.channel.createMessage(`:x: ${idioma.message.view}`);
		}

		if (!command) {
			if (await global.db.get(`mensagem-comando-${message.guildID}`)) {
				message.channel.createMessage(`:x: ${message.author} **|** ${idioma.message.the} \`${commandName.replace(/@/g, '').replace(/#/g, '').replace(/`/g, '')}\` ${idioma.message.unk}`);
			}
			else {
				return;
			}
		}

		if (command.permissoes) {
			if (command.permissoes.membro.length) {
				if (!command.permissoes.membro.every(p => message.channel.guild.members.get(message.author.id).permissions.has(p))) {
					return message.channel.createMessage(`: x: ${message.author.mention} ** | ** ${idioma.message.user}\`${command.permissoes.membro}\`.`);
				}
			}
			if (command.permissoes.bot.length) {
				if (!command.permissoes.bot.every(p => message.channel.guild.members.get(global.zuly.user.id).permissions.has(p))) {
					return message.channel.createMessage(`:x: ${message.author.mention} **|** ${idioma.message.bot} \`${command.permissoes.bot}\`.`);
				}
			}
			if (command.permissoes.nsfw) {
				if (!message.channel.nsfw) return message.channel.createMessage(`:x: ${message.author.mention} **|** ${idioma.message.nsfw}`);
			}
			if (command.permissoes.dono) {
				// Verificar se o autor da mensagem é um desenvolvedor.
				const developers = await global.db.get('devs');

				if (!developers) {
					await global.db.set('devs', ['726449359167684734', '392087996821667841', '699416429338034268']);
				}

				if (!developers.includes(message.member.id)) {
					return;
				}
			}
		}

		try {
			this.ctx = {
				id: message.id,
				user: message.author,
				userTag: message.author.tag,
				userId: message.author.id,
				member: message.member,
				memberTag: message.member.tag,
				memberId: message.member.id,
				idioma: idioma,
				prefix: message.content.replace(message.content.replace(regexPrefix, ''), ''),
				args: args,
				message: message,
				embed: require('../Client/lyaEmbedBuilder'),
				// Functions
				send: function(texto) {
					message.channel.createMessage(texto);
				},
				reply: function(texto, mencionar) {
					message.channel.createMessage(texto, mencionar);
				},
				addReaction: function(emoji) {
					message.addReaction(emoji);
				},
				fetch: async function(url) {
					await global.zuly.manager.fetch(url);
				}
			};

			const owner = await global.zuly.getRESTUser(message.channel.guild.ownerID);
			const moment = require('moment');

			global.zuly.executeWebhook(system.command.id, system.command.token, {
				avatarURL: global.zuly.user.avatarURL,
				username: global.zuly.user.username,
				embeds: [{
					title: '🌎 Log de Comandos',
					color: 14498544,
					fields: [{
						name: '🔍 Usuário:',
						value: `\`\`\`${message.author.username}#${message.author.discriminator} (${message.author.id})\`\`\``
					},
					{
						name: '<:zu_info:880812942713573396> Comando:',
						value: `\`\`\`${message.content.slice(0, 1010)}\`\`\``
					},
					{
						name: '🔗 Link da mensagem:',
						value: `\`\`\`${message.jumpLink}\`\`\``
					},
					{
						name: '👍 GuildInfo:',
						value: `\`\`\`📋 Nome: ${message.channel.guild.name}\n🧭 ID: ${message.channel.guild.id} [${message.channel.guild.shard.id}]\n👑 ${owner.username}#${owner.discriminator}\n🧑 Membros: ${message.channel.guild.memberCount}\n📅 Criado há dias/horas: ${moment(message.channel.guild.createdAt).format('📆 DD/MM/YY')}\n${moment(message.channel.guild.createdAt).format('⏰ HH:mm:ss')}\n🗺️ Região: ${message.channel.guild.region}\`\`\``
					}
					]
				}]
			});
			await commandFile.run(this.ctx);
		}
		catch (e) {
			const owner = await global.zuly.getRESTUser(message.channel.guild.ownerID);
			const moment = require('moment');

			console.log(e);
			global.zuly.executeWebhook(system.error.id, system.error.token, {
				avatarURL: global.zuly.user.avatarURL,
				username: global.zuly.user.username,
				content: '<@&886680759237226556>',
				embeds: [{
					title: '❌ Log de Erros',
					color: 14498544,
					fields: [{
						name: '<:zu_info:880812942713573396> Comando:',
						value: `\`\`\`${message.content.slice(0, 1010)}\`\`\``
					},
					{
						name: '⛔ Erro:',
						value: `\`\`\`${e}\`\`\``
					},
					{
						name: '🔗 Link da mensagem:',
						value: `\`\`\`${message.jumpLink}\`\`\``
					},
					{
						name: '🔍 Usuário:',
						value: `\`\`\`${message.author.username}#${message.author.discriminator} (${message.author.id})\`\`\``
					},
					{
						name: '👍 GuildInfo:',
						value: `\`\`\`📋 Nome: ${message.channel.guild.name}\n🧭 ID: ${message.channel.guild.id} [${message.channel.guild.shard.id}]\n👑 ${owner.username}#${owner.discriminator}\n🧑 Membros: ${message.channel.guild.memberCount}\n📅 Criado há dias/horas: ${moment(message.channel.guild.createdAt).format('📆 DD/MM/YY')}\n${moment(message.channel.guild.createdAt).format('⏰ HH:mm:ss')}\n🗺️ Região: ${message.channel.guild.region}\`\`\``
					}]
				}]
			});
			message.channel.createMessage(`<:zu_ryos:882667667264274483> ${message.author.mention} **|** An error happened, sorry, try again.`);
		}
	}
};
