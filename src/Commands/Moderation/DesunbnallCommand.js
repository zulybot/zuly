module.exports = class UnbanallCommand {
	constructor () {
		return {
			permissoes: {
				membro: ['BAN_MEMBERS'],
				bot: ['BAN_MEMBERS'],
				dono: false
			},
			pt: {
				nome: 'desunbanall',
				categoria: '🛡️ » Moderação',
				desc: 'Bane todos os usuários que foram banidos do seu servidor.'
			},
			en: {
				nome: 'desunbanall',
				categoria: '🛡️ » Moderation',
				desc: 'Ban all users who were banned from your server.'
			},
			fr: {
				nome: 'desunbanall',
				categoria: '🛡️ » Modération',
				desc: 'Bannissez tous les utilisateurs qui ont été bannis de votre serveur.'
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
		const banArray = await global.zuly.db.get(`bans-${ctx.message.guild.id}`);;
		const { MessageButton, MessageActionRow } = require('discord.js');
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('confirm')
					.setEmoji('972869930817036318')
					.setLabel(ctx.idioma.desunban.confirm)
					.setStyle('DANGER')
			);

		const embed = new ctx.embed();
		embed.setTitle(`${ctx.idioma.desunban.title} | ${global.zuly.user.username}`);
		embed.setDescription('>>> <:zu_info:880812942713573396> ' + ctx.idioma.desunban.description);
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
						.setLabel(ctx.idioma.desunban.confirm)
						.setStyle('DANGER')
						.setDisabled(true)
				);
			collector.on('collect', async (i) => {
				i.update({
					content: ctx.message.author.mention,
					embeds: [embed.get()],
					components: [row]
				}).then(async () => {
					const tempo = Date.now();
					await i.followUp(`✅ ${ctx.message.author.mention} **|** ${ctx.idioma.desunban.done.replace('%t', require('pretty-ms')(Date.now() - tempo))}`).then(async () => {
						banArray.forEach(async ban => {
							ctx.message.guild.members.ban(ban.id, {
								days: 7,
								reason: ban.reason
							});
						});
					});
				});
			});
		});
	}
};
// ADG, Davi e LRD
