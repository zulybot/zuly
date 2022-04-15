module.exports = class AddmodCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: true
			},
			pt: {
				nome: 'removemod',
				categoria: '💻 » Dev',
				desc: 'Adiciona um usuário como moderador do bot.'
			},
			en: {
				nome: 'removemod',
				categoria: '💻 » Dev',
				desc: 'Add a user as a bot moderator.'
			},
			fr: {
				nome: 'removemod',
				categoria: '💻 » Dev',
				desc: 'Supprime un utilisateur en tant que modérateur de bot.'
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
					required: true
				}
			],
			aliases: ['eval', 'e'],
			run: this.run
		};
	}

	async run (ctx) {
		const user = await global.zuly.users.fetch(ctx.args[0]);
		await global.zuly.db.pull('mods', user.id);
		ctx.message.channel.slashReply({
			content: `✅ ${ctx.message.author.mention} **|** O Usuário \`${user.username}#${user.discriminator}\` de ID \`${user.id}\` foi removido como meu moderador.`
		});
	}
};
