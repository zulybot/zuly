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
			await global.zuly.createMessage(player.textChannel, ':warning: Parei a música porque fiquei sozinho no canal de voz.');
		}
	}
};