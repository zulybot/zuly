module.exports = class BanCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				botmod: true,
			},
			pt: {
				nome: 'guildban',
				categoria: '💻 » Dev',
				desc: 'Bane algum servidor de usar o bot.'
			},
			en: {
				nome: 'guildban',
				categoria: '💻 » Dev',
				desc: 'Ban some guild from using the bot.'
			},
			fr: {
				nome: 'guildban',
				categoria: '💻 » Dev',
				desc: 'Interdire à certains utilisateurs d\'utiliser le bot.'
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
					name: 'guild',
					description: 'The Guild ID',
					required: true,
					name_localizations: {
						'pt-BR': 'servidor',
						'en-US': 'guild',
						'fr': 'serveur'
					},
					description_localizations: {
						'pt-BR': 'ID do servidor que você deseja banir.',
						'en-US': 'The Guild ID you want to ban.',
						'fr': 'L\'ID du serveur que vous souhaitez bannir.'
					}
				},
				{
					type: 3,
					name: 'reason',
					description: 'The reason for the ban',
					required: false,
					name_localizations: {
						'pt-BR': 'motivo',
						'en-US': 'reason',
						'fr': 'raison'
					},
					description_localizations: {
						'pt-BR': 'Motivo do banimento.',
						'en-US': 'The reason for the ban.',
						'fr': 'La raison du ban.'
					}
				}
			],
			aliases: ['zulyban'],
			run: this.run
		};
	}

	async run (ctx) {
		const member = await global.zuly.guilds.cache.get(ctx.args[0]);
		setTimeout(async () => {
			let banReason = ctx.args.splice(1).join(' ');
			if (!banReason) {
				banReason = `${ctx.idioma.ban.mot}`;
			}
			const motivo = `${ctx.idioma.ban.mot2} ${ctx.message.author.username}#${ctx.message.author.discriminator} - ${ctx.idioma.ban.mot3} ${banReason}`;

			if (ctx.args[0] === '880174783294214184') {
				return ctx.message.channel.slashReply({
					content: `:x: ${ctx.message.author.mention} **|** Você não pode banir o servidor de suporte do bot.`
				});
			}

			const guilds = await global.zuly.db.get('guilds');

			await (!guilds ? global.zuly.db.set('guilds', [member.id]) : global.zuly.db.push('guilds', member.id));

			await global.zuly.db.set(`cache-${ctx.args[0]}`, {
				id: member.id,
				name: member.name,
				icon: member.iconURL(),
				owner: member.ownerID,
				members: member.memberCount,
				boosts: member.premiumSubscriptionCount,
			});
			await global.zuly.db.set(`guildban-${member.id}`, motivo);
			await global.zuly.db.set(`alderaybanned-${member.id}`, motivo);

			const channel = await global.zuly.channels.cache.get('964867838835830784');
			channel.send(`:white_check_mark: **|** O Servidor \`${member.name}\` (\`${member.id}\`) foi banido do bot.\n> <:zu_info:911303533859590144> \`${motivo}\``);

			ctx.message.channel.slashReply({
				content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.the} **${member.name}** ${ctx.idioma.ban.foi}`
			});

			member.leave();
		}, 1000);
	}
};
// ADG, Davi e LRD
