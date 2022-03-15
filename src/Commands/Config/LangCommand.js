module.exports = class LangCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD'],
				bot: []
			},
			pt: {
				nome: 'idioma',
				categoria: '⚙️ » Configuração',
				desc: 'Altera o idioma do bot.'
			},
			en: {
				nome: 'lang',
				categoria: '⚙️ » Configuration',
				desc: 'Changes the bot language.'
			},
			fr: {
				nome: 'lang',
				categoria: '⚙️ » Configuration',
				desc: 'Modifie la langue du bot.'
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
					name: 'language',
					description: 'Write the language to be used',
					required: false,
					choices: [
						{
							name: 'português',
							value: 'pt-br'
						},
						{
							name: 'english',
							value: 'en-us'
						},
						{
							name: 'français',
							value: 'fr-fr'
						}
					]
				}
			],
			aliases: ['setlang', 'guildlang'],
			run: this.run
		};
	}

	async run (ctx) {
		const langs = ['pt-br', 'en-us', 'fr-fr'];

		if (!ctx.args[0]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.multiLang.insertLang}`.replace('%p', ctx.prefix).replace('%langs', langs.join(', '))
			});
		}

		let langSelecionada = null;
		langs.forEach(lang => {
			if (ctx.args[0] === lang) {
				langSelecionada = lang;
			}
		});

		if (langSelecionada == null) {
			return ctx.message.channel.slashReply(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.multiLang.unknownLanguage}`.replace('%langs', '`' + langs.join(', ') + '`'));
		}
		else {
			switch (langSelecionada) {
				case langs[0]:
					await global.zuly.db.set(`idioma-${ctx.message.guild.id}`, langs[0]);
					return ctx.message.channel.slashReply({
						content: ':white_check_mark: **|** Agora irei falar `português-brasileiro` neste servidor!'
					});
				case langs[1]:
					await global.zuly.db.set(`idioma-${ctx.message.guild.id}`, langs[1]);
					return ctx.message.channel.slashReply({
						content: ':white_check_mark: **|** Now I will speak `english-us` on this guild!'
					});
				case langs[2]:
					await global.zuly.db.set(`idioma-${ctx.message.guild.id}`, langs[2]);
					return ctx.message.channel.slashReply({
						content: ':white_check_mark: **|** Maintenant, je vais parler `français-fr` sur cette guilde!'
					});
			}
		}
	}
};
