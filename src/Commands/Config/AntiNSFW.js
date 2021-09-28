module.exports = class LangCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['manageGuild'],
				bot: []
			},
			pt: {
				nome: 'antinsfw',
				categoria: '⚙️ » Configuração',
				desc: 'Proteje seu servidor de NSFW fora de canais NSFW.'
			},
			en: {
				nome: 'antinsfw',
				categoria: '⚙️ » Configuration',
				desc: 'Protect your NSFW content server out of NSFW channels.'
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
			aliases: ['anti-nsfw', 'nonsfw', 'anti-sfw'],
			run: this.run
		};
	}

	async run (ctx) {
		const nsfw = await global.db.get(`nsfw-${ctx.message.guildID}`);
		if (nsfw) {
			await global.db.delete(`nsfw-${ctx.message.guildID}`);
			return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.nsfw.desativado}`);
		}
		else {
			await global.db.set(`nsfw-${ctx.message.guildID}`, true);
			return ctx.message.channel.createMessage(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.nsfw.ativado}`);
		}
	}
};
