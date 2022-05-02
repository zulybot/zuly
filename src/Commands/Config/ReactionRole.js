module.exports = class ReactionRoleCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD', 'MANAGE_ROLES'],
				bot: ['MANAGE_ROLES', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS']
			},
			pt: {
				nome: 'reactionrole',
				categoria: '⚙️ » Configuração',
				desc: 'Crie cargos por reação em uma mensagem que você deseja.'
			},
			en: {
				nome: 'reactionrole',
				categoria: '⚙️ » Configuration',
				desc: 'Create roles by reaction in a message you want.'
			},
			fr: {
				nome: 'reactionrole',
				categoria: '⚙️ » Configuration',
				desc: 'Créez des rôles par réaction dans un message que vous voulez.'
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
					name: 'message',
					description: 'Message ID To create the Reaction Role (the message must be on this channel)',
					required: true
				},
				{
					type: 8,
					name: 'role',
					description: 'Cargo to add or remove in whom to react',
					required: true
				},
				{
					type: 3,
					name: 'emoji',
					description: 'Emoji that members should use (for custom emojis, I have to be on the Emoji server)',
					required: true
				}
			],
			aliases: ['rr', 'reaction-role'],
			run: this.run
		};
	}

	async run (ctx) {
		const message_id = ctx.args[0];
		const roleID = ctx.args[1].replace(/<@&/g, '').replace(/>/g, '');
		const role = await ctx.message.guild.roles.fetch(roleID);
		const emojiName = ctx.args[2].replace(/<a:/g, '').replace(/>/g, '').replace(/<:/g, '').replace(/\d/g, '').replace(/:/g, '');
		const mensagem = await ctx.message.channel.messages.fetch(message_id);
		return !mensagem ? ctx.message.channel.slashReply({
			content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.reactionRole.invalidMessage.replace('%id%', message_id)}`
		}) : ctx.message.channel.slashReply({
			content: `✅ ${ctx.message.author.mention} **|** ${ctx.idioma.reactionRole.sucess.replace('%id%', message_id)}`
		}).then(async () => {
			await global.zuly.db.set(`reaction-${emojiName}-${message_id}`, role.id);
			return mensagem.react(ctx.args[2].replace(/<a:/g, '').replace(/>/g, '').replace(/<:/g, ''));
		});
	}
};
