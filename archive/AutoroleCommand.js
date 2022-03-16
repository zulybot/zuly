/* eslint-disable max-nested-callbacks */

module.exports = class AutoroleCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD', 'manageRoles'],
				bot: ['manageRoles', 'useExternalEmojis', 'ADD_REACTIONS', 'manageMessages']
			},
			pt: {
				nome: 'autorole',
				categoria: '⚙️ » Configuração',
				desc: 'Dê cargos automaticamente para novos em seu servidor.'
			},
			en: {
				nome: 'autorole',
				categoria: '⚙️ » Configuration',
				desc: 'Automatically assign roles to new ones on your server.'
			},
			fr: {
				nome: 'autorole',
				categoria: '⚙️ » Configuration',
				desc: 'Attribuez automatiquement des rôles aux nouveaux sur votre serveur.'
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
			aliases: ['autocargo', 'role', 'auto', 'joinrole', 'autojoin', 'auto-role', 'join-role', 'auto-cargo', 'role-auto'],
			run: this.run
		};
	}

	async run (ctx) {
		try {
			// COLETORES
			const ReactionCollector = require('../src/Helpers/ReactionCollector');
			const MessageCollector = require('../src/Helpers/MessageCollector');
			// PUXANDO O AUTOROLE
			const autoroleuser = await global.zuly.db.get(`autoroleuser-${ctx.message.guild.id}`);
			const autorolebot = await global.zuly.db.get(`autorolebot-${ctx.message.guild.id}`);
			// CRIANDO A EMBED
			const embed = new global.zuly.manager.Ebl();
			embed.setTitle(`📋 Autorole | ${global.zuly.user.username}`);
			// FIELD AUTOROLE-BOT
			if (autorolebot) {
				// SE TIVER CARGOS
				embed.addField('🤖 Bot', `${autorolebot.map((id) => `<@&${id}>`).join(', ')}`, true);
			}
			else {
				// SE NÃO TIVER
				embed.addField('🤖 Bot', `${ctx.idioma.autorole.noset}`, true);
			}
			// FIELD AUTOROLE-USER
			if (autoroleuser) {
				// SE TIVER CARGOS
				embed.addField(`<:zu_membros:885214377182109696> ${ctx.idioma.autorole.mem}`, `${autoroleuser.map((id) => `<@&${id}>`).join(', ')}`, true);
			}
			else {
				// SE NÃO TIVER
				embed.addField(`<:zu_membros:885214377182109696> ${ctx.idioma.autorole.mem}`, `${ctx.idioma.autorole.noset}`, true);
			}
			// FIELD PARA DELETAR AUTOROLE
			embed.addField(`❌ ${ctx.idioma.autorole.del}`, ctx.idioma.autorole.del2);
			// COR DA EMBED
			embed.setColor('#ffcbdb');
			// CRIANDO OS NEGOCIO
			ctx.message.editReply({
				content: ctx.message.author.mention,
				embeds: [embed.get()]
			}).then(msg => {
				// ADICIONANDO REAÇÕES
				msg.react('🤖');
				msg.react(':zu_membros:885214377182109696');
				msg.react('❌');
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
				bot.on('collect', () => {
					msg.delete();
					// INICIANDO COLETOR
					ctx.message.editReply({
						content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.autorole.bot}`
					}).then(m => {
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
							embed2.setTitle(`📋 Autorole | ${global.zuly.user.username}`);
							embed2.setDescription(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.autorole.botset} ${addrole.map((rolee) => `<@&${rolee}>`).join(', ')}`);
							embed2.setColor('#ffcbdb');
							// ENVIANDO A EMBED E CRIANDO AS COISAS
							ctx.message.editReply({
								content: ctx.message.author.mention,
								embeds: [embed2.get()]
							});
							if (!autorolebot) {
								await global.zuly.db.set(`autorolebot-${ctx.message.guild.id}`, []);
								addrole.map(async auto => {
									await global.zuly.db.push(`autorolebot-${ctx.message.guild.id}`, auto);
								});
							}
							else {
								await global.zuly.db.del(`autorolebot-${ctx.message.guild.id}`);
								await global.zuly.db.set(`autorolebot-${ctx.message.guild.id}`, []);
								addrole.map(async auto => {
									await global.zuly.db.push(`autorolebot-${ctx.message.guild.id}`, auto);
								});
							}
							// DELETANDO PARA DEIXAR O CHAT LIMPO OK?
							m.delete();
						});
					});
				});
				// CASO O USER COLOQUE O AUTOROLE DE USER
				user.on('collect', () => {
					msg.delete();
					// INICIANDO COLETOR
					ctx.message.editReply({
						content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.autorole.user}`
					}).then(m => {
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
							embed3.setTitle(`📋 Autorole | ${global.zuly.user.username}`);
							embed3.setDescription(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.autorole.userset} ${addrole.map((rolee) => `<@&${rolee}>`).join(', ')}`);
							embed3.setColor('#ffcbdb');
							// ENVIANDO A EMBED E CRIANDO AS COISAS
							ctx.message.editReply({
								content: ctx.message.author.mention,
								embeds: [embed3.get()]
							});
							if (!autoroleuser) {
								await global.zuly.db.set(`autoroleuser-${ctx.message.guild.id}`, []);
								addrole.map(async auto => {
									await global.zuly.db.push(`autoroleuser-${ctx.message.guild.id}`, auto);
								});
							}
							else {
								await global.zuly.db.del(`autoroleuser-${ctx.message.guild.id}`);
								await global.zuly.db.set(`autoroleuser-${ctx.message.guild.id}`, []);
								addrole.map(async auto => {
									await global.zuly.db.push(`autoroleuser-${ctx.message.guild.id}`, auto);
								});
							}
							// DELETANDO PARA DEIXAR O CHAT LIMPO OK?
							m.delete();
						});
					});
				});
				// CASO O USER DELETE O AUTOROLE
				del.on('collect', async () => {
					await global.zuly.db.del(`autoroleuser-${ctx.message.guild.id}`);
					await global.zuly.db.del(`autorolebot-${ctx.message.guild.id}`);
					// EMBED DE AUTOROLE-DELETED
					const delb = new global.zuly.manager.Ebl();
					delb.setTitle(`📋 Autorole | ${global.zuly.user.username}`);
					delb.setDescription(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.autorole.disabled}`);
					delb.setColor('#ffcbdb');
					return ctx.message.editReply({
						content: ctx.message.author.mention,
						embeds: [delb.get()]
					}).then(() => {
						msg.delete();
					});
				});
			});
		}
		catch (e) {
			console.log(e);
		}
	}
};
