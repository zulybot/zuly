/* eslint-disable new-cap */
/* eslint-disable no-useless-concat */

module.exports = class Ajuda {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'help',
				categoria: '📖 » Informação',
				desc: 'Veja minha lista de comandos!'
			},
			en: {
				nome: 'help',
				categoria: '📖 » Information',
				desc: 'View my command list!'
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
				}
			],
			aliases: ['cmds', 'commands', 'comandos', 'ajuda'],
			run: this.run
		};
	}

	async run (ctx) {
		let idioma = await global.db.get(`idioma-${ctx.message.guildID}`) || 'pt-br';
		require('colors');
		const devs = [];

		if (idioma === 'pt-zeDroguinha') {
			idioma = 'pt-br';
		}

		const desenvolvedores = await global.db.get('devs');
		for (const desenvolvedor of desenvolvedores) {
			const dev = await global.zuly.getRESTUser(desenvolvedor);
			devs.push(dev.username);
		}

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
					help.setThumbnail(global.zuly.user.avatarURL);
					help.setColor('#ffcbdb');

					help.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);

					return ctx.message.channel.slashReply({
						content: ctx.message.author.mention,
						embeds: [help.get()],
						flags: ctx.ephemeral
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
				embed.setDescription(`>>> Olá, meu nome é: **${global.zuly.user.username}**!\nAtualmente possuo: **${global.zuly.commands.size}** comandos;\nMe [adicione](https://discord.com/oauth2/authorize?client_id=880173509077266483&scope=bot%20applications.commands&permissions=805432446), ou se junte ao meu [suporte](https://discord.gg/pyyyJpw5QW) caso queira!`);
				embed.setThumbnail(global.zuly.user.avatarURL);
				for (const categoria in categorias) {
					embed.addField(categoria + ` [${categorias[categoria].length}]`, `${categorias[categoria].join(', ') || '⠀'}`);
				}
				if (!ctx.message.channel.nsfw) {
					embed.setFooter('⤷ zulybot.xyz | ' + ctx.idioma.help.nsfw + ctx.idioma.help.creators + devs.join(', '), global.zuly.user.avatarURL);
				}
				else {
					embed.setFooter('⤷ zulybot.xyz | ' + ctx.idioma.help.creators + devs.join(', '), global.zuly.user.avatarURL);
				}
				ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()],
					flags: ctx.ephemeral
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
					help.setThumbnail(global.zuly.user.avatarURL);
					help.setColor('#ffcbdb');

					help.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);

					return ctx.message.channel.slashReply({
						content: ctx.message.author.mention,
						embeds: [help.get()],
						flags: ctx.ephemeral
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
				embed.setDescription(`>>> Hi, my name is: **${global.zuly.user.username}**!\nI currently have: **${global.zuly.commands.size}** commands;\nMe [add](https://discord.com/oauth2/authorize?client_id=719524114536333342&scope=bot%20applications.commands&permissions=805432446), or join my [support](https://discord.gg/pyyyJpw5QW) if you want!`);
				embed.setThumbnail(global.zuly.user.avatarURL);
				for (const categoria in categorias) {
					embed.addField(categoria + ` [${categorias[categoria].length}]`, `${categorias[categoria].join(', ') || '⠀'}`);
				}

				if (!ctx.message.channel.nsfw) {
					embed.setFooter(`⤷ https://zulybot.xyz | ${ctx.idioma.help.nsfw}  ${ctx.idioma.help.nsfw} ${ctx.idioma.help.creators} ${ctx.idioma.help.nsfw} ${ctx.idioma.help.creators} ${devs.join(', ')}`, global.zuly.user.avatarURL);
				}
				else {
					embed.setFooter(`⤷ https://zulybot.xyz | ${ctx.idioma.help.creators} ${devs.join(', ')}`, global.zuly.user.avatarURL);
				}
				ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()],
					flags: ctx.ephemeral
				});
				break;
		}
	}
};
