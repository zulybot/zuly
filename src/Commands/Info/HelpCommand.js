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
		embed.title('<:zu_info:880812942713573396> ' + ctx.idioma.help.title + global.zuly.user.username);
		embed.color('#ffcbdb');

		switch (idioma) {
			case 'pt-br':
				if (ctx.args[0]) {
					const cmd = await global.zuly.commands.get(ctx.args[0]) || global.zuly.commands.find(cmd => cmd.aliases.includes(ctx.args[0]));

					if (!cmd) return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** Esse comando não existe`);
					const help = new ctx.embed();
					help.title('<:zu_info:880812942713573396> ' + `Informações do comando: \`${ctx.prefix}${cmd.pt.nome.toLowerCase()}\``);
					help.field('📚 Descrição:', `\`${cmd.pt.desc}\``, false);
					help.field(':small_blue_diamond: Permissões do bot:', `\`${cmd.permissoes.bot.join('`, `') || 'Esse comando não necessita de permissões'}\``, false);
					help.field(':small_orange_diamond: Permissões do usuário:', `\`${cmd.permissoes.membro.join('`, `') || 'Esse comando não necessita de permissões especiais para ser executado'}\``, false);
					help.thumbnail(global.zuly.user.avatarURL);
					help.color('#ffcbdb');

					if (cmd.aliases.join(', ') !== '') {
						help.field(':twisted_rightwards_arrows: Sinônimos:', `\`${cmd.aliases.join('`, `')}\``, false);
					}

					return ctx.send(help.create);
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
				embed.description(`>>> Olá, meu nome é: **${global.zuly.user.username}**!\nAtualmente possuo: **${global.zuly.commands.size}** comandos;\nMe [adicione](https://discord.com/oauth2/authorize?client_id=880173509077266483&scope=bot%20applications.commands&permissions=805432446), ou se junte ao meu [suporte](https://discord.gg/2pFH6Yy) caso queira!`);
				embed.thumbnail(global.zuly.user.avatarURL);
				for (const categoria in categorias) {
					embed.field(categoria + ` [${categorias[categoria].length}]`, `${categorias[categoria].join(', ')}`);
				}
				embed.field('🔗 » Links', `[Invite Me](https://discord.com/oauth2/authorize?client_id=${global.zuly.user.id}&scope=bot%20applications.commands&permissions=805432446) » [Support Sever](https://discord.gg/pyyyJpw5QW) » [Vote for us](https://top.gg/bot/880173509077266483/vote)`);
				if (!ctx.message.channel.nsfw) {
					embed.footer(ctx.idioma.help.nsfw + ctx.idioma.help.creators + devs.join(', '));
				}
				else {
					embed.footer(ctx.idioma.help.creators + devs.join(', '));
				}
				ctx.send(embed.create);

				break;

			case 'en-us':
				if (ctx.args[0]) {
					const cmd = await global.zuly.commands.get(ctx.args[0]) || global.zuly.commands.find(cmd => cmd.aliases.includes(ctx.args[0]));

					if (!cmd) return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** This command does not exist`);
					const help = new ctx.embed();
					help.title('<:zu_info:880812942713573396> ' + `Command information: \`${ctx.prefix}${cmd.pt.nome.toLowerCase()}\``);
					help.field('📚 Description:', `\`${cmd.en.desc}\``, false);
					help.field(':small_blue_diamond: Bot permissions:', `\`${cmd.permissoes.bot.join('`, `') || 'This command does not need permissions.'}\``, false);
					help.field(':small_orange_diamond: User permissions:', `\`${cmd.permissoes.membro.join('`, `') || 'This command does not need special permissions to run'}\``, false);
					help.thumbnail(global.zuly.user.avatarURL);
					help.color('#ffcbdb');

					if (cmd.aliases.join(', ') !== '') {
						help.field(':twisted_rightwards_arrows: Aliases:', `\`${cmd.aliases.join('`, `')}\``, false);
					}

					return ctx.send(help.create);
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
				embed.description(`>>> Hi, my name is: **${global.zuly.user.username}**!\nI currently have: **${global.zuly.commands.size}** commands;\nMe [add](https://discord.com/oauth2/authorize?client_id=719524114536333342&scope=bot%20applications.commands&permissions=805432446), or join my [support](https://discord.gg/2pFH6Yy) if you want!`);
				embed.thumbnail(global.zuly.user.avatarURL);
				for (const categoria in categorias) {
					embed.field(categoria + ` [${categorias[categoria].length}]`, `${categorias[categoria].join(', ')}`);
				}

				if (!ctx.message.channel.nsfw) {
					embed.footer('⛔ ' + ctx.idioma.help.nsfw + ctx.idioma.help.creators + devs.join(', '));
				}
				else {
					embed.footer(ctx.idioma.help.creators + devs.join(', '));
				}
				ctx.send(embed.create);
				break;
		}
	}
};
