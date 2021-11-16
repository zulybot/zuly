module.exports = class LangCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['manageGuild'],
				bot: []
			},
			pt: {
				nome: 'eventlog',
				categoria: '⚙️ » Configuração',
				desc: 'Seta um canal para receber atualizações.'
			},
			en: {
				nome: 'eventlog',
				categoria: '⚙️ » Configuration',
				desc: 'Set a channel to receive updates.'
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
					description: 'The Channel Mention',
					required: false,
				},
				{
					type: 3,
					name: 'channelid',
					description: 'The Channel ID',
					required: false,
				},
			],
			aliases: ['setlogs', 'messagelogs'],
			run: this.run
		};
	}

	async run (ctx) {
		if (!ctx.args[0]) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.eventlog.noarg}`
			});
		}
		const eventlog = await global.db.get(`eventlog-${ctx.message.channel.guild.id}`);
		if (!eventlog) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.eventlog.noarg}`
			});
		}
		else if (ctx.args[0] === 'remove') {
			await global.db.set(`eventlog-${ctx.message.channel.guild.id}`, null);
			return ctx.message.channel.slashReply({
				content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.eventlog.remove}`
			});
		}
		else {
			const channel = await global.zuly.getRESTChannel(ctx.args[0]).then(info => info).catch(() => {
				return ctx.message.channel.slashReply({
					content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.eventlog.noarg}`
				});
			});
			if (channel.type !== 'text') {
				return ctx.message.channel.slashReply({
					content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.eventlog.noarg}`
				});
			}
			await global.db.set(`eventlog-${ctx.message.channel.guild.id}`, channel.id);
			return ctx.message.channel.slashReply({
				content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.eventlog.set}`
			});
		}
	}
};
