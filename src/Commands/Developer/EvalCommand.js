module.exports = class EvalCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: true
			},
			pt: {
				nome: 'eval',
				categoria: '💻 » Dev',
				desc: 'Evalue codes.'
			},
			en: {
				nome: 'eval',
				categoria: '💻 » Dev',
				desc: 'Value codes.'
			},
			fr: {
				nome: 'eval',
				categoria: '💻 » Dev',
				desc: 'Codes de valeur.'
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
					description: 'the code',
					required: false
				}
			],
			aliases: ['eval', 'e'],
			run: this.run
		};
	}

	async run (ctx) {
		const { token } = require('../../Config/config');
		const regexToken = new RegExp(`${token}`, 'gi');
		const msg = ctx.args.join(' ');
		if (!msg) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** Insira o código que será evaluado!`,
				flags: ctx.ephemeral
			});
		}
		if (msg.toLowerCase().includes('token') || msg.toLowerCase().includes('mongo')) return;
		try {
			let eva = await eval(msg);
			if (eva instanceof Promise) eva = await eva;
			if (typeof eva !== 'string') eva = await require('util').inspect(eva, { depth: 0 });
			ctx.message.channel.slashReply({
				content: `\`\`\`js\n${eva.replace(regexToken, '\'amas\'').slice(0, 1990)}\`\`\``,
				flags: ctx.ephemeral
			});
		}
		catch (e) {
			ctx.message.channel.slashReply({
				content: `\`\`\`js\n${`${e}`.slice(0, 1990)}\`\`\``,
				flags: ctx.ephemeral
			});
		}
	}
};
