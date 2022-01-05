module.exports = class LangCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['manageGuild'],
				bot: []
			},
			pt: {
				nome: 'logs',
				categoria: '⚙️ » Configuração',
				desc: 'Seta um canal para as logs de mensagem.'
			},
			en: {
				nome: 'logs',
				categoria: '⚙️ » Configuration',
				desc: 'Sets a channel for message logs.'
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
					type: 7,
					name: 'channel',
					description: 'Seta um canal para as logs de mensagem.',
					required: true,
				}
			],
			aliases: ['setlogs', 'guildlogs'],
			run: this.run
		};
	}

	async run (ctx) {
		const canal = await global.zuly.getRESTChannel(ctx.args[0].replace(/<#/g, '').replace(/>/g, ''));
		await global.db.set(`logs-${ctx.message.guildID}`, canal.id);

		ctx.message.channel.slashReply({
			content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.logs.set}`.replace('%c', canal.name)
		});
	}
};
