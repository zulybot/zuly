module.exports = class UnbanallCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['BAN_MEMBERS'],
				bot: ['BAN_MEMBERS'],
				dono: false
			},
			pt: {
				nome: 'unbanall',
				categoria: '🛡️ » Moderação',
				desc: 'Desbane todos os usuários do seu servidor, espero que eles tenham aprendido a lição.'
			},
			en: {
				nome: 'unbanall',
				categoria: '🛡️ » Moderation',
				desc: 'Unban all users from your server, hope they learned their lesson.'
			},
			fr: {
				nome: 'unbanall',
				categoria: '🛡️ » Modération',
				desc: 'Débannissez tous les utilisateurs de votre serveur, espérons qu\'ils ont retenu la leçon.'
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
			options: [],
			aliases: [],
			run: this.run
		};
	}

	async run (ctx) {
		const { MessageButton, MessageActionRow } = require('discord.js');
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('confirm')
					.setEmoji('972869930817036318')
					.setLabel(ctx.idioma.unbanall.confirm)
					.setStyle('DANGER')
			);

		const embed = new ctx.embed();
		embed.setTitle(`${ctx.idioma.unbanall.title} | ${global.zuly.user.username}`);
		embed.setDescription('>>> <:zu_info:880812942713573396> ' + ctx.idioma.unbanall.description);
		embed.setColor('#ffcbdb');
		embed.setFooter('⤷ zulybot.xyz', global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		embed.setThumbnail(global.zuly.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }));
		ctx.message.channel.slashReply({
			content: ctx.message.author.mention,
			embeds: [embed.get()],
			components: [row]
		}).then(async () => {
			const filter = i => i.customId === 'confirm' && i.user.id === ctx.message.author.id;
			const collector = ctx.message.channel.createMessageComponentCollector({ filter, time: 180000 });
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('confirm')
						.setEmoji('972869930817036318')
						.setLabel(ctx.idioma.unbanall.confirm)
						.setStyle('DANGER')
						.setDisabled(true)
				);
			collector.on('collect', async (i) => {
				i.update({
					content: ctx.message.author.mention,
					embeds: [embed.get()],
					components: [row]
				}).then(async () => {
					const banArray = [];
					const tempo = Date.now();
					const bans = await ctx.message.channel.guild.bans.fetch();
					if (bans.size === 0) {
						i.followUp(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.unbanall.done.replace('%t', require('pretty-ms')(Date.now() - tempo))}`);
					}
					else {
						bans.forEach(async ban => {
							banArray.push({
								id: ban.user.id,
								reason: ban.reason
							});
							await ctx.message.channel.guild.members.unban(ban.user.id);
						});
						setTimeout(async () => {
							await i.followUp(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.unbanall.done.replace('%t', require('pretty-ms')(Date.now() - tempo))}`).then(async () => {
								await global.zuly.db.set(`bans-${ctx.message.guild.id}`, banArray);
							});
						}, bans.size * 100);
					}
				});
			});
		});
	}
};
// ADG, Davi e LRD
