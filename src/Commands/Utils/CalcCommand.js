module.exports = class CalcCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'calc',
				categoria: '🕰️ » Utilidades',
				desc: 'Calcula uma expressão aritmética.'
			},
			en: {
				nome: 'calc',
				categoria: '🕰️ » Utility',
				desc: 'Calculates an arithmetic expression.'
			},
			fr: {
				nome: 'calc',
				categoria: '🕰️ » Utilitaires',
				desc: 'Calcule une expression arithmétique.'
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
					name: 'expression',
					description: 'The Expression that will be evaluated',
					required: true,
					name_localizations: {
						'pt-BR': 'expressão',
						'en-US': 'expression',
						'fr': 'expression'
					},
					description_localizations: {
						'pt-BR': 'A expressão que será avaliada.',
						'en-US': 'The expression that will be evaluated.',
						'fr': 'L\'expression qui sera évaluée.'
					}
				}
			],
			aliases: ['math', 'calcular', 'calculadora'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.calc.ex.replace('%p', ctx.prefix)}`
			});
		}
		const math = require('math-expression-evaluator');
		let val;
		try {
			val = math.eval(ctx.args.join(' '));
		}
		catch (err) {
			return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.calc.inv}`);
		}
		ctx.message.channel.slashReply({
			content: `<:zu_calc:880851703442833408> ${ctx.message.author.mention} **|** ${ctx.idioma.calc.res}: \`${val}\``
		});
	}
};
