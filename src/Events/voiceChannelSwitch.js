module.exports = class voiceChannelSwitch {
	constructor () {
		return {
			nome: 'voiceChannelSwitch',
			run: this.run
		};
	}
	async run (member, newChannel, oldChannel) {
		const player = global.zuly.music.players.get(member.guild.id);
		if (!player || member.bot) return;
		if (oldChannel.id === player.voiceChannel && !oldChannel.voiceMembers.filter(m => !m.bot).length && newChannel.id !== player.voiceChannel) {
			player.destroy();
			let idioma = require('../Config/idiomas');
			let lang = await global.db.get(`idioma-${member.guild.id}`) || 'pt_br';
			lang = lang.replace(/-/g, '_');
			idioma = idioma[lang];
			const embed = new global.zuly.manager.Ebl();
			embed.setDescription(`<:zu_mp3:882310253226635284> **|** ${idioma.erela.voice}`);
			embed.setFooter('⤷ zulybot.xyz', global.zuly.user.avatarURL);
			embed.setColor('#ffcbdb');
			await global.zuly.createMessage(player.textChannel, {
				embed: embed.get()
			});
			return;
		}
		if (newChannel.id === player.voiceChannel && this.client.music.channelTimeouts.has(member.guild.id) && newChannel.voiceMembers.filter(m => !m.bot).length) {
			player.pause(!1);
		}
	}
};
