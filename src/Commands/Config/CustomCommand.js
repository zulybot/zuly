module.exports = class CustomCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['MANAGE_GUILD'],
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
					name_localizations: {
						'pt-BR': 'nome',
						'en-US': 'name',
						'fr': 'nom'
					},
					description_localizations: {
						'pt-BR': 'O nome do comando que será criado.',
						'en-US': 'The Name of the command that will be created.',
						'fr': 'Le nom de la commande qui sera créé.'
					}
				},
				{
					type: 3,
					name: 'description',
					description: 'The Description of the created command.',
					required: true,
					name_localizations: {
						'pt-BR': 'descrição',
						'en-US': 'description',
						'fr': 'description'
					},
					description_localizations: {
						'pt-BR': 'A descrição do comando criado.',
						'en-US': 'The Description of the created command.',
						'fr': 'La description de la commande créée.'
					}
				},
				{
					type: 3,
					name: 'reply',
					description: 'The Response of the command that will be created.',
					required: true,
					name_localizations: {
						'pt-BR': 'resposta',
						'en-US': 'reply',
						'fr': 'réponse'
					},
					description_localizations: {
						'pt-BR': 'A resposta do comando criado.',
						'en-US': 'The Response of the command that will be created.',
						'fr': 'La réponse de la commande créée.'
					}
				},
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const nome = ctx.args[0].toLowerCase();
		const command = await global.zuly.commands.get(nome);
		if (command) {
			return ctx.message.channel.slashReply({
				content: `:x: ${ctx.message.author.mention} **|** ${ctx.idioma.alreadyExists}`
			});
		}
		await global.zuly.restAPI.put(global.zuly.routes.applicationGuildCommands(global.zuly.user.id, ctx.message.guild.id), {
			body: [
				{
					type: 1,
					name: nome,
					description: `${ctx.args[1] || 'No Description'}`,
				}
			]
		});
		ctx.message.channel.slashReply({
			content: `:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.customCommand}`.replace('%n', nome)
		}).then(async () => {
			await global.zuly.db.set(`custom-command-${nome}-${ctx.message.guild.id}`, ctx.args[2]);
		});
	}
};
