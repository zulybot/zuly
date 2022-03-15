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
				desc: 'Veja o avatar de algum usuário.'
			},
			en: {
				nome: 'avatar',
				categoria: '🕰️ » Utility',
				desc: 'See a user\'s avatar.'
			},
			fr: {
				nome: 'avatar',
				categoria: '🕰️ » Utilitaires',
				desc: 'Voir l\'avatar d\'un utilisateur.'
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
			aliases: ['av', 'user-avatar', 'ua', 'memberavatar', 'profileavatar'],
			run: this.run
		};
	}

	async run (ctx) {
		const user = await global.zuly.users.fetch(ctx.args[0]).catch(() => ctx.message.author) || ctx.message.author;

		const embed = new ctx.embed();
		embed.setTitle(`${ctx.idioma.avatar.title} __${user.username}#${user.discriminator}__`);
		embed.setDescription(`> <:zu_download:890281922331291698> ${ctx.idioma.avatar.download} [${ctx.idioma.avatar.click}](${user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 })})`);
		embed.setColor('#ffcbdb');
		embed.setImage(user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			embeds: [embed.get()]
		});
	}
};
