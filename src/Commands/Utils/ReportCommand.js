module.exports = class PrintCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: true
			},
			pt: {
				nome: 'report',
				categoria: '🕰️ » Utilidades',
				desc: 'Reporta um usuário que está indo contra as regras do discord/zuly.'
			},
			en: {
				nome: 'report',
				categoria: '🕰️ » Utility',
				desc: 'Reports a user who is going against the discord/zuly rules.'
			},
			fr: {
				nome: 'report',
				categoria: '🕰️ » Utilitaires',
				desc: 'Signale un utilisateur qui enfreint les règles discord/zuly.'
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
			aliases: ['av', 'user-avatar', 'ua', 'memberavatar', 'profileavatar'],
			run: this.run
		};
	}

	async run (ctx) {
		const proto = Math.random().toString(36).slice(2, 10);
		const link = `https://docs.google.com/forms/d/e/1FAIpQLSc62AsAArfsXXfrRDbTZXrb8pUlXB4Tgqw86Uazbasa-JySCA/viewform?usp=pp_url&entry.595373523=${proto}`;

		const dm = await global.zuly.users.fetch(ctx.message.author.id);

		try {
			dm.send(`✅ ${ctx.idioma.report.p1}\n\n> 📋 ${ctx.idioma.report.id} ||\`${proto}\`||\n\n🔗 Link: ${link}`).then(async msg => {
				global.zuly.db.set(proto, ctx.message.author.id);
				msg.react('885193463111483412');
				const ch = await global.zuly.channels.cache.get('970320554550779974');
				ch.send(`__**🔔 <@&880406988486479883> Nova Denúncia!**__\n\n- Autor: **${ctx.message.author.username}#${ctx.message.author.discriminator} (${ctx.message.author.id})**\n- ID do formulário: **${proto}**`);
			});
			ctx.message.channel.slashReply(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.report.dm}`);
		}
		catch (err) {
			ctx.message.channel.slashReply(`✅ ${ctx.idioma.report.p1}\n\n> 📋 ID do formulário: ||\`${proto}\`||\n\n🔗 Link: ${link}`).then(async msg => {
				global.zuly.db.set(proto, ctx.message.author.id);
				msg.react('885193463111483412');
				const ch = await global.zuly.channels.cache.get('970320554550779974');
				ch.send(`__**🔔 <@&880406988486479883> Nova Denúncia!**__\n\n- Autor: **${ctx.message.author.username}#${ctx.message.author.discriminator} (${ctx.message.author.id})**\n- ID do formulário: **${proto}**`);
			});
		}
	}
};
