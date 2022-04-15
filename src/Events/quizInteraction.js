module.exports = class InteractionEvent {
	constructor () {
		return {
			nome: 'interactionCreate',
			run: this.run
		};
	}
	async run (interaction) {
		if (!interaction.isButton()) return;
		const client = global.zuly;
		if (interaction.user.id !== interaction.message.interaction.user.id) {
			return interaction.reply({
				content: ':x: **|** Isso não é para você!',
				ephemeral: true
			});
		}
		if (interaction.customId === 'certo') {
			const fase = interaction.message.embeds[0].footer.text.replace('⤷ Fase ', '');
			const game = require('../../genioQuiz.json');
			const newGame = game[Number(fase) + 1];
			if (newGame) {
				const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
				const embed = new MessageEmbed();
				embed.setTitle(`${global.zuly.user.username} | ${interaction.user.username}`);
				embed.setDescription(`> ${newGame.question}`);
				embed.setColor('#0099ff');
				if (newGame.image) {
					embed.setImage(newGame.image);
				}
				embed.setThumbnail(client.user.displayAvatarURL());
				embed.setFooter({
					text: `⤷ Fase ${Number(fase) + 1}`,
					iconURL: client.user.displayAvatarURL()
				});
				const row = new MessageActionRow();
				newGame.alternatives.forEach((alternative) => {
					if (alternative.label) {
						row.addComponents(
							new MessageButton()
								.setCustomId(alternative.id)
								.setStyle('PRIMARY')
								.setLabel(alternative.label)
						);
					}
					else {
						row.addComponents(
							new MessageButton()
								.setCustomId(alternative.id)
								.setEmoji(alternative.emoji)
								.setStyle('PRIMARY')
						);
					}
				});
				await interaction.message.edit({ embeds: [embed], components: [row] }).then(() => {
					interaction.deferUpdate();
				});
			}
			else {
				const { MessageEmbed } = require('discord.js');
				const embed = new MessageEmbed();
				embed.setTitle(`${global.zuly.user.username} | ${interaction.user.username}`);
				embed.setDescription('> Parabéns! Você concluiu o quiz!');
				embed.setColor('#0099ff');
				embed.setThumbnail(client.user.displayAvatarURL());
				embed.setFooter({
					text: '⤷ OwO, sabia que você pode jogar novamente?',
					iconURL: client.user.displayAvatarURL()
				});
				await interaction.message.edit({ embeds: [embed], components: [] }).then(() => {
					interaction.deferUpdate();
				});
			}
		}
		else {
			const game = require('../../genioQuiz.json');
			const newGame = game[0];
			const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
			const embed = new MessageEmbed();
			embed.setTitle(`${global.zuly.user.username} | ${interaction.user.username}`);
			embed.setDescription(`> ${newGame.question}\n- Você errou a resposta!`);
			embed.setColor('#0099ff');
			embed.setThumbnail(client.user.displayAvatarURL());
			embed.setFooter({
				text: '⤷ Fase 0',
				iconURL: client.user.displayAvatarURL()
			});
			const row = new MessageActionRow();
			newGame.alternatives.forEach((alternative) => {
				row.addComponents(
					new MessageButton()
						.setCustomId(alternative.id)
						.setEmoji(alternative.emoji)
						.setStyle('PRIMARY')
				);
			});
			await interaction.message.edit({ embeds: [embed], components: [row] }).then(() => {
				interaction.deferUpdate();
			});
		}
	}
};