module.exports = class ExecCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: true
			},
			pt: {
				nome: 'exec',
				categoria: '💻 » Dev',
				desc: 'Executar coisas no terminal.'
			},
			en: {
				nome: 'exec',
				categoria: '💻 » Dev',
				desc: 'Run things in the terminal.'
			},
			fr: {
				nome: 'exec',
				categoria: '💻 » Dev',
				desc: 'Exécutez les choses dans le terminal.'
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
					name: 'code',
					description: 'O Código que será executado.',
					required: true
				}
			],
			aliases: ['exec', 'ec', 'publiceval'],
			run: this.run
		};
	}

	async run (ctx) {
		const { exec } = require('child_process');
		const code = ctx.args[0];
		if (!code) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** Insira o código que será executado!`,
				ephemeral: true
			});
		}
		else {
			ctx.message.channel.slashReply({
				content: `:white_check_mark: ${ctx.message.author.mention} **|** Executando...`,
				ephemeral: true
			});
			try {
				exec(code, (_erro, val) => {
					ctx.message.channel.slashReply({
						content: `:white_check_mark: ${ctx.message.author.mention} **|** ${val}`,
						ephemeral: true
					});
				});
			  }
			catch (err) {
				ctx.message.channel.slashReply({
					content: `:x: ${ctx.message.author.mention} **|** ${err}`,
					ephemeral: true
				});
			  }
		}
	}
};
