module.exports = class LangCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['manageGuild'],
				bot: []
			},
			pt: {
				nome: 'custom-command',
				categoria: '⚙️ » Configuração',
				desc: 'Cria um comando personalizado para seu servidor.'
			},
			en: {
				nome: 'custom-command',
				categoria: '⚙️ » Configuration',
				desc: 'Create a custom command for your server.'
			},
			fr: {
				nome: 'custom-command',
				categoria: '⚙️ » Configuration',
				desc: 'Créez une commande personnalisée pour votre serveur.'
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
					name: 'name',
					description: 'The Name of the command that will be created.',
					required: true,
				},
				{
					type: 3,
					name: 'description',
					description: 'The Description of the created command.',
					required: true,
				},
				{
					type: 3,
					name: 'reply',
					description: 'The Response of the command that will be created.',
					required: true,
				},
			],
			aliases: ['setlogs', 'guildlogs'],
			run: this.run
		};
	}

	async run (ctx) {
		const nome = ctx.args[0].toLowerCase();
		const command = await global.zuly.commands.get(nome);
		if (command) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author} **|** ${ctx.idioma.alreadyExists}`
			});
		}
		await global.zuly.requestHandler.request('POST', `/applications/${global.zuly.user.id}/guilds/${ctx.message.guild.id}/commands`, true, {
			type: 1,
			name: nome,
			description: `[🌀 » Custom] ${ctx.args[1] || 'No Description'}`,
		});
		ctx.message.channel.slashReply({
			content: `:white_check_mark: ${ctx.message.author} **|** ${ctx.idioma.customCommand}`.replace('%n', nome)
		}).then(async () => {
			await global.zuly.db.set(`custom-command-${nome}-${ctx.message.guild.id}`, ctx.args[2]);
		});
	}
};
