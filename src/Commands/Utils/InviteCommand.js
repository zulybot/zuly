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
				desc: 'Envia o link para me adicionar a outros servidores!'
			},
			en: {
				nome: 'invite',
				categoria: '🕰️ » Utility',
				desc: 'Send the link to add me to other servers!'
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
		embed.setTitle(`📩 ${ctx.idioma.invite.add}`);
		embed.setDescription(ctx.idioma.invite.desc.replace('%id', global.zuly.user.id));
		embed.setColor('#ffcbdb');
		embed.setThumbnail(global.zuly.user.avatarURL);
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			embeds: [embed.get()]
		});
	}
};
