/* eslint-disable max-nested-callbacks */

module.exports = class AutoroleCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['manageGuild'],
				bot: ['manageRoles', 'useExternalEmojis', 'addReactions', 'manageMessages']
			},
			pt: {
				nome: 'autorole',
				categoria: '⚙️ » Configuração',
				desc: 'Dê cargos automaticamente para novos em seu servidor (seja bots ou memberos) quando eles entrarem no servidor.'
			},
			en: {
				nome: 'autorole',
				categoria: '⚙️ » Configuration',
				desc: 'Automatically assign roles to new ones on your server (whether bots or members) when they join the server.'
			},
			aliases: ['autocargo', 'role', 'auto', 'joinrole', 'autojoin', 'auto-role', 'join-role', 'auto-cargo', 'role-auto'],
			run: this.run
		};
	}

	async run (ctx) {
		// COLETORES
		const ReactionCollector = require('../../Helpers/ReactionCollector');
		const MessageCollector = require('../../Helpers/MessageCollector');
		// PUXANDO O AUTOROLE
		const autoroleuser = await global.db.get(`autoroleuser-${ctx.message.guildID}`);
		const autorolebot = await global.db.get(`autorolebot-${ctx.message.guildID}`);
		// CRIANDO A EMBED
		const embed = new global.zuly.manager.Ebl();
		embed.title(`📋 Autorole | ${global.zuly.user.username}`);
		// FIELD AUTOROLE-BOT
		if (autorolebot) {
			// SE TIVER CARGOS
			embed.field('🤖 Bot', `${autorolebot.map((id) => `<@&${id}>`).join(', ')}`, true);
		}
		else {
			// SE NÃO TIVER
			embed.field('🤖 Bot', `${ctx.idioma.autorole.noset}`, true);
		}
		// FIELD AUTOROLE-USER
		if (autoroleuser) {
			// SE TIVER CARGOS
			embed.field(`<:zu_membros:885214377182109696> ${ctx.idioma.autorole.mem}`, `${autoroleuser.map((id) => `<@&${id}>`).join(', ')}`, true);
		}
		else {
			// SE NÃO TIVER
			embed.field(`<:zu_membros:885214377182109696> ${ctx.idioma.autorole.mem}`, `${ctx.idioma.autorole.noset}`, true);
		}
		// FIELD PARA DELETAR
		embed.field(`❌ ${ctx.idioma.autorole.del}`, ctx.idioma.autorole.del2);
		// COR DA EMBED
		embed.color('#ffcbdb');
		// CRIANDO OS NEGOCIO
		ctx.message.channel.createMessage(embed.create).then(msg => {
			// ADICIONANDO REAÇÕES
			msg.addReaction('🤖');
			msg.addReaction(':zu_membros:885214377182109696');
			msg.addReaction('❌');
			// CRIANDO COLETOR DE AUTOROLE BOT
			const bot = new ReactionCollector(msg, {
				user: ctx.message.author,
				ignoreBot: true,
				emoji: '🤖',
				time: 60000,
				max: 1,
				acceptReactionRemove: false,
				stopOnCollect: true
			});
			// CRIANDO COLETOR DE AUTOROLE USER
			const user = new ReactionCollector(msg, {
				user: ctx.message.author,
				ignoreBot: true,
				emoji: 'zu_membros',
				time: 60000,
				max: 1,
				acceptReactionRemove: false,
				stopOnCollect: true
			});
			// CRIANDO COLETOR PARA DELETAR
			const del = new ReactionCollector(msg, {
				user: ctx.message.author,
				ignoreBot: true,
				emoji: '❌',
				time: 60000,
				max: 1,
				acceptReactionRemove: false,
				stopOnCollect: true
			});
			// CASO O USER COLOQUE O AUTOROLE DE BOT
			bot.on('collect', (message) => {
				msg.delete();
				// INICIANDO COLETOR
				message.channel.createMessage(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.autorole.bot}`).then(m => {
					const mcol = new MessageCollector(m.channel, {
						user: ctx.message.author,
						time: 60000,
						ignoreBots: true,
						stopOnCollect: true
					});
					mcol.on('collect', async (message) => {
						message.delete();
						const addrole = [];
						message.roleMentions.map(async (rol) => {
							addrole.push(rol);
						});
						// EMBED DE AUTOROLE-BOT
						const embed2 = new global.zuly.manager.Ebl();
						embed2.title(`📋 Autorole | ${global.zuly.user.username}`);
						embed2.description(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.autorole.botset} ${addrole.map((rolee) => `<@&${rolee}>`).join(', ')}`);
						embed2.color('#ffcbdb');
						// ENVIANDO A EMBED E CRIANDO AS COISAS
						message.channel.createMessage(embed2.create);
						if (!autorolebot) {
							await global.db.set(`autorolebot-${ctx.message.guildID}`, []);
							addrole.map(async auto => {
								await global.db.push(`autorolebot-${ctx.message.guildID}`, auto);
							});
						}
						else {
							await global.db.del(`autorolebot-${ctx.message.guildID}`);
							await global.db.set(`autorolebot-${ctx.message.guildID}`, []);
							addrole.map(async auto => {
								await global.db.push(`autorolebot-${ctx.message.guildID}`, auto);
							});
						}
						// DELETANDO PARA DEIXAR O CHAT LIMPO OK?
						m.delete();
					});
				});
			});
			// CASO O USER COLOQUE O AUTOROLE DE USER
			user.on('collect', (message) => {
				msg.delete();
				// INICIANDO COLETOR
				message.channel.createMessage(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.autorole.user}`).then(m => {
					const mcol = new MessageCollector(m.channel, {
						user: ctx.message.author,
						time: 60000,
						ignoreBots: true,
						stopOnCollect: true
					});
					mcol.on('collect', async (message) => {
						message.delete();
						const addrole = [];
						message.roleMentions.map(async (rol) => {
							addrole.push(rol);
						});
						// EMBED DE AUTOROLE-USER
						const embed3 = new global.zuly.manager.Ebl();
						embed3.title(`📋 Autorole | ${global.zuly.user.username}`);
						embed3.description(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.autorole.userset} ${addrole.map((rolee) => `<@&${rolee}>`).join(', ')}`);
						embed3.color('#ffcbdb');
						// ENVIANDO A EMBED E CRIANDO AS COISAS
						message.channel.createMessage(embed3.create);
						if (!autoroleuser) {
							await global.db.set(`autoroleuser-${ctx.message.guildID}`, []);
							addrole.map(async auto => {
								await global.db.push(`autoroleuser-${ctx.message.guildID}`, auto);
							});
						}
						else {
							await global.db.del(`autoroleuser-${ctx.message.guildID}`);
							await global.db.set(`autoroleuser-${ctx.message.guildID}`, []);
							addrole.map(async auto => {
								await global.db.push(`autoroleuser-${ctx.message.guildID}`, auto);
							});
						}
						// DELETANDO PARA DEIXAR O CHAT LIMPO OK?
						m.delete();
					});
				});
			});
			// CASO O USER DELETE O AUTOROLE
			del.on('collect', async (message) => {
				await global.db.del(`autoroleuser-${ctx.message.guildID}`);
				await global.db.del(`autorolebot-${ctx.message.guildID}`);
				// EMBED DE AUTOROLE-DELETED
				const delb = new global.zuly.manager.Ebl();
				delb.title(`📋 Autorole | ${global.zuly.user.username}`);
				delb.description(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.autorole.disabled}`);
				delb.color('#ffcbdb');
				return message.channel.createMessage(delb.create).then(() => {
					msg.delete();
				});
			});
		});
	}
};