/* eslint-disable new-cap */
module.exports = class InviteCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS', 'ADD_REACTIONS'],
				dono: false
			},
			pt: {
				nome: 'poll',
				categoria: '🕰️ » Utilidades',
				desc: 'Cria um poll.'
			},
			en: {
				nome: 'poll',
				categoria: '🕰️ » Utility',
				desc: 'Create a poll.'
			},
			fr: {
				nome: 'poll',
				categoria: '🕰️ » Utilitaires',
				desc: 'Créez un sondage.'
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
					name: 'title',
					description: 'The title of the poll.',
					required: true,
					name_localizations: {
						'pt-BR': 'título',
						'en-US': 'title',
						'fr': 'titre'
					},
					description_localizations: {
						'pt-BR': 'O título do poll.',
						'en-US': 'The title of the poll.',
						'fr': 'Le titre du sondage.'
					}
				},
				{
					type: 3,
					name: 'option1',
					description: 'Option 1.',
					required: true,
					name_localizations: {
						'pt-BR': 'opção1',
						'en-US': 'option1',
						'fr': 'choix1'
					},
					description_localizations: {
						'pt-BR': 'Opção 1.',
						'en-US': 'Option 1.',
						'fr': 'choix 1.'
					}
				},
				{
					type: 3,
					name: 'option2',
					description: 'Option 2.',
					required: true,
					name_localizations: {
						'pt-BR': 'opção2',
						'en-US': 'option2',
						'fr': 'choix2'
					},
					description_localizations: {
						'pt-BR': 'Opção 2.',
						'en-US': 'Option 2.',
						'fr': 'choix 2.'
					}
				},
				{
					type: 3,
					name: 'option3',
					description: 'Option 3.',
					required: false,
					name_localizations: {
						'pt-BR': 'opção3',
						'en-US': 'option3',
						'fr': 'choix3'
					},
					description_localizations: {
						'pt-BR': 'Opção 3.',
						'en-US': 'Option 3.',
						'fr': 'choix 3.'
					}
				},
				{
					type: 3,
					name: 'option4',
					description: 'Option 4.',
					required: false,
					name_localizations: {
						'pt-BR': 'opção4',
						'en-US': 'option4',
						'fr': 'choix4'
					},
					description_localizations: {
						'pt-BR': 'Opção 4.',
						'en-US': 'Option 4.',
						'fr': 'choix 4.'
					}
				},
				{
					type: 3,
					name: 'option5',
					description: 'Option 5.',
					required: false,
					name_localizations: {
						'pt-BR': 'opção5',
						'en-US': 'option5',
						'fr': 'choix5'
					},
					description_localizations: {
						'pt-BR': 'Opção 5.',
						'en-US': 'Option 5.',
						'fr': 'choix 5.'
					}
				},
				{
					type: 3,
					name: 'option6',
					description: 'Option 6.',
					required: false,
					name_localizations: {
						'pt-BR': 'opção6',
						'en-US': 'option6',
						'fr': 'choix6'
					},
					description_localizations: {
						'pt-BR': 'Opção 6.',
						'en-US': 'Option 6.',
						'fr': 'choix 6.'
					}
				},
				{
					type: 3,
					name: 'option7',
					description: 'Option 7.',
					required: false,
					name_localizations: {
						'pt-BR': 'opção7',
						'en-US': 'option7',
						'fr': 'choix7'
					},
					description_localizations: {
						'pt-BR': 'Opção 7.',
						'en-US': 'Option 7.',
						'fr': 'choix 7.'
					}
				},
				{
					type: 3,
					name: 'option8',
					description: 'Option 8.',
					required: false,
					name_localizations: {
						'pt-BR': 'opção8',
						'en-US': 'option8',
						'fr': 'choix8'
					},
					description_localizations: {
						'pt-BR': 'Opção 8.',
						'en-US': 'Option 8.',
						'fr': 'choix 8.'
					}
				},
				{
					type: 3,
					name: 'option9',
					description: 'Option 9.',
					required: false,
					name_localizations: {
						'pt-BR': 'opção9',
						'en-US': 'option9',
						'fr': 'choix9'
					},
					description_localizations: {
						'pt-BR': 'Opção 9.',
						'en-US': 'Option 9.',
						'fr': 'choix 9.'
					}
				}
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const reactionNumbers = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

		const embed = new ctx.embed();
		embed.setTitle(ctx.args[0]);
		embed.setColor('#ffcbdb');
		embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		ctx.args.forEach((arg, index) => {
			if (index > 0) {
				embed.addField(reactionNumbers[index - 1] + ' ' + arg, '_ _');
			}
		});
		ctx.message.channel.slashReply({
			embeds: [embed.get()]
		}).then(async (msg) => {
			ctx.args.forEach((arg, index) => {
				if (index > 0) {
					msg.react(reactionNumbers[index - 1]);
				}
			});
		});
	}
};
