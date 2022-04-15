module.exports = class AddmodCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				botmod: true,
			},
			pt: {
				nome: 'modlist',
				categoria: '💻 » Dev',
				desc: 'Adiciona um usuário como moderador do bot.'
			},
			en: {
				nome: 'modlist',
				categoria: '💻 » Dev',
				desc: 'Add a user as a bot moderator.'
			},
			fr: {
				nome: 'modlist',
				categoria: '💻 » Dev',
				desc: 'Ajoutez un utilisateur en tant que modérateur du bot.'
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
			aliases: ['eval', 'e'],
			run: this.run
		};
	}

	async run (ctx) {
		const devs = await global.zuly.db.get('devs');
		const mods = await global.zuly.db.get('mods');

		const list = [];

		devs.forEach(dev => {
			list.push(dev);
		});

		mods.forEach(mod => {
			list.push(mod);
		});

		const users = [];

		list.forEach(async id => {
			const usera = await global.zuly.users.fetch(id);
			users.push('`' + usera.username + '#' + usera.discriminator + '`');
		});
		setTimeout(() => {
			ctx.message.channel.slashReply({
				content: `📋 **|** Lista de Moderadores do Bot:\n\n>>> - ${users.join('\n- ')}`
			});
		}, 1000);
	}
};
