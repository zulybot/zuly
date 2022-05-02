module.exports = class BanCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['BAN_MEMBERS'],
				bot: ['BAN_MEMBERS'],
				dono: false
			},
			pt: {
				nome: 'unban',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderação',
				desc: 'Desbane algum usuário babaca de seu servidor.'
			},
			en: {
				nome: 'unban',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderation',
				desc: 'Unban some idiot user from your server.'
			},
			fr: {
				nome: 'unban',
				categoria: '<:zu_certifiedmod:885193463111483412> » Modération',
				desc: 'Débannir quelqu\'un de votre serveur.'
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
					type: 6,
					name: 'user',
					description: 'The user to unban.',
					required: true
				},
				{
					type: 3,
					name: 'reason',
					description: 'The reason for the unban.',
					required: true
				}
			],
			aliases: ['desbanir', 'hackunban', 'forceunban'],
			run: this.run
		};
	}

	async run (ctx) {
		let member;
		if (!ctx.args[0]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.noarg}`
			});
		}

		member = await (ctx.args[0] ? global.zuly.users.fetch(ctx.args[0]).then(info => info).catch(() => {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** Usuário desconhecido.`
			});
		}) : ctx.args[0]);

		let banReason = ctx.args.splice(1).join(' ');
		if (!banReason) {
			banReason = `${ctx.idioma.ban.mot}`;
		}
		const motivo = `${ctx.idioma.ban.mot2} ${ctx.message.author.username}#${ctx.message.author.discriminator} - ${ctx.idioma.ban.mot3} ${banReason}`;

		ctx.message.guild.members.unban(member.id, motivo);

		ctx.message.channel.slashReply({
			content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.the} **${member.username}** ${ctx.idioma.ban.foi}`
		});
	}
};
// ADG, Davi e LRD
