module.exports = class BanCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['banMembers'],
				bot: ['banMembers'],
				dono: false
			},
			pt: {
				nome: 'ban',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderação',
				desc: 'Bane algum usuário babaca de seu servidor.'
			},
			en: {
				nome: 'ban',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderation',
				desc: 'Bane algum usuário babaca de seu servidor'
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
			aliases: ['banir', 'hackban', 'forceban'],
			run: this.run
		};
	}

	async run (ctx) {
		let member;
		if (!ctx.args[0]) return ctx.reply(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.noarg}`);

		if (!ctx.message.mentions[0]) {
			member = await global.zuly.getRESTUser(ctx.args[0]).then(info => info).catch(() => {
				return ctx.send(`:x: ${ctx.message.author.mention} **|** Usuário desconhecido.`);
			});
		}
		else {
			member = await ctx.message.mentions[0];
		}

		let banReason = ctx.args.splice(1).join(' ');
		if (!banReason) {
			banReason = `${ctx.idioma.ban.mot}`;
		}
		const motivo = `${ctx.idioma.ban.mot2} ${ctx.message.author.username}#${ctx.message.author.discriminator} - ${ctx.idioma.ban.mot3} ${banReason}`;

		ctx.message.channel.guild.banMember(member.id, 0, motivo);

		ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.the} **${member.username}** ${ctx.idioma.ban.foi}`);
	}
};
// ADG, Davi e LRD
