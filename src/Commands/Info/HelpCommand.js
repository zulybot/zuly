/* eslint-disable new-cap */
/* eslint-disable no-useless-concat */

module.exports = class Ajuda {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'ajuda',
				categoria: '📖 » Informação',
				desc: 'Veja minha lista de comandos!'
			},
			en: {
				nome: 'help',
				categoria: '📖 » Information',
				desc: 'View my command list!'
			},
			fr: {
				nome: 'aider',
				categoria: '📖 » Information',
				desc: 'Voir ma liste de commandes!'
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
					name: 'command',
					description: 'The Command you want to see about',
					required: false,
					name_localizations: {
						'pt-BR': 'comando',
						'en-US': 'command',
						'fr': 'commande'
					},
					description_localizations: {
						'pt-BR': 'O comando que você quer saber sobre.',
						'en-US': 'The Command you want to see about.',
						'fr': 'La commande que vous voulez voir à propos.'
					}
				}
			],
			aliases: ['cmds', 'commands', 'comandos', 'ajuda'],
			run: this.run
		};
	}

	async run (ctx) {
		let idioma = await global.zuly.db.get(`idioma-${ctx.message.guild.id}`) || 'pt-br';

		const categorias = {};
		const embed = new ctx.embed();

		embed.setTitle('<:zu_info:880812942713573396> ' + ctx.idioma.help.title + global.zuly.user.username);
		embed.setColor('#ffcbdb');

		switch (idioma) {
			case 'pt-br':
				if (ctx.args[0]) {
					const cmd = await global.zuly.commands.get(ctx.args[0]) || global.zuly.commands.find(cmd => cmd.aliases.includes(ctx.args[0]));

					if (!cmd) return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** Esse comando não existe`);
					const help = new ctx.embed();
					help.setTitle('<:zu_info:880812942713573396> ' + `Informações do comando: \`${ctx.prefix}${cmd.pt.nome.toLowerCase()}\``);
					help.addField('📚 Descrição:', `\`${cmd.pt.desc}\``, false);
					help.addField(':small_blue_diamond: Permissões do bot:', `\`${cmd.permissoes.bot.join('`, `') || 'Esse comando não necessita de permissões'}\``, false);
					help.addField(':small_orange_diamond: Permissões do usuário:', `\`${cmd.permissoes.membro.join('`, `') || 'Esse comando não necessita de permissões especiais para ser executado'}\``, false);
					help.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
					help.setColor('#ffcbdb');

					help.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

					return ctx.message.channel.slashReply({
						content: ctx.message.author.mention,
						embeds: [help.get()],
						components: [
							{
								type: 1,
								components: [
									{
										type: 2,
										label: `${ctx.idioma.mention.labels.support}`,
										style: 5,
										url: 'https://discord.gg/8SA5sfyR7g'
									},
									{
										type: 2,
										label: `${ctx.idioma.mention.labels.invite}`,
										style: 5,
										url: 'https://discord.com/oauth2/authorize?client_id=' + global.zuly.user.id + '&scope=bot%20applications.commands&permissions=268823622'
									},
									{
										type: 2,
										label: `${ctx.idioma.mention.labels.website}`,
										style: 5,
										url: 'https://zulybot.xyz/'
									}
								]
							}
						],
						ephemeral: true
					});
				}

				global.zuly.commands.forEach(comando => {
					if (comando.permissoes.nsfw) {
						if (!ctx.message.channel.nsfw) return;
					}
					if (!comando.permissoes.dono) {
						// console.log(`[HELP] Commando ${comando.pt.nome} foi exbido no ajuda`.brightCyan)
					}
					else {
						return;
					}
					if (!categorias[comando.pt.categoria]) { categorias[comando.pt.categoria] = []; }
					categorias[comando.pt.categoria].push(
						`\`${comando.pt.nome}\``
					);
				});
				embed.setDescription(`>>> Olá, meu nome é: **${global.zuly.user.username}**!\nAtualmente possuo: **${global.zuly.commands.size}** comandos;\nMe [adicione](https://discord.com/oauth2/authorize?client_id=880173509077266483&scope=bot%20applications.commands&permissions=805432446), ou se junte ao meu [suporte](https://discord.gg/pyyyJpw5QW) caso queira!\nVeja meus comandso em meu [website](https://zulybot.xyz/commands).\n↳ [Ei, que tal dar uma passadinha na Twitch do meu amigo Lucaas?](https://www.twitch.tv/lucaas0007)`);
				embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				for (const categoria in categorias) {
					embed.addField(categoria + ` [${categorias[categoria].length}]`, `${categorias[categoria].join(', ') || '⠀'}`);
				}
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()],
					components: [
						{
							type: 1,
							components: [
								{
									type: 2,
									label: `${ctx.idioma.mention.labels.support}`,
									style: 5,
									url: 'https://discord.gg/8SA5sfyR7g'
								},
								{
									type: 2,
									label: `${ctx.idioma.mention.labels.invite}`,
									style: 5,
									url: 'https://discord.com/oauth2/authorize?client_id=' + global.zuly.user.id + '&scope=bot%20applications.commands&permissions=268823622'
								},
								{
									type: 2,
									label: `${ctx.idioma.mention.labels.website}`,
									style: 5,
									url: 'https://zulybot.xyz/'
								}
							]
						}
					],
					ephemeral: true
				});

				break;
			case 'fr-fr':
				if (ctx.args[0]) {
					const cmd = await global.zuly.commands.get(ctx.args[0]) || global.zuly.commands.find(cmd => cmd.aliases.includes(ctx.args[0]));
					if (!cmd) return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** Esse comando não existe`);
					const help = new ctx.embed();
					help.setTitle('<:zu_info:880812942713573396> ' + `Infos commande: \`${ctx.prefix}${cmd.pt.nome.toLowerCase()}\``);
					help.addField('📚 La description:', `\`${cmd.fr.desc}\``, false);
					help.addField(':small_blue_diamond: Autorisations des robots:', `\`${cmd.permissoes.bot.join('`, `') || 'Cette commande n\'a pas besoin d\'autorisations.'}\``, false);
					help.addField(':small_orange_diamond: Autorisations utilisateur:', `\`${cmd.permissoes.membro.join('`, `') || 'Cette commande n\'a pas besoin d\'autorisations spéciales pour s\'exécuter.'}\``, false);
					help.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
					help.setColor('#ffcbdb');
					help.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

					return ctx.message.channel.slashReply({
						content: ctx.message.author.mention,
						embeds: [help.get()],
						components: [
							{
								type: 1,
								components: [
									{
										type: 2,
										label: `${ctx.idioma.mention.labels.support}`,
										style: 5,
										url: 'https://discord.gg/8SA5sfyR7g'
									},
									{
										type: 2,
										label: `${ctx.idioma.mention.labels.invite}`,
										style: 5,
										url: 'https://discord.com/oauth2/authorize?client_id=' + global.zuly.user.id + '&scope=bot%20applications.commands&permissions=268823622'
									},
									{
										type: 2,
										label: `${ctx.idioma.mention.labels.website}`,
										style: 5,
										url: 'https://zulybot.xyz/'
									}
								]
							}
						],
						ephemeral: true
					});
				}

				global.zuly.commands.forEach(comando => {
					if (comando.permissoes.nsfw) {
						if (!ctx.message.channel.nsfw) return;
					}
					if (!comando.permissoes.dono) {
						// console.log(`[HELP] Commando ${comando.pt.nome} foi exbido no ajuda`.brightCyan)
					}
					else {
						return;
					}
					if (!categorias[comando.fr.categoria]) { categorias[comando.fr.categoria] = []; }
					categorias[comando.fr.categoria].push(
						`\`${comando.fr.nome}\``
					);
				});
				embed.setDescription(`>>> Bonjour, mon nom est: **${global.zuly.user.username}**!\nJ'ai actuellement: **${global.zuly.commands.size}** commandes;\nAjoute [moi](https://discord.com/oauth2/authorize?client_id=880173509077266483&scope=bot%20applications.commands&permissions=805432446), ou rejoignez mon [soutien](https://discord.gg/pyyyJpw5QW) si tu veux!\nVoir mes commandes sur mon [site Web](https://zulybot.xyz/commands).\n↳ [Hé, que diriez-vous de jeter un œil au Twitch de mon ami Lucaas?](https://www.twitch.tv/lucaas0007)`);
				embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				for (const categoria in categorias) {
					embed.addField(categoria + ` [${categorias[categoria].length}]`, `${categorias[categoria].join(', ') || '⠀'}`);
				}
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()],
					components: [
						{
							type: 1,
							components: [
								{
									type: 2,
									label: `${ctx.idioma.mention.labels.support}`,
									style: 5,
									url: 'https://discord.gg/pyyyJpw5QW'
								},
								{
									type: 2,
									label: `${ctx.idioma.mention.labels.invite}`,
									style: 5,
									url: 'https://discord.com/oauth2/authorize?client_id=' + global.zuly.user.id + '&scope=bot%20applications.commands&permissions=268823622'
								},
								{
									type: 2,
									label: `${ctx.idioma.mention.labels.website}`,
									style: 5,
									url: 'https://zulybot.xyz/'
								}
							]
						}
					],
					ephemeral: true
				});
				break;
			case 'en-us':
				if (ctx.args[0]) {
					const cmd = await global.zuly.commands.get(ctx.args[0]) || global.zuly.commands.find(cmd => cmd.aliases.includes(ctx.args[0]));

					if (!cmd) return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** This command does not exist`);
					const help = new ctx.embed();
					help.setTitle('<:zu_info:880812942713573396> ' + `Command information: \`${ctx.prefix}${cmd.pt.nome.toLowerCase()}\``);
					help.addField('📚 Description:', `\`${cmd.en.desc}\``, false);
					help.addField(':small_blue_diamond: Bot permissions:', `\`${cmd.permissoes.bot.join('`, `') || 'This command does not need permissions.'}\``, false);
					help.addField(':small_orange_diamond: User permissions:', `\`${cmd.permissoes.membro.join('`, `') || 'This command does not need special permissions to run'}\``, false);
					help.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
					help.setColor('#ffcbdb');

					help.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));

					return ctx.message.channel.slashReply({
						content: ctx.message.author.mention,
						embeds: [help.get()],
						ephemeral: true
					});
				}
				global.zuly.commands.forEach(cmd => {
					if (cmd.permissoes.nsfw) {
						if (!ctx.message.channel.nsfw) return;
					}
					if (!cmd.permissoes.dono) {
						// console.log('[HELP] Passou')
					}
					else {
						return;
					}
					if (!categorias[cmd.en.categoria]) {
						categorias[cmd.en.categoria] = [];
					}
					categorias[cmd.en.categoria].push(`\`${cmd.en.nome}\``);
				});
				embed.setDescription(`>>> Hi, my name is: **${global.zuly.user.username}**!\nI currently have: **${global.zuly.commands.size}** commands;\nMe [add](https://discord.com/oauth2/authorize?client_id=719524114536333342&scope=bot%20applications.commands&permissions=805432446), or join my [support](https://discord.gg/pyyyJpw5QW) if you want!\nSee my commands on my [website](https://zulybot.xyz/commands).\n↳ [Hey, how about stopping by my friend Lucaas Twitch?](https://www.twitch.tv/lucaas0007)`);
				embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				for (const categoria in categorias) {
					embed.addField(categoria + ` [${categorias[categoria].length}]`, `${categorias[categoria].join(', ') || '⠀'}`);
				}

				embed.setFooter('⤷ https://zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()],
					components: [
						{
							type: 1,
							components: [
								{
									type: 2,
									label: `${ctx.idioma.mention.labels.support}`,
									style: 5,
									url: 'https://discord.gg/pyyyJpw5QW'
								},
								{
									type: 2,
									label: `${ctx.idioma.mention.labels.invite}`,
									style: 5,
									url: 'https://discord.com/oauth2/authorize?client_id=' + global.zuly.user.id + '&scope=bot%20applications.commands&permissions=268823622'
								},
								{
									type: 2,
									label: `${ctx.idioma.mention.labels.website}`,
									style: 5,
									url: 'https://zulybot.xyz/'
								}
							]
						}
					],
					ephemeral: true
				});
				break;
		}
	}
};
