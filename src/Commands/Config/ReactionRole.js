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
					required: true,
					name_localizations: {
						'pt-BR': 'mensagem',
						'en-US': 'message',
						'fr': 'message'
					},
					description_localizations: {
						'pt-BR': 'ID da mensagem para criar o cargo por reação (a mensagem deve estar neste canal)',
						'en-US': 'Message ID To create the Reaction Role (the message must be on this channel)',
						'fr': 'ID du message pour créer le rôle par réaction (le message doit être dans ce salon)'
					}
				},
				{
					type: 8,
					name: 'role',
					description: 'Cargo to add or remove in whom to react',
					required: true,
					name_localizations: {
						'pt-BR': 'cargo',
						'en-US': 'role',
						'fr': 'rôle'
					},
					description_localizations: {
						'pt-BR': 'Cargo para adicionar ou remover em quem reagir',
						'en-US': 'Cargo to add or remove in whom to react',
						'fr': 'Rôle pour ajouter ou supprimer à qui réagir'
					}
				},
				{
					type: 3,
					name: 'emoji',
					description: 'Emoji that members should use (for custom emojis, I have to be on the Emoji server)',
					required: true,
					name_localizations: {
						'pt-BR': 'emoji',
						'en-US': 'emoji',
						'fr': 'émoji'
					},
					description_localizations: {
						'pt-BR': 'Emoji que os membros devem usar (para emojis customizados, eu tenho que estar no servidor de emojis)',
						'en-US': 'Emoji that members should use (for custom emojis, I have to be on the Emoji server)',
						'fr': 'Émoji que les membres doivent utiliser.'
					}
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
