module.exports = class CalcCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'avatar',
				categoria: '🕰️ » Utilidades',
				desc: 'Veja informações sobre um usuário'
			},
			en: {
				nome: 'avatar',
				categoria: '🕰️ » Utility',
				desc: 'View information about a user'
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
			aliases: ['av', 'user-avatar', 'ua', 'memberavatar', 'profileavatar'],
			run: this.run
		};
	}

	async run (ctx) {
		const user = ctx.args[0] ? ctx.message.mentions[0] || await global.zuly.getRESTUser(ctx.args[0]).catch(() => ctx.message.author) : ctx.message.author;

		const embed = new ctx.embed();
		embed.title(`${ctx.idioma.avatar.title} __${user.username}#${user.discriminator}__`);
		embed.description(`> <:zu_download:890281922331291698> ${ctx.idioma.avatar.download} [${ctx.idioma.avatar.click}](${user.avatarURL})`);
		embed.color('#ffcbdb');
		embed.image(user.avatarURL);
		embed.thumbnail(global.zuly.avatarURL);
		ctx.send(embed.create);
	}
};
