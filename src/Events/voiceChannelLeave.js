module.exports = class voiceChannelLeave {
	constructor () {
		return {
			nome: 'voiceChannelLeave',
			run: this.run
		};
	}
	async run (member, oldChannel) {
		const player = global.zuly.music.players.get(member.guild.id);
		if (member.id === global.zuly.user.id) {
			global.zuly.createMessage(player.textChannel, ':warning: Fui desconectado do canal de voz, por isso limpei a queue.');
			player.destroy();
		}
		if (!member.bot && oldChannel.id === player.voiceChannel && !oldChannel.voiceMembers.filter(m => !m.bot).length && oldChannel.id !== process.env.VOICECHANNELID) {
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
		}
	}
};