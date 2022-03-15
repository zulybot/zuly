module.exports = class BanCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['manageMessages'],
				bot: ['manageMessages'],
				dono: false
			},
			pt: {
				nome: 'mute',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderação',
				desc: 'Muta algum usuário babaca de seu servidor.'
			},
			en: {
				nome: 'mute',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderation',
				desc: 'Mute some idiot user from your server.'
			},
			fr: {
				nome: 'mute',
				categoria: '<:zu_certifiedmod:885193463111483412> » Modération',
				desc: 'Mute un idiot utilisateur de votre serveur.'
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
					name: 'usermention',
					description: 'The User Mention',
					required: false
				},
				{
					type: 3,
					name: 'userid',
					description: 'The User ID',
					required: false
				},
				{
					type: 3,
					name: 'reason',
					description: 'The reason for the ban',
					required: false
				},
				{
					type: 3,
					name: 'time',
					description: 'How long will the mute last',
					required: false
				}
			],
			aliases: ['banir', 'hackban', 'forceban'],
			run: this.run
		};
	}

	async run (ctx) {
		const ms = require('ms');
		let member;
		if (!ctx.args[0]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.noarg}`
			});
		}

		if (!ctx.messages[0]) {
			member = await global.zuly.users.fetch(ctx.args[0]).then(info => info).catch(() => {
				return ctx.message.channel.slashReply({
					content: `:x: ${ctx.message.author.mention} **|** Usuário desconhecido.`
				});
			});
		}
		else {
			member = await ctx.messages[0];
		}

		let banReason = ctx.args[1];
		if (!banReason) {
			banReason = `${ctx.idioma.ban.mot}`;
		}

		function timestamp (date) {
			let s = new Date(Date.now() + ms(date)).toUTCString();
			s = new Date(s).toISOString();
			return s;
		}

		const motivo = `${ctx.idioma.ban.mot2} ${ctx.message.author.username}#${ctx.message.author.discriminator} - ${ctx.idioma.ban.mot3} ${banReason}`;

		await global.zuly.muteMember(ctx.message.guild, member, motivo, timestamp(ctx.args[2]));

		ctx.message.channel.slashReply({
			content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.the} **${member.username}** ${ctx.idioma.ban.foi}`
		});
	}
};
// ADG, Davi e LRD
