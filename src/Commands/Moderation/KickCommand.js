module.exports = class KickCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['kickMembers'],
				bot: ['kickMembers'],
				dono: false
			},
			pt: {
				nome: 'kick',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderação',
				desc: 'Bane algum usuário babaca de seu servidor.'
			},
			en: {
				nome: 'kick',
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
			options: [
				{
					type: 3,
					name: 'userid',
					description: 'The User ID',
					required: false,
				},
				{
					type: 6,
					name: 'usermention',
					description: 'The User Mention',
					required: false,
				},
				{
					type: 3,
					name: 'userid',
					description: 'The User ID',
					required: false,
				},
				{
					type: 3,
					name: 'reason',
					description: 'The reason for the kick',
					required: false,
				}
			],
			aliases: ['expulsar', 'hackkick', 'forcekick', 'kickar'],
			run: this.run
		};
	}

	async run (ctx) {
		let member;
		if (!ctx.args[0]) {
			return ctx.message.channel.createMessage({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.noarg}`
			});
		}

		if (!ctx.message.mentions[0]) {
			member = await global.zuly.getRESTUser(ctx.args[0]);
		}
		else {
			member = await ctx.message.mentions[0];
		}
		let banReason;
		if (ctx.args[1]) {
			banReason = ctx.args.slice(1).join(' ');
		}
		else {
			banReason = ctx.idioma.ban.mot;
		}
		ctx.message.channel.guild.kickMember(member.id, `${ctx.idioma.ban.mot2} ${ctx.message.author.tag} - ${ctx.idioma.ban.mot3} ${banReason}`);
	}
};

// ADG, Davi e LRD
