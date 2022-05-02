module.exports = class BanCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				botmod: true,
			},
			pt: {
				nome: 'guildunban',
				categoria: '💻 » Dev',
				desc: 'Bane algum servidor de usar o bot.'
			},
			en: {
				nome: 'guildunban',
				categoria: '💻 » Dev',
				desc: 'Ban some guild from using the bot.'
			},
			fr: {
				nome: 'guildunban',
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
					required: true
				},
				{
					type: 3,
					name: 'reason',
					description: 'The reason for the ban',
					required: false
				}
			],
			aliases: ['zulyban'],
			run: this.run
		};
	}

	async run (ctx) {
		const member = await global.zuly.db.get(`cache-${ctx.args[0]}`);
		setTimeout(async () => {
			console.log(member);
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

			await (!guilds ? global.zuly.db.set('guilds', []) : global.zuly.db.pull('guilds', member.id));

			await global.zuly.db.del(`guildban-${member.id}`);

			const channel = await global.zuly.channels.cache.get('964867838835830784');
			channel.send(`:white_check_mark: **|** O Servidor \`${member.name}\` (\`${member.id}\`) foi desbanido do bot.\n> <:zu_info:911303533859590144> \`${motivo}\``);

			ctx.message.channel.slashReply({
				content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.the} **${member.name}** ${ctx.idioma.ban.foi}`
			});
		}, 1000);
	}
};
// ADG, Davi e LRD
