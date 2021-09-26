/* eslint-disable new-cap */
module.exports = class InviteCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['embedLinks'],
				dono: false
			},
			pt: {
				nome: 'invite',
				categoria: '🕰️ » Utilidades',
				desc: 'Envia o link para me adicionar a outros servidores'
			},
			en: {
				nome: 'invite',
				categoria: '🕰️ » Utility',
				desc: 'Send the link to add me to other servers'
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
			aliases: ['convidar', 'convidarbot', 'invitebot', 'convite'],
			run: this.run
		};
	}

	async run (ctx) {
		const embed = new ctx.embed();
		embed.title(`📩 ${ctx.idioma.invite.add}`);
		embed.description(ctx.idioma.invite.desc.replace('%id', global.zuly.user.id));
		embed.color('#ffcbdb');
		embed.thumbnail(global.zuly.user.avatarURL);
		ctx.send(embed.create);
	}
};
