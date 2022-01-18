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
		if (ctx.args[0] === 'create') {
			const canais = [];
			ctx.message.channel.guild.channels.forEach((channel) => {
				canais.push({
					id: channel.id,
					name: channel.name,
					type: Number(channel.type),
					position: Number(channel.position),
					topic: channel.topic,
					rateLimitPerUser: Number(channel.rateLimitPerUser) || 0,
					// permissionOverwrites: channel.permissionOverwrites,
					nsfw: channel.nsfw,
				});
			});
			await global.db.set(`backups.${genID}.channels`, canais);
			const cargos = [];
			ctx.message.channel.guild.roles.forEach((role) => {
				if (role.managed) return;
				cargos.push({
					id: Number(role.id),
					name: role.name,
					hoist: role.hoist,
					color: Number(role.color),
					position: Number(role.position),
					permissions: Number(role.permissions) || 0,
					mentionable: role.mentionable,
				});
			});
			await global.db.set(`backups.${genID}.roles`, cargos);
			const guild = {};
			guild.id = ctx.message.channel.guild.id;
			guild.backup = genID;
			guild.name = ctx.message.channel.guild.name;
			guild.icon = ctx.message.channel.guild.icon;
			guild.region = ctx.message.channel.guild.region;
			guild.verificationLevel = ctx.message.channel.guild.verificationLevel;
			guild.afkTimeout = ctx.message.channel.guild.afkTimeout;
			guild.mfaLevel = ctx.message.channel.guild.mfaLevel;
			guild.splash = ctx.message.channel.guild.splash;
			guild.welcomeScreen = ctx.message.channel.guild.welcomeScreen;
			guild.widgetEnabled = ctx.message.channel.guild.widgetEnabled;
			/*
			for(const key of Object.keys(ctx.message.channel.guild)) {
				guild[key] = ctx.message.channel.guild[key];
			}
			*/
			await global.db.set(`backups.${genID}.guild`, guild);
			const backupdb = await global.db.get(`backups.${ctx.message.author.id}`);
			if (backupdb) {
				await global.db.push(`backups.${ctx.message.author.id}`, genID);
			}
			else {
				await global.db.set(`backups.${ctx.message.author.id}`, [genID]);
			}
			ctx.message.channel.slashReply({
				content: `:white_check_mark: ${ctx.message.author.mention} **|** Backup criado, ID: \`${genID}\`.`,
			});
		}
		if (ctx.args[0] === 'list') {
			const backupdb = await global.db.get(`backups.${ctx.message.author.id}`);
			if (!backupdb || !backupdb.length) {
				return ctx.message.channel.slashReply({
					content: `:x: ${ctx.message.author.mention} **|** Você não possui backups.`,
				});
			}
			else {
				const backupdb = await global.db.get(`backups.${ctx.message.author.id}`);
				const embed = new ctx.embed();
				embed.setTitle(`☁️ Backups | ${global.zuly.user.username}`);
				try {
					backupdb.map(async (back) => {
						const guild = await global.db.get(`backups.${back}.guild`);
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
						content: ctx.message.author.mention,
						embeds: [embed.get()],
					});
				}, 3000);
			}
		}
		if (ctx.args[0] === 'load') {
			if (!ctx.args[1]) return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** Insira o ID do backup após o comando, caso não saiba, use \`/backup list\`.`);
			const backupdb = await global.db.get(`backups.${ctx.message.author.id}`);
			if (!backupdb.includes(ctx.args[1])) return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** Você não possui o backup com o ID \`${ctx.args[1]}\`.`);
			const msg = await ctx.message.channel.slashReply(`⚠️ ${ctx.message.author.mention} **|** Você deseja carregar o backup? Saiba que todas as suas configurações serão substituidas pelo backup, não será recuperado **mensagens, cargos & canais** depois desse processo.\n> Para carregar reaja com \`✅\`.`);
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
					const guild = await global.db.get(`backups.${ctx.args[1]}.guild`);
					const roles = await global.db.get(`backups.${ctx.args[1]}.roles`);
					const channels = await global.db.get(`backups.${ctx.args[1]}.channels`);
					const currentGuild = ctx.message.channel.guild;
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
						role.delete().catch((e) => {
							console.log(e);
						});
					});
					setTimeout(() => {
						// Criando Cargos
						roles.forEach((cargo) => {
							currentGuild.createRole({
								name: cargo.name,
								color: cargo.color,
								permissions: cargo.permissions || 0,
								mentionable: cargo.mentionable,
								hoist: cargo.hoist,
								position: cargo.position,
								reason: 'Backup',
							}).catch((e) => {
								console.log(e);
							});
						});
						// Criando Canais
						channels.forEach((channel) => {
							currentGuild.createChannel(channel.name, channel.type, {
								position: channel.position,
								topic: channel.topic,
								rateLimitPerUser: channel.rateLimitPerUser || 0,
								reason: 'Backup',
							}).catch((e) => {
								console.log(e);
							});
						});
						// Editando Servidor
						currentGuild.edit({
							name: guild.name,
							icon: guild.icon,
							verificationLevel: guild.verificationLevel,
							afkTimeout: guild.afkTimeout,
							mfaLevel: guild.mfaLevel,
							splash: guild.splash,
							welcomeScreen: guild.welcomeScreen,
							widgetEnabled: guild.widgetEnabled,
						});
					}, 5000);
				}
			});
		}
		if (ctx.args[0] === 'delete') {
			if (!ctx.args[1]) return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** Insira o ID do backup após o comando, caso não saiba, use \`/backup list\`.`);
			await global.db.remove(`backups.${ctx.args[1]}.guild`);
			await global.db.remove(`backups.${ctx.args[1]}.roles`);
			await global.db.remove(`backups.${ctx.args[1]}.channels`);
			await global.db.pull(`backups.${ctx.message.author.id}`, ctx.args[1]);
			return ctx.message.channel.slashReply(`:white_check_mark: ${ctx.message.author.mention} **|** Backup \`${ctx.args[1]}\` deletado com sucesso.`);
		}
	}
};
