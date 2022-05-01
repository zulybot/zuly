module.exports = class GameCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'joke',
				categoria: '⭐ » Diversão',
				desc: 'Conta uma piada!'
			},
			en: {
				nome: 'joke',
				categoria: '⭐ » Fun',
				desc: 'Tell a joke!'
			},
			fr: {
				nome: 'joke',
				categoria: '⭐ » Divertissement',
				desc: 'Raconter une blague!'
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
			options: [],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const translate = require('@vitalets/google-translate-api');
		const { get } = require('axios');

		let pergunta;
		let resposta;

		get('https://adgdev.me/api/jokes').then(async res => {
			const data = res.data;

			const resp1 = await translate(data.pergunta, { to: 'en' });
			const resp2 = await translate(data.resposta, { to: 'en' });

			const resf1 = await translate(data.pergunta, { to: 'fr' });
			const resf2 = await translate(data.resposta, { to: 'fr' });

			if (ctx.idioma.lang === 'pt') {
				pergunta = data.pergunta;
				resposta = data.resposta;
			}
			else if (ctx.idioma.lang === 'en') {
				pergunta = resp1.text;
				resposta = resp2.text;
			}
			else if (ctx.idioma.lang === 'fr') {
				pergunta = resf1.text;
				resposta = resf2.text;
			}

			ctx.message.channel.slashReply({
				content: `❓ **-** ${ctx.message.author.mention} ${pergunta}\n🤣 **-** ${resposta}`
			});
		});
	}
};
