/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
module.exports = class BackupCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['administrator'],
				bot: ['administrator'],
				dono: true
			},
			pt: {
				nome: 'backup',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderação',
				desc: 'Gerencia backups do seu servidor.'
			},
			en: {
				nome: 'backup',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderation',
				desc: 'Manage backups of your server.'
			},
			fr: {
				nome: 'backup',
				categoria: '<:zu_certifiedmod:885193463111483412> » Modération',
				desc: 'Gérer les sauvegardes de votre serveur.'
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
					type: 3,
					name: 'option',
					description: 'Choose an option to perform',
					required: true,
					choices: [
						{
							name: 'create',
							value: 'create'
						},
						{
							name: 'list',
							value: 'list'
						},
						{
							name: 'load',
							value: 'load'
						},
						{
							name: 'delete',
							value: 'delete'
						}
					]
				},
				{
					type: 3,
					name: 'backupid',
					description: 'Backup ID, required for delete & load.',
					required: false,
				}
			],
			aliases: ['setlang', 'guildlang'],
			run: this.run
		};
	}

	async run (ctx) {
		const genID = await Math.random().toString(36).slice(2, 10);
		const nodeFetch = require('node-fetch');
		if (ctx.args[0] === 'create') {
			const canais = [];
			ctx.message.guild.channels.forEach(async (channel) => {
				let parent = {};
				if (channel.parentID) {
					const canal = await global.zuly.getRESTChannel(channel.parentID);
					parent.name = canal.name;
				}
				canais.push({
					id: channel.id,
					name: channel.name,
					type: Number(channel.type),
					position: Number(channel.position),
					topic: channel.topic,
					nsfw: channel.nsfw,
					parent: parent.name || '',
					rateLimitPerUser: Number(channel.rateLimitPerUser) || 0,
				});
			});
			setTimeout(async () => {
				await global.zuly.db.set(`backups.${genID}.channels`, canais);
			}, 5000);
			const cargos = [];
			ctx.message.guild.roles.forEach((role) => {
				if (role.managed) return;
				cargos.push({
					id: Number(role.id),
					name: role.name,
					hoist: role.hoist,
					color: Number(role.color),
					position: Number(role.position),
					mentionable: roleable,
				});
			});
			await global.zuly.db.set(`backups.${genID}.roles`, cargos);
			const guild = {};
			guild.id = ctx.message.guild.id;
			guild.backup = genID;
			guild.name = ctx.message.guild.name;
			guild.icon = (await nodeFetch(ctx.message.guild.iconURL).then((res) => res.buffer())).toString('base64');
			guild.preferredLocale = ctx.message.guild.preferredLocale;
			guild.verificationLevel = ctx.message.guild.verificationLevel;
			guild.afkTimeout = ctx.message.guild.afkTimeout;
			guild.mfaLevel = ctx.message.guild.mfaLevel;
			guild.splash = ctx.message.guild.splash;
			guild.welcomeScreen = ctx.message.guild.welcomeScreen;
			guild.widgetEnabled = ctx.message.guild.widgetEnabled;
			/*
				for(const key of Object.keys(ctx.message.guild)) {
					guild[key] = ctx.message.guild[key];
				}
				*/
			setTimeout(async () => {
				await global.zuly.db.set(`backups.${genID}.guild`, guild);
			}, 3000);
			const backupdb = await global.zuly.db.get(`backups.${ctx.message.author.id}`);
			if (backupdb) {
				await global.zuly.db.push(`backups.${ctx.message.author.id}`, genID);
			}
			else {
				await global.zuly.db.set(`backups.${ctx.message.author.id}`, [genID]);
			}
			setTimeout(() => {
				ctx.message.channel.slashReply({
					content: `:white_check_mark: ${ctx.message.author} **|** Backup criado, ID: \`${genID}\`.`,
				});
			}, 5000);
		}
		if (ctx.args[0] === 'list') {
			const backupdb = await global.zuly.db.get(`backups.${ctx.message.author.id}`);
			if (!backupdb || !backupdb.length) {
				return ctx.message.channel.slashReply({
					content: `:x: ${ctx.message.author} **|** Você não possui backups.`,
				});
			}
			else {
				const backupdb = await global.zuly.db.get(`backups.${ctx.message.author.id}`);
				const embed = new ctx.embed();
				embed.setTitle(`☁️ Backups | ${global.zuly.user.username}`);
				try {
					backupdb.map(async (back) => {
						const guild = await global.zuly.db.get(`backups.${back}.guild`);
						await embed.addField(`Backup ID: ${guild.backup}`, `↳ **${guild.name}**\n↳ \`/backup load ${guild.backup}\``);
					});
				}
				catch (e) {
					console.log(e);
				}
				embed.setColor('#ffcbdb');
				embed.setThumbnail(global.zuly.user.avatarURL);
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
				setTimeout(() => {
					ctx.message.channel.slashReply({
						content: ctx.message.author,
						embeds: [embed.get()],
					});
				}, 3000);
			}
		}
		if (ctx.args[0] === 'load') {
			if (!ctx.args[1]) return ctx.message.channel.slashReply(`:x: ${ctx.message.author} **|** Insira o ID do backup após o comando, caso não saiba, use \`/backup list\`.`);
			const backupdb = await global.zuly.db.get(`backups.${ctx.message.author.id}`);
			if (!backupdb.includes(ctx.args[1])) return ctx.message.channel.slashReply(`:x: ${ctx.message.author} **|** Você não possui o backup com o ID \`${ctx.args[1]}\`.`);
			const msg = await ctx.message.channel.slashReply(`⚠️ ${ctx.message.author} **|** Você deseja carregar o backup? Saiba que todas as suas configurações serão substituidas pelo backup, não será recuperado **mensagens, cargos & canais** depois desse processo.\n> Para carregar reaja com \`✅\`.`);
			const { ReactionCollector } = require('eris-collector');
			msg.addReaction('✅');
			let filter = (m, emoji) => emoji.name === '✅';
			let collector = new ReactionCollector(global.zuly, msg, filter, {
				time: 30000
			});
			collector.on('collect', async (m, reaction, user) => {
				if (user.id !== ctx.message.author.id) return;
				if (user.id === ctx.message.author.id) {
					m.delete();
					const guild = await global.zuly.db.get(`backups.${ctx.args[1]}.guild`);
					const roles = await global.zuly.db.get(`backups.${ctx.args[1]}.roles`);
					const channels = await global.zuly.db.get(`backups.${ctx.args[1]}.channels`);
					const currentGuild = ctx.message.guild;
					// Setando servidor para status de load:
					currentGuild.edit({
						name: `Loading Backup | ${global.zuly.user.username}...`,
						reason: 'Backup',
					});
					// Deletando Canais
					currentGuild.channels.forEach((channel) => {
						channel.delete({
							reason: 'Backup',
						}).catch((e) => {
							console.log(e);
						});
					});
					// Deletando Cargos
					currentGuild.roles.forEach((role) => {
						if (role.managed) return;
						role.delete().catch((e) => {
							console.log(e);
						});
					});

					setTimeout(async () => {
						// Criando Cargos
						const cargosFoda = roles.sort((a, b) => a.position + b.position);
						for (const role of cargosFoda) {
							currentGuild.createRole({
								name: role.name,
								color: role.color,
								permissions: role.permissions || 0,
								mentionable: roleable,
								hoist: role.hoist,
								position: role.position,
							}).catch(() => {

							});
						}
						// Criando Canais
						const canaisFoda = channels.sort((a, b) => a.type + b.type);
						for (const canal of canaisFoda) {
							setTimeout(async () => {
								let parentID;
								let parent;
								if (ctx.message.guild.channels) {
									parent = await ctx.message.guild.channels.find(c => c.name === canal.parent);
									parentID = parent ? parent.id : null;
								}
								console.log(parent);
								currentGuild.createChannel(canal.name, canal.type, {
									parentID: parentID || null,
									position: canal.position,
									topic: canal.topic,
								}).catch((e) => {
									console.log(e);
								});
							}, 300);
						}
						// Editando Servidor
						const guildIcon = await Buffer.from(guild.icon, 'base64');
						setTimeout(async () => {
							await currentGuild.edit({
								name: guild.name,
								icon: guildIcon,
								preferredLocale: guild.preferredLocale,
								verificationLevel: guild.verificationLevel,
								afkTimeout: guild.afkTimeout,
								mfaLevel: guild.mfaLevel,
								splash: guild.splash,
								welcomeScreen: guild.welcomeScreen,
								widgetEnabled: guild.widgetEnabled,
							}, 'Backup | Zuly');
						}, 3000);
					}, 5000);
				}
			});
		}
		if (ctx.args[0] === 'delete') {
			if (!ctx.args[1]) return ctx.message.channel.slashReply(`:x: ${ctx.message.author} **|** Insira o ID do backup após o comando, caso não saiba, use \`/backup list\`.`);
			await global.zuly.db.remove(`backups.${ctx.args[1]}.guild`);
			await global.zuly.db.remove(`backups.${ctx.args[1]}.roles`);
			await global.zuly.db.remove(`backups.${ctx.args[1]}.channels`);
			await global.zuly.db.pull(`backups.${ctx.message.author.id}`, ctx.args[1]);
			return ctx.message.channel.slashReply(`:white_check_mark: ${ctx.message.author} **|** Backup \`${ctx.args[1]}\` deletado com sucesso.`);
		}
	}
};
