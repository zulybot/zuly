module.exports = class BaninfoCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['banMembers'],
				bot: ['banMembers'],
				dono: false
			},
			pt: {
				nome: 'baninfo',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderação',
				desc: 'Veja a informação de algum ban.'
			},
			en: {
				nome: 'baninfo',
				categoria: '<:zu_certifiedmod:885193463111483412> » Moderation',
				desc: 'See some ban info.'
			},
			fr: {
				nome: 'baninfo',
				categoria: '<:zu_certifiedmod:885193463111483412> » Modération',
				desc: 'Voir les informations d\'un ban.'
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
				}
			],
			aliases: ['checkban', 'infoban', 'informação-ban', 'ban-info'],
			run: this.run
		};
	}

	async run (ctx) {
		const ReactionCollector = require('../../Helpers/ReactionCollector');

		let member;
		if (!ctx.args[0]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.noarg}`
			});
		}

		if (!ctx.message.mentions[0]) {
			member = await global.zuly.getRESTUser(ctx.args[0]).then(info => info);
		}
		else {
			member = await ctx.message.mentions[0];
		}

		let banReason = ctx.args.splice(1).join(' ');
		if (!banReason) {
			banReason = `${ctx.idioma.ban.mot}`;
		}
		const motivo = `${ctx.idioma.ban.mot2} ${ctx.message.author.username}#${ctx.message.author.discriminator} - ${ctx.idioma.ban.mot3} ${banReason}`;

		const banInfo = await ctx.message.channel.guild.getBan(member.id);
		const embed = new global.zuly.manager.Ebl();
		embed.setTitle(`<:zu_certifiedmod:885193463111483412> BanInfo • ${member.username}#${member.discriminator}`);
		embed.setColor('#ffcbdb');
		embed.addField(`${ctx.idioma.baninfo.user}`, `\`\`\`${member.username}#${member.discriminator} (${member.id})\`\`\``);
		embed.addField(`${ctx.idioma.baninfo.reason}`, `\`\`\`${banInfo.reason}\`\`\``);
		embed.setFooter('⤷ zulybot.xyz | ' + ctx.idioma.baninfo.desban, global.zuly.user.avatarURL);
		embed.setThumbnail(member.avatarURL);
		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			embeds: [embed.get()]
		}).then(message => {
			message.addReaction('🐹');
			const collector = new ReactionCollector(message, {
				user: ctx.message.author,
				ignoreBot: true,
				emoji: '🐹',
				time: 60000,
				max: 1,
				acceptReactionRemove: false,
				stopOnCollect: true
			});
			collector.on('collect', async () => {
				await ctx.message.channel.guild.unbanMember(member.id, motivo);
				ctx.message.channel.slashReply(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.the} **${member.username}** ${ctx.idioma.ban.foi}`);
			});
		});
	}
};

// ADG, Davi e LRD
