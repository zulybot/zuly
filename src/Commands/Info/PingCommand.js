module.exports = class PingCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'ping',
				categoria: '📖 » Informação',
				desc: 'Veja a latência do bot.'
			},
			en: {
				nome: 'ping',
				categoria: '📖 » Information',
				desc: 'See bot latency.'
			},
			fr: {
				nome: 'ping',
				categoria: '📖 » Information',
				desc: 'Voir la latence du bot.'
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
			aliases: ['latency', 'ws', 'pong'],
			run: this.run
		};
	}

	async run (ctx) {
		const mongoose = require('mongoose');
		const date = Date.now();
		const pingDB = new Promise((r) =>
			mongoose.connection.db.admin().ping(() => r(Date.now() - date))
		);
		return ctx.message.channel.slashReply({
			content: `🏓 **|** ${ctx.message.author.mention} Pong!\n- **API Ping:** \`${global.zuly.shards.random().latency}ms\`\n- **Database:** \`${await pingDB}ms\``,
		});
	}
};
// ADG, Davi e LRD
