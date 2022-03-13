/* eslint-disable new-cap */
module.exports = class PingCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'messages',
				categoria: '🕰️ » Utilidades',
				desc: 'Veja a quantidade de mensagens de algum usuário.'
			},
			en: {
				nome: 'messages',
				categoria: '🕰️ » Utility',
				desc: 'See the amount of messages from any user.'
			},
			fr: {
				nome: 'messages',
				categoria: '🕰️ » Utilitaires',
				desc: 'Voir le nombre de messages d\'un utilisateur.'
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
					name: 'userid',
					description: 'The User ID',
					required: false
				},
				{
					type: 6,
					name: 'usermention',
					description: 'The User Mention',
					required: false
				}
			],
			aliases: ['msg', 'msgs', 'mensagens'],
			run: this.run
		};
	}

	async run (ctx) {
		const user = ctx.args[0] ? ctx.message.mentions[0] || await global.zuly.getRESTUser(ctx.args[0]) : ctx.message.author;
		let valor;
		const mensagens = await global.zuly.db.get(`messages-${ctx.message.guildID}-${user.id}`);
		if (mensagens) {
			valor = mensagens;
		}
		else {
			valor = 0;
		}
		const embed = new ctx.embed();
		embed.setTitle(`💬 ${ctx.idioma.messages.title}`);
		embed.setColor('#ffcbdb');
		embed.setDescription(`**${user.username}** ${ctx.idioma.messages.tem} **${valor} ${ctx.idioma.messages.msg}**`);
		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			embeds: [embed.get()]
		});
	}
};

// ADG, Davi e LRD
