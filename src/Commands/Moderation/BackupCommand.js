/* eslint-disable no-undef */
module.exports = class BackupCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['ADMINISTRATOR'],
				bot: ['ADMINISTRATOR'],
				dono: true
			},
			pt: {
				nome: 'backup',
				categoria: '🛡️ » Moderação',
				desc: 'Gerencia backups do seu servidor.'
			},
			en: {
				nome: 'backup',
				categoria: '🛡️ » Moderation',
				desc: 'Manage backups of your server.'
			},
			fr: {
				nome: 'backup',
				categoria: '🛡️ » Modération',
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
					],
					name_localizations: {
						'pt-BR': 'opção',
						'en-US': 'option',
						'fr': 'option'
					},
					description_localizations: {
						'pt-BR': 'Escolha uma opção para executar',
						'en-US': 'Choose an option to perform',
						'fr': 'Choisissez une option à effectuer'
					}
				},
				{
					type: 3,
					name: 'backupid',
					description: 'Backup ID, required for delete & load.',
					required: false,
					name_localizations: {
						'pt-BR': 'idbackup',
						'en-US': 'backupid',
						'fr': 'sauvegardeid'
					},
					description_localizations: {
						'pt-BR': 'ID do backup, necessário para deletar e carregar.',
						'en-US': 'Backup ID, required for delete & load.',
						'fr': 'ID de sauvegarde, requis pour supprimer et charger.'
					}
				}
			],
			aliases: ['backups'],
			run: this.run
		};
	}

	async run (ctx) {
		const genID = await Math.random().toString(36).slice(2, 10);
		if (ctx.args[0] === 'create') {
			const tempo = Date.now();
			global.zuly.backup.create(ctx.message.guild, {
				maxMessagesPerChannel: 0,
				saveImages: 'base64'
			}).then(async (backupData) => {
				await global.zuly.db.set(`backups.${genID}`, backupData.id);
				const backupdb = await global.zuly.db.get(`backups.${ctx.message.author.id}`);
				await (backupdb ? global.zuly.db.push(`backups.${ctx.message.author.id}`, genID) : global.zuly.db.set(`backups.${ctx.message.author.id}`, [genID]));
				ctx.message.channel.slashReply({
					content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.backup.create.success}`.replace('%t', require('pretty-ms')(Date.now() - tempo)).replace('%id', genID),
				});
			});
		}
		if (ctx.args[0] === 'list') {
			const backupdb = await global.zuly.db.get(`backups.${ctx.message.author.id}`);
			if (!backupdb || !backupdb.length) {
				return ctx.message.channel.slashReply({
					content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.backup.list.noBackups}`,
				});
			}
			else {
				const backupdb = await global.zuly.db.get(`backups.${ctx.message.author.id}`);
				const embed = new ctx.embed();
				embed.setTitle(`☁️ Backups | ${global.zuly.user.username}`);
				try {
					backupdb.map(async (back) => {
						const backa = await global.zuly.db.get(`backups.${back}`);
						await global.zuly.backup.fetch(backa).then((backup) => {
							embed.addField(`${ctx.idioma.backup.list.backupID} ${back}`, `↳ **${backup.data.name}**\n↳ \`/backup load ${back}\``, true);
						});
					});
				}
				catch (e) {
					console.log(e);
				}
				embed.setColor('#ffcbdb');
				embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				setTimeout(() => {
					ctx.message.channel.slashReply({
						content: ctx.message.author.mention,
						embeds: [embed.get()],
					});
				}, 3000);
			}
		}
		if (ctx.args[0] === 'load') {
			if (!ctx.args[1]) return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.backup.load.error}`);
			const backupdb = await global.zuly.db.get(`backups.${ctx.message.author.id}`);
			if (!backupdb.includes(ctx.args[1])) return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.backup.load.error}`);

			const { MessageButton, MessageActionRow } = require('discord.js');
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('load')
						.setEmoji('972869930817036318')
						.setLabel(ctx.idioma.labels.load)
						.setStyle('DANGER')
				);

			await ctx.message.channel.slashReply({
				content: `⚠️ ${ctx.message.author.mention} **|** ${ctx.idioma.backup.load.confirm}`,
				components: [row]
			}).then(async () => {
				const filter = i => i.customId === 'load' && i.user.id === ctx.message.author.id;
				const collector = ctx.message.channel.createMessageComponentCollector({ filter, time: 180000 });
				collector.on('collect', async (i) => {
					const { MessageButton, MessageActionRow } = require('discord.js');
					const row = new MessageActionRow()
						.addComponents(
							new MessageButton()
								.setCustomId('load')
								.setEmoji('972869930817036318')
								.setLabel(ctx.idioma.labels.load)
								.setStyle('DANGER')
								.setDisabled(true)
						);
					i.update({
						content: `⚠️ ${ctx.message.author.mention} **|** ${ctx.idioma.backup.load.confirm}`,
						components: [row]
					});
					const back = await global.zuly.db.get(`backups.${ctx.args[1]}`);
					global.zuly.backup.load(back, ctx.message.guild, {
						clearGuildBeforeRestore: true,
						maxMessagesPerChannel: 0
					});
				});
			});
		}
		if (ctx.args[0] === 'delete') {
			if (!ctx.args[1]) return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** Insira o ID do backup após o comando, caso não saiba, use \`/backup list\`.`);
			await global.zuly.db.pull(`backups.${ctx.message.author.id}`, ctx.args[1]);
			const backupID = await global.zuly.db.get('backups.' + ctx.args[1]);
			await global.zuly.backup.remove(backupID);
			return ctx.message.channel.slashReply(`:white_check_mark: ${ctx.message.author.mention} **|** Backup \`${ctx.args[1]}\` deletado com sucesso.`);
		}
	}
};
