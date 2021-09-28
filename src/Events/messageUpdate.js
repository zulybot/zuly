'use strict';
module.exports = class MessageEventCommand {
	constructor () {
		return {
			nome: 'messageUpdate',
			run: this.run
		};
	}

	async run (message, oldMessage) {
		const config = require('../Config/config.js');

		global.zuly.users.map(g => global.zuly.users.delete(g.id));

		if (message.channel.type === 1) return;
		if (message.content === oldMessage.content) return;
		/*
		let idioma = require('../Config/idiomas');
		let lang = await global.db.get(`idioma-${message.guildID}`) || 'pt_br';
		lang = lang.replace(/-/g, '_');
		idioma = idioma[lang];
		*/
		// ata, criei
		if (message.author.bot) return;

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
			embed.setDescription(`${message.author.mention}, due to some compatibility issues, I was completely switched to **Slash Commands**, if the commands don't appear, add me again by clicking here: [add](https://zulybot.xyz/add), it is not necessary to remove the bot for this and if the commands have not yet updated on your server, it can take up to an hour for them to update on all servers, due to discord.`);
			embed.setColor('#ffcbdb');
			embed.setThumbnail(global.zuly.user.avatarURL);
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			message.channel.createMessage({
				embed: embed.get()
			});
		}
	}
};
