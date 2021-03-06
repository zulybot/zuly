module.exports = class BanCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				botmod: true,
			},
			pt: {
				nome: 'botban',
				categoria: '💻 » Dev',
				desc: 'Bane algum usuário de usar o bot.'
			},
			en: {
				nome: 'botban',
				categoria: '💻 » Dev',
				desc: 'Ban some user from using the bot.'
			},
			fr: {
				nome: 'botban',
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
					type: 6,
					name: 'user',
					description: 'The User Mention',
					required: true,
					name_localizations: {
						'pt-BR': 'usuário',
						'en-US': 'user',
						'fr': 'utilisateur'
					},
					description_localizations: {
						'pt-BR': 'O usuário que você deseja banir.',
						'en-US': 'The user you want to ban.',
						'fr': 'L\'utilisateur que vous souhaitez bannir.'
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
						'pt-BR': 'O motivo do banimento.',
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
		const member = global.zuly.users.cache.get(ctx.args[0]) ? global.zuly.users.cache.get(ctx.args[0]) : await global.zuly.users.fetch(ctx.args[0]);

		let banReason = ctx.args.splice(1).join(' ');
		if (!banReason) {
			banReason = `${ctx.idioma.ban.mot}`;
		}
		const motivo = `${ctx.idioma.ban.mot2} ${ctx.message.author.username}#${ctx.message.author.discriminator} - ${ctx.idioma.ban.mot3} ${banReason}`;

		const mods = await global.zuly.db.get('mods');
		const deve = await global.zuly.db.get('devs');

		const devs = [];

		mods.forEach(mod => {
			devs.push(mod);
		});

		deve.forEach(dev => {
			devs.push(dev);
		});

		if (devs.includes(member.id)) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** Você não pode punir moderadores do bot.`
			});
		}
		await global.zuly.db.set(`botban-${member.id}`, motivo);

		const channel = await global.zuly.channels.cache.get('964867847245426689');
		channel.send(`:white_check_mark: **|** O Usuário \`${member.tag}\` (\`${member.id}\`) foi banido do bot.\n> <:zu_info:911303533859590144> \`${motivo}\``);

		ctx.message.channel.slashReply({
			content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.the} **${member.username}** ${ctx.idioma.ban.foi}`
		});
	}
};
// ADG, Davi e LRD
