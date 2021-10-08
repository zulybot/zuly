/* eslint-disable no-async-promise-executor */
'use strict';
module.exports = class MessageEventCommand {
	constructor () {
		return {
			nome: 'messageCreate',
			run: this.run
		};
	}

	async run (message) {
		const config = require('../Config/config.js');

		global.zuly.users.map(g => global.zuly.users.delete(g.id));

		if (message.channel.type === 1) return;

		const mensagens = await global.db.get(`messages-${message.guildID}-${message.author.id}`);

		await global.db.set(`messages-${message.guildID}-${message.author.id}`, mensagens ? mensagens + 1 : 1);
		let idioma = require('../Config/idiomas');
		let lang = await global.db.get(`idioma-${message.guildID}`) || 'pt_br';
		lang = lang.replace(/-/g, '_');
		idioma = idioma[lang];

		const channel_id = '880880678017826917';

		if(message.channel.id == channel_id) {
			const footer = message.embeds[0].footer.text;

			if (!footer) return;

			const footext = footer.split(' ');

			const user = await global.zuly.getRESTUser(footext[0]);
			const embed = new global.zuly.manager.Ebl();
			embed.title(`<:zu_bestlist:885218274080596038> BestList | ${global.zuly.user.username}`);
			embed.url('https://bestlist.online/bots/880173509077266483');
			embed.description(`⬆️ \`${user.username}#${user.discriminator}\` votou em mim na **[bestlist.online](https://bestlist.online)** e recebeu **2400 ryos** vote você também!\n🔗 **Link:** https://bestlist.online/bots/880173509077266483`);
			embed.color('#ffcbdb');
			embed.thumbnail(user.avatarURL);
			const ch = await global.zuly.getRESTChannel('890316877031698464');
			const money = await global.db.get(`ryos-${user.id}`);
			if (money) {
				await global.db.set(`ryos-${user.id}`, Number(money) + 2400);
			}
			else {
				await global.db.set(`ryos-${user.id}`, 2400);
			}
			const embed2 = new global.zuly.manager.Ebl();
			embed2.setTitle(`<:zu_bestlist:885218274080596038> BestList | ${global.zuly.user.username}`);
			embed2.setUrl('https://bestlist.online/bots/880173509077266483');
			embed2.setDescription(`**${user.username}** Obrigado pelo seu voto, como recompensa você recebeu **2400 ryos**, continue votando e sendo uma pessoa incrivel <:zu_yay:890317605318058035>`);
			embed2.setColor('#ffcbdb');
			embed2.setThumbnail(global.zuly.user.avatarURL);
			const dm = await global.zuly.getDMChannel(user.id);
			dm.createMessage({
				content: user.mention,
				embeds: [embed2.get()]
			}).catch(() => {
				console.log('DM Fechada');
			});
			return ch.createMessage({
				content: user.mention,
				embeds: [embed.get()]
			}).then(b => {
				b.addReaction('⬆️');
			});
		}

		if (message.author.bot) return;

		if (message.content === `<@${global.zuly.user.id}>` || message.content === `<@!${global.zuly.user.id}>`) {
			const embed = new global.zuly.manager.Ebl();
			embed.setTitle(`<:zu_slash:886288977668243566> SlashCommands | ${global.zuly.user.username}`);
			embed.setDescription(`${message.author.mention}, ${idioma.slash}`);
			embed.setColor('#ffcbdb');
			embed.setThumbnail(global.zuly.user.avatarURL);
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			message.channel.createMessage({
				content: message.author.mention,
				embeds: [embed.get()]
			});
		}

		const regexPrefix = new RegExp(`^(${config.prefix.map(prefix => prefix.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).join('|')}|<@!?${global.zuly.user.id}>)( )*`, 'gi');

		if (!message.content.match(regexPrefix)) return;

		const args = message.content.replace(regexPrefix, '').trim().split(/ +/g);
		const commandName = args.shift().toLowerCase();
		const commandFile = global.zuly.commands.get(commandName) || global.zuly.aliases.get(commandName);

		if (!commandFile) return;

		const command = commandFile;

		if (!command || command) {
			const embed = new global.zuly.manager.Ebl();
			embed.setTitle(`<:zu_slash:886288977668243566> SlashCommands | ${global.zuly.user.username}`);
			embed.setDescription(`${message.author.mention}, ${idioma.slash}`);
			embed.setColor('#ffcbdb');
			embed.setThumbnail(global.zuly.user.avatarURL);
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			message.channel.createMessage({
				content: message.author.mention,
				embeds: [embed.get()]
			});
		}
	}
};
