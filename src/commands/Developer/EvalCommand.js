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
				desc: 'dev'
			},
			en: {
				nome: 'eval',
				categoria: '💻 » Dev',
				desc: 'dev'
			},
			aliases: ['eval', 'e'],
			run: this.run
		};
	}

	async run (ctx) {
		const { token } = require('../../config');
		const regexToken = new RegExp(`${token}`, 'gi');

		const msg = ctx.args.join(' ');
		if (!msg) return ctx.send('algo');
		if (msg.toLowerCase().includes('token') || msg.toLowerCase().includes('mongo')) return;
		try {
			// eslint-disable-next-line no-eval
			let eva = await eval(msg);
			if (eva instanceof Promise) eva = await eva;
			if (typeof eva !== 'string') eva = await require('util').inspect(eva, { depth: 0 });
			ctx.send(`\`\`\`js\n${eva.replace(regexToken, '\'amas\'').slice(0, 1990)}\`\`\``);
		}
		catch (e) {
			ctx.send(`\`\`\`js\n${`${e}`.slice(0, 1990)}\`\`\``);
		}
	}
};
