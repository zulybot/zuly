module.exports = class PatCommand {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: ['EMBED_LINKS'],
				dono: false
			},
			pt: {
				nome: 'cafuné',
				categoria: '⭐ » Diversão',
				desc: 'Faça cafuné em alguém.'
			},
			en: {
				nome: 'headpat',
				categoria: '⭐ » Fun',
				desc: 'Pat someone.'
			},
			fr: {
				nome: 'caresser',
				categoria: '⭐ » Divertissement',
				desc: 'Caresser quelqu\'un.'
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
					description: 'The user to pat.',
					required: true,
					name_localizations: {
						'pt-BR': 'usuário',
						'en-US': 'user',
						'fr': 'utilisateur'
					},
					description_localizations: {
						'pt-BR': 'O usuário para receber cafuné.',
						'en-US': 'The user to be pat.',
						'fr': 'L\'utilisateur à caresser.'
					}
				}
			],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		try {
			const user = global.zuly.users.cache.get(ctx.args[0]) ? global.zuly.users.cache.get(ctx.args[0]) : await global.zuly.users.fetch(ctx.args[0]);
			const { get } = require('axios');
			await get('https://nekos.life/api/v2/img/pat').then(async (res) => {
				const { MessageButton, MessageActionRow } = require('discord.js');
				const row = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId('rt')
							.setEmoji('973685726141120602')
							.setLabel(ctx.idioma.actions.pat.labels.rt)
							.setStyle('PRIMARY')
					);
				const embed = new ctx.embed();
				embed.setDescription(ctx.idioma.actions.pat.description.replace('%u1', ctx.message.author.mention).replace('%u2', '<@' + user.id + '>'));
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
						await get('https://nekos.life/api/v2/img/pat').then(async (res) => {
							const { MessageButton, MessageActionRow } = require('discord.js');
							const row = new MessageActionRow()
								.addComponents(
									new MessageButton()
										.setCustomId('rt')
										.setEmoji('973685726141120602')
										.setLabel(ctx.idioma.actions.pat.labels.rt)
										.setStyle('PRIMARY')
										.setDisabled(true)
								);
							const embed = new ctx.embed();
							embed.setDescription(ctx.idioma.actions.pat.description.replace('%u2', ctx.message.author.mention).replace('%u1', '<@' + user.id + '>'));
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
