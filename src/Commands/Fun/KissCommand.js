module.exports = class KissCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'beijar',
				categoria: '⭐ » Diversão',
				desc: 'Beija algum usuário.'
			},
			en: {
				nome: 'kiss',
				categoria: '⭐ » Fun',
				desc: 'Kiss some user.'
			},
			fr: {
				nome: 'baiser',
				categoria: '⭐ » Divertissement',
				desc: 'Baiser un utilisateur.'
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
					description: 'User to be kissed.',
					required: true,
					name_localizations: {
						'pt-BR': 'usuário',
						'en-US': 'user',
						'fr': 'utilisateur'
					},
					description_localizations: {
						'pt-BR': 'Usuário a ser beijado.',
						'en-US': 'The user to be kissed.',
						'fr': 'L\'utilisateur à baiser.'
					}
				}
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		try {
			const user = await global.zuly.users.fetch(ctx.args[0]);
			const { get } = require('axios');
			await get('https://nekos.life/api/v2/img/kiss').then(async (res) => {
				const { MessageButton, MessageActionRow } = require('discord.js');
				const row = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId('rt')
							.setEmoji('973685726141120602')
							.setLabel(ctx.idioma.actions.kiss.labels.rt)
							.setStyle('PRIMARY')
					);
				const embed = new ctx.embed();
				embed.setDescription(ctx.idioma.actions.kiss.description.replace('%u1', ctx.message.author.mention).replace('%u2', '<@' + user.id + '>'));
				embed.setImage(res.data.url);
				embed.setColor('#ffcbdb');
				embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
				ctx.message.channel.slashReply({
					content: ctx.message.author.mention,
					embeds: [embed.get()],
					components: [row]
				}).then(async () => {
					const filter = i => i.customId === 'rt' && i.user.id === user.id;
					const collector = ctx.message.channel.createMessageComponentCollector({ filter, time: 180000 });
					collector.on('collect', async (i) => {
						await get('https://nekos.life/api/v2/img/kiss').then(async (res) => {
							const { MessageButton, MessageActionRow } = require('discord.js');
							const row = new MessageActionRow()
								.addComponents(
									new MessageButton()
										.setCustomId('rt')
										.setEmoji('973685726141120602')
										.setLabel(ctx.idioma.actions.kiss.labels.rt)
										.setStyle('PRIMARY')
										.setDisabled(true)
								);
							const embed = new ctx.embed();
							embed.setDescription(ctx.idioma.actions.kiss.description.replace('%u2', ctx.message.author.mention).replace('%u1', '<@' + user.id + '>'));
							embed.setImage(res.data.url);
							embed.setColor('#ffcbdb');
							embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
							i.update({
								content: ctx.message.author.mention,
								embeds: [embed.get()],
								components: [row]
							});
						});
					});
				});
			});
		}
		catch (e) {
			console.log(e);
		}
	}
};
