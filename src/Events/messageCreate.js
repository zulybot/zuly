'use strict';
module.exports = class MessageEventCommand {
	constructor () {
		return {
			nome: 'messageCreate',
			run: this.run
		};
	}
	async run (message) {
		message.client = global.zuly;
		const config = require('../Config/config.js');

		if (message.channel.type === 1) return;

		const {
			get
		} = require('axios');
		await get('https://bad-domains.walshy.dev/domains.json').then(async (response) => {
			const domains = response.data;
			for (const domain of domains) {
				if (message.content.includes(domain)) {
					message.delete();
					message.channel.createMessage(`:x: ${message.author.mention} **|** Este domínio foi bloqueado por ser suspeito de spam/phishing, caso acesse este site, você corre o risco de perder sua conta.`);
					break;
				}
			}
		});

		const mensagens = await global.db.get(`messages-${message.guildID}-${message.author.id}`);
		await global.db.set(`messages-${message.guildID}-${message.author.id}`, mensagens ? mensagens + 1 : 1);
		let idioma = require('../Config/idiomas');
		let lang = await global.db.get(`idioma-${message.guildID}`) || 'pt_br';
		lang = lang.replace(/-/g, '_');
		idioma = idioma[lang];

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